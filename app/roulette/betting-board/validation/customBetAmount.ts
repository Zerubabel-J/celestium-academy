import { z } from "zod";

const SUFFIX_MULTIPLIERS = {
  k: 1_000,
  m: 1_000_000,
  b: 1_000_000_000,
} as const;

export const MAX_CUSTOM_BET = 1_000_000_000;

const normalizeCustomBetInput = (value: string) =>
  value
    .toLowerCase()
    .replace(/celestiums?/g, "")
    .replace(/celestium/g, "")
    .replace(/tokens?/g, "")
    .replace(/,/g, "")
    .replace(/\s+/g, "");

export const parseCustomBetAmount = (value: string) => {
  const normalized = normalizeCustomBetInput(value);

  if (!normalized) {
    return { normalized, amount: Number.NaN };
  }

  const match = normalized.match(/^(\d+(?:\.\d+)?)([kmb])?$/);

  if (!match) {
    return { normalized, amount: Number.NaN };
  }

  const numericPart = Number.parseFloat(match[1] ?? "");

  if (!Number.isFinite(numericPart)) {
    return { normalized, amount: Number.NaN };
  }

  const suffix = match[2] as keyof typeof SUFFIX_MULTIPLIERS | undefined;
  const multiplier = suffix ? SUFFIX_MULTIPLIERS[suffix] : 1;

  return {
    normalized,
    amount: Math.round(numericPart * multiplier),
  };
};

export const customBetAmountSchema = z
  .string()
  .trim()
  .min(1, "Enter a CELESTIUM amount.")
  .transform((value, ctx) => {
    const { amount } = parseCustomBetAmount(value);

    if (!Number.isFinite(amount)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Enter a valid CELESTIUM amount.",
      });
      return z.NEVER;
    }

    if (amount <= 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Enter a positive CELESTIUM amount.",
      });
      return z.NEVER;
    }

    if (amount > MAX_CUSTOM_BET) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Amount exceeds the 1B CELESTIUM limit.",
      });
      return z.NEVER;
    }

    return amount;
  });

export type CustomBetAmount = z.infer<typeof customBetAmountSchema>;
