import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const featured = searchParams.get('featured');
    const status = searchParams.get('status');
    const limit = searchParams.get('limit');

    let query = supabase
      .from('matches')
      .select(`
        *,
        team1:teams!matches_team1_id_fkey(*),
        team2:teams!matches_team2_id_fkey(*),
        betting_stats(*)
      `)
      .order('date', { ascending: true });

    if (featured === 'true') {
      query = query.eq('featured', true);
    }

    if (status) {
      query = query.eq('status', status);
    }

    if (limit) {
      query = query.limit(parseInt(limit));
    }

    const { data, error } = await query;

    if (error) {
      console.error('Error fetching matches:', error);
      return NextResponse.json({ error: 'Failed to fetch matches' }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error in matches API:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { league, date, team1_id, team2_id, featured = false } = body;

    if (!league || !date || !team1_id || !team2_id) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const { data, error } = await supabase
      .from('matches')
      .insert([{
        league,
        date,
        team1_id,
        team2_id,
        featured,
        status: 'upcoming'
      }])
      .select(`
        *,
        team1:teams!matches_team1_id_fkey(*),
        team2:teams!matches_team2_id_fkey(*)
      `)
      .single();

    if (error) {
      console.error('Error creating match:', error);
      return NextResponse.json({ error: 'Failed to create match' }, { status: 500 });
    }

    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    console.error('Error in matches POST API:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
