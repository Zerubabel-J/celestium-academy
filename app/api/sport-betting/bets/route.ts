import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { getServerUser } from "@/lib/auth";
import { createHash } from "crypto";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

function addressToUserId(address: string): string {
  const normalizedAddress = address.toLowerCase();
  const hash = createHash("sha256").update(normalizedAddress).digest();
  const hex = hash.toString("hex");

  return [
    hex.substring(0, 8),
    hex.substring(8, 12),
    "4" + hex.substring(13, 16),
    ((parseInt(hex[16], 16) & 0x3) | 0x8).toString(16) + hex.substring(17, 20),
    hex.substring(20, 32),
  ].join("-");
}

async function getOrCreateUserId(walletAddress: string): Promise<string> {
  const normalizedAddress = walletAddress.toLowerCase();
  const userId = addressToUserId(normalizedAddress);

  const { data: existingUser, error: selectError } = await supabase
    .from("app_users")
    .select("id")
    .eq("wallet_address", normalizedAddress)
    .maybeSingle();

  if (existingUser?.id) {
    return existingUser.id;
  }

  if (selectError && selectError.code === "42P01") {
    return userId;
  }

  const { error: insertError } = await supabase
    .from("app_users")
    .insert([{ id: userId, wallet_address: normalizedAddress }])
    .select()
    .single();

  if (insertError && insertError.code === "42P01") {
  }

  return userId;
}

export async function GET(request: NextRequest) {
  try {
    const session = await getServerUser();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const matchId = searchParams.get("match_id");
    const status = searchParams.get("status");
    const limit = searchParams.get("limit");

    const userId = await getOrCreateUserId(session.address);

    let query = supabase
      .from("bets")
      .select(
        `
        *,
        match:matches(
          *,
          team1:teams!matches_team1_id_fkey(*),
          team2:teams!matches_team2_id_fkey(*)
        )
      `
      )
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (matchId) {
      query = query.eq("match_id", matchId);
    }

    if (status) {
      query = query.eq("status", status);
    }

    if (limit) {
      query = query.limit(parseInt(limit));
    }

    const { data, error } = await query;

    if (error) {
      console.error("Error fetching bets:", error);
      return NextResponse.json(
        { error: "Failed to fetch bets" },
        { status: 500 }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error in bets API:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerUser();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { match_id, bet_type, amount } = body;

    if (!match_id || !bet_type || !amount || amount <= 0) {
      return NextResponse.json({ error: "Invalid bet data" }, { status: 400 });
    }

    if (!["team1", "team2", "draw"].includes(bet_type)) {
      return NextResponse.json({ error: "Invalid bet type" }, { status: 400 });
    }

    const { data: match, error: matchError } = await supabase
      .from("matches")
      .select("*")
      .eq("id", match_id)
      .single();

    if (matchError || !match) {
      console.error("Match lookup error:", matchError);
      return NextResponse.json(
        {
          error: "Match not found",
          details:
            process.env.NODE_ENV === "development"
              ? matchError?.message
              : undefined,
        },
        { status: 404 }
      );
    }

    const matchDate = new Date(match.date);
    const now = new Date();

    if (isNaN(matchDate.getTime())) {
      console.error("Invalid match date:", match.date);
      return NextResponse.json(
        {
          error: "Invalid match date format",
          matchDate: match.date,
        },
        { status: 400 }
      );
    }

    const bettingDeadline = new Date(matchDate.getTime() - 5 * 60 * 1000);

    if (process.env.NODE_ENV === "development") {
      console.log("Match date check:", {
        rawMatchDate: match.date,
        parsedMatchDate: matchDate.toISOString(),
        now: now.toISOString(),
        bettingDeadline: bettingDeadline.toISOString(),
        matchStatus: match.status,
        timeUntilMatch: matchDate.getTime() - now.getTime(),
        timeUntilDeadline: bettingDeadline.getTime() - now.getTime(),
        canBet: now < bettingDeadline && match.status === "upcoming",
      });
    }

    if (match.status !== "upcoming") {
      return NextResponse.json(
        { error: `Betting closed - match status is ${match.status}` },
        { status: 400 }
      );
    }

    if (now >= bettingDeadline) {
      return NextResponse.json(
        {
          error: "Betting closed - match has started or deadline passed",
          matchDate: matchDate.toISOString(),
          currentTime: now.toISOString(),
        },
        { status: 400 }
      );
    }

    const baseMultiplier = 1.8;
    const bonusAmount = Math.floor(amount * 0.05);
    const potentialWin = Math.floor(amount * baseMultiplier);

    const userId = await getOrCreateUserId(session.address);

    const { data, error } = await supabase
      .from("bets")
      .insert([
        {
          user_id: userId,
          match_id,
          bet_type,
          amount,
          potential_win: potentialWin,
          bonus_amount: bonusAmount,
          status: "pending",
        },
      ])
      .select(
        `
        *,
        match:matches(
          *,
          team1:teams!matches_team1_id_fkey(*),
          team2:teams!matches_team2_id_fkey(*)
        )
      `
      )
      .single();

    if (error) {
      console.error("Error creating bet:", error);
      const errorMessage = error.message || "Failed to place bet";
      return NextResponse.json(
        {
          error: "Failed to place bet",
          details:
            process.env.NODE_ENV === "development" ? errorMessage : undefined,
        },
        { status: 500 }
      );
    }

    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    console.error("Error in bets POST API:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
