import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type'); // 'platform' | 'betting' | 'user'
    const matchId = searchParams.get('match_id');
    const userId = searchParams.get('user_id');

    if (type === 'platform') {
      const { data, error } = await supabase
        .from('platform_stats')
        .select('*')
        .single();

      if (error) {
        console.error('Error fetching platform stats:', error);
        return NextResponse.json({ error: 'Failed to fetch platform stats' }, { status: 500 });
      }

      return NextResponse.json(data);
    }

    if (type === 'betting' && matchId) {
      const { data, error } = await supabase
        .from('betting_stats')
        .select('*')
        .eq('match_id', matchId)
        .single();

      if (error) {
        console.error('Error fetching betting stats:', error);
        return NextResponse.json({ error: 'Failed to fetch betting stats' }, { status: 500 });
      }

      return NextResponse.json(data);
    }

    if (type === 'user' && userId) {
      const { data, error } = await supabase
        .from('user_stats')
        .select('*')
        .eq('user_id', userId)
        .single();

      if (error) {
        console.error('Error fetching user stats:', error);
        return NextResponse.json({ error: 'Failed to fetch user stats' }, { status: 500 });
      }

      return NextResponse.json(data);
    }

    // Get all betting stats for all matches
    if (type === 'betting') {
      const { data, error } = await supabase
        .from('betting_stats')
        .select(`
          *,
          match:matches(
            *,
            team1:teams!matches_team1_id_fkey(*),
            team2:teams!matches_team2_id_fkey(*)
          )
        `)
        .order('updated_at', { ascending: false });

      if (error) {
        console.error('Error fetching all betting stats:', error);
        return NextResponse.json({ error: 'Failed to fetch betting stats' }, { status: 500 });
      }

      return NextResponse.json(data);
    }

    return NextResponse.json({ error: 'Invalid request parameters' }, { status: 400 });
  } catch (error) {
    console.error('Error in stats API:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// Update online users count (called periodically)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { online_users } = body;

    if (typeof online_users !== 'number') {
      return NextResponse.json({ error: 'Invalid online_users count' }, { status: 400 });
    }

    const { data, error } = await supabase
      .from('platform_stats')
      .update({
        online_users,
        updated_at: new Date().toISOString()
      })
      .eq('id', 1)
      .select()
      .single();

    if (error) {
      console.error('Error updating online users:', error);
      return NextResponse.json({ error: 'Failed to update online users' }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error in stats POST API:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
