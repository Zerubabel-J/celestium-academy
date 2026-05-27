import { TransactionStep } from "../hooks/useTransactionFlow";

export function getStepStyles(step: TransactionStep, currentStep: TransactionStep) {
  const isActive = step === currentStep;
  const isCompleted =
    (step === "approve" && (currentStep === "execute" || currentStep === "result")) ||
    (step === "execute" && currentStep === "result");

  const circleStyles = isActive
    ? "bg-[#FFC800] text-black"
    : isCompleted
      ? "bg-green-500 text-white"
      : "bg-gray-700 text-gray-400";

  const textStyles = isActive
    ? "text-[#FFC800]"
    : isCompleted
      ? "text-green-400"
      : "text-gray-400";

  return { circleStyles, textStyles, isActive, isCompleted };
}

export function formatBetAmount(amount: number): string {
  return amount.toLocaleString();
}

