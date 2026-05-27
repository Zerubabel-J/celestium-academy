export const GAME_CONFIG = {
  BETTING_PHASE_DURATION: 5000, // 5 seconds
  MIN_BET: 0.01,
  MAX_BET: 100000,
  DEFAULT_BET: 100,
  MAX_MULTIPLIER: 1000,
  MIN_MULTIPLIER: 1.01,
  CRASH_PROBABILITY: 0.01, // 1% chance to crash at any moment
  ANIMATION_DURATION: 100, // milliseconds between multiplier updates
} as const;

export const GAME_PHASES = {
  WAITING: 'waiting',
  BETTING: 'betting',
  FLYING: 'flying',
  CRASHED: 'crashed',
} as const;

export const PLAYER_STATUSES = {
  ACTIVE: 'active',
  WON: 'won',
  LOST: 'lost',
  CASHED_OUT: 'cashed_out',
} as const;

export const ROUND_STATUSES = {
  WAITING: 'waiting',
  ACTIVE: 'active',
  CRASHED: 'crashed',
  COMPLETED: 'completed',
} as const;

export const CHART_COLORS = {
  PRIMARY: '#10b981',
  SECONDARY: '#8b5cf6',
  ACCENT: '#f59e0b',
  DANGER: '#ef4444',
  SUCCESS: '#22c55e',
  WARNING: '#f97316',
  INFO: '#3b82f6',
} as const;

export const MULTIPLIER_COLORS = [
  '#10b981', // Green
  '#8b5cf6', // Purple
  '#f59e0b', // Yellow
  '#ef4444', // Red
  '#06b6d4', // Cyan
  '#ec4899', // Pink
  '#f97316', // Orange
  '#3b82f6', // Blue
] as const;

export const MOCK_PLAYERS = [
  { username: 'player_777', betAmount: 250.55, multiplier: 68.87, status: 'active' as const },
  { username: 'player_777', betAmount: 250.55, multiplier: 68.87, status: 'active' as const },
  { username: 'player_777', betAmount: 250.55, multiplier: 68.87, status: 'active' as const },
  { username: 'player_777', betAmount: 250.55, multiplier: 68.87, status: 'active' as const },
  { username: 'player_777', betAmount: 250.55, multiplier: 68.87, status: 'active' as const },
  { username: 'player_777', betAmount: 250.55, multiplier: 68.87, status: 'active' as const },
  { username: 'player_777', betAmount: 250.55, multiplier: 68.87, status: 'active' as const },
  { username: 'player_777', betAmount: 250.55, multiplier: 68.87, status: 'active' as const },
] as const;
