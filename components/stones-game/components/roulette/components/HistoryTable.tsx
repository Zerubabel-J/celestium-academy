"use client";

import { useState, useMemo } from "react";
import { Search, Eye, ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { BetTicket, RoundResult } from "../../../types";
import { STONES } from "../../../constants/stones";
import { MyCelestiumsTable } from "./history/MyCelestiumsTable";
import { AllRoundsTable } from "./history/AllRoundsTable";

interface HistoryTableProps {
  myBets: BetTicket[];
  results: RoundResult[];
  getStoneById: (stoneId: string) => (typeof STONES)[0] | undefined;
}

export function HistoryTable({
  myBets,
  results,
  getStoneById,
}: HistoryTableProps) {
  const [activeTab, setActiveTab] = useState<"my" | "all">("my");
  const [searchQuery, setSearchQuery] = useState("");
  const [showCount, setShowCount] = useState("10");

  const myCelestiumsData = useMemo(() => {
    return myBets
      .filter((bet) => bet.status !== "pending")
      .map((bet) => {
        const stone = getStoneById(bet.stoneId);
        return {
          id: bet.id,
          date: new Date(bet.placedAt).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          }),
          roundNumber: `#${bet.round}`,
          sum: bet.amount,
          stoneId: bet.stoneId,
          winning: bet.status === "won" ? bet.payout ?? 0 : 0,
          bonus: bet.status === "won" ? bet.bonus ?? null : null,
          transactionId: `${bet.id.slice(0, 4)}...${bet.id.slice(-4)}`,
          transactionIdShort: `${bet.id.slice(0, 2)}...${bet.id.slice(-2)}`,
        };
      })
      .slice(0, Number(showCount));
  }, [myBets, showCount, getStoneById]);

  const allRoundsData = useMemo(() => {
    return results
      .map((result) => {
        const timeAgo = Math.floor((Date.now() - result.timestamp) / 60000);
        return {
          id: result.id,
          roundTime: `${timeAgo} min`,
          roundId: `${result.id.slice(0, 4)}...${result.id.slice(-4)}`,
          roundIdShort: `${result.id.slice(0, 2)}...${result.id.slice(-2)}`,
          usersCount: 0,
          celestiumsCount: 0,
          sumOfCelestiums: result.totalPool,
          winningStoneId: result.stoneId,
          paidToStaking: Math.round(result.totalPool * 0.036),
        };
      })
      .slice(0, Number(showCount));
  }, [results, showCount]);

  return (
    <div className="">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex gap-3">
          <Button
            variant={activeTab === "my" ? "default" : "ghost"}
            onClick={() => setActiveTab("my")}
            className={
              activeTab === "my"
                ? "text-base font-medium px-6 py-3 text-slate-950 hover:opacity-90"
                : "bg-[#131624] text-base font-medium text-muted-foreground hover:text-foreground px-6 py-3"
            }
            style={
              activeTab === "my" ? { backgroundColor: "#FFC800" } : undefined
            }
          >
            My CELESTIUMs
          </Button>
          <Button
            variant={activeTab === "all" ? "default" : "ghost"}
            onClick={() => setActiveTab("all")}
            className={
              activeTab === "all"
                ? "bg-card text-foreground hover:bg-card/90 text-base font-medium px-6 py-3"
                : "bg-[#131624] text-base font-medium text-muted-foreground hover:text-foreground px-6 py-3"
            }
          >
            All rounds
          </Button>
        </div>

        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center md:justify-between">
          <h1 className="text-4xl font-bold text-foreground shrink-0">
            History
          </h1>

          <div className="flex flex-col md:flex-row gap-3 md:gap-4 items-start md:items-center w-full md:w-auto md:shrink-0">
            <div className="flex items-center gap-2 text-sm text-muted-foreground shrink-0">
              <span>Sort by:</span>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <ArrowUpDown className="h-4 w-4" />
              </Button>
            </div>

            <div className="flex flex-row gap-3 items-center w-full md:w-auto shrink-0">
              <div className="relative flex-1 md:flex-none md:w-[200px]">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search CELESTIUM"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-secondary border-border text-foreground placeholder:text-muted-foreground"
                />
              </div>

              <Select value={showCount} onValueChange={setShowCount}>
                <SelectTrigger className="w-[140px] bg-secondary border-border">
                  <Eye className="h-4 w-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5">Show 5</SelectItem>
                  <SelectItem value="10">Show 10</SelectItem>
                  <SelectItem value="25">Show 25</SelectItem>
                  <SelectItem value="50">Show 50</SelectItem>
                  <SelectItem value="100">Show 100</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <div className="space-y-0">
          {activeTab === "my" ? (
            <MyCelestiumsTable data={myCelestiumsData} getStoneById={getStoneById} />
          ) : (
            <AllRoundsTable data={allRoundsData} getStoneById={getStoneById} />
          )}
        </div>
      </div>
    </div>
  );
}
