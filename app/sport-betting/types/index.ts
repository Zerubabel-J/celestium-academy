export interface Team {
  id: string;
  name: string;
  logo: string;
  country?: string;
}

export interface Match {
  id: string;
  league: string;
  date: string;
  team1_id: string;
  team2_id: string;
  team1: Team;
  team2: Team;
  status: 'upcoming' | 'live' | 'finished' | 'cancelled';
  result?: {
    team1_score: number;
    team2_score: number;
    winner: 'team1' | 'team2' | 'draw';
  };
  featured: boolean;
  created_at: string;
  updated_at: string;
}

export interface Bet {
  id: string;
  user_id: string;
  match_id: string;
  bet_type: 'team1' | 'team2' | 'draw';
  amount: number;
  potential_win: number;
  bonus_amount: number;
  status: 'pending' | 'won' | 'lost' | 'cancelled';
  created_at: string;
  updated_at: string;
  match?: Match;
}

export interface BettingStats {
  match_id: string;
  team1_total_bets: number;
  team1_total_users: number;
  team2_total_bets: number;
  team2_total_users: number;
  draw_total_bets: number;
  draw_total_users: number;
  total_pool: number;
  updated_at: string;
}

export interface UserStats {
  user_id: string;
  total_bets: number;
  total_wins: number;
  total_losses: number;
  total_amount_bet: number;
  total_amount_won: number;
  win_rate: number;
  updated_at: string;
}

export interface PlatformStats {
  total_volume: number;
  total_earned_staking: number;
  total_users: number;
  online_users: number;
  updated_at: string;
}
