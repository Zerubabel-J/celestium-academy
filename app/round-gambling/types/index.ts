export interface Player {
  id: string;
  username: string;
  avatar?: string;
  betAmount: number;
  multiplier: number;
  winnings?: number;
  status: 'active' | 'won' | 'lost' | 'cashed_out';
  cashOutAt?: number;
}

export interface GameRound {
  id: string;
  roundNumber: number;
  startTime: Date;
  endTime?: Date;
  crashPoint: number;
  status: 'waiting' | 'active' | 'crashed' | 'completed';
  players: Player[];
  totalBets: number;
  totalWinnings: number;
}

export interface GameState {
  currentRound: GameRound | null;
  roundHistory: GameRound[];
  currentMultiplier: number;
  timeLeft: number;
  gamePhase: 'standby' | 'waiting' | 'betting' | 'spinning' | 'landed' | 'stopped';
  playerBet: number;
  playerCashOut?: number;
  isPlaying: boolean;
  winnerOffset?: number;
  targetWinnerIndex?: number;
}

export interface GameStats {
  totalCelestiums: number;
  totalBonus: number;
  paidToStaking: number;
  totalUsers: number;
  currentRoundNumber: number;
}

export interface BonusData {
  rounds: number[];
  multipliers: number[];
  timestamps: string[];
}

export interface PlayerStats {
  username: string;
  totalBets: number;
  totalWins: number;
  winRate: number;
  biggestWin: number;
  currentStreak: number;
}
