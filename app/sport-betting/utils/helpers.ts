export const getLastName = (fullName: string): string => {
  const parts = fullName.trim().split(/\s+/);
  return parts[parts.length - 1] || fullName;
};

export const formatNumber = (num: number): string => {
  return new Intl.NumberFormat().format(num);
};

export const calculatePotentialWin = (betAmount: number): number => {
  return Math.floor(betAmount * 1.25);
};

export const calculateBonusAmount = (betAmount: number): number => {
  return Math.floor(betAmount * 0.05);
};

