import React from "react";
import { CheckCircle2, Loader2 } from "lucide-react";
import { TransactionStep } from "../hooks/useTransactionFlow";
import { getStepStyles } from "../utils/transaction";

interface TransactionStepProps {
  step: TransactionStep;
  currentStep: TransactionStep;
  label: string;
  isPending?: boolean;
  showButton?: boolean;
  onButtonClick?: () => void;
  buttonLabel?: string;
  icon?: React.ReactNode;
  showConnector?: boolean;
}

export function TransactionStepItem({
  step,
  currentStep,
  label,
  isPending = false,
  showButton = false,
  onButtonClick,
  buttonLabel = "Approve",
  icon,
  showConnector = true,
}: TransactionStepProps) {
  const { circleStyles, textStyles, isActive, isCompleted } = getStepStyles(
    step,
    currentStep
  );

  const renderIcon = () => {
    if (isCompleted) {
      return <CheckCircle2 className="w-5 h-5" />;
    }
    if (isActive && isPending) {
      return <Loader2 className="w-5 h-5 animate-spin" />;
    }
    if (isActive && icon) {
      return icon;
    }
    return <div className="w-5 h-5 border-2 border-current rounded-full" />;
  };

  return (
    <div className="relative">
      <div className="flex items-center gap-4">
        <div
          className={`shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${circleStyles}`}
        >
          {renderIcon()}
        </div>
        <div className="flex-1">
          <div className={`text-sm font-medium ${textStyles}`}>{label}</div>
        </div>
        {showButton && isActive && (
          <button
            onClick={onButtonClick}
            disabled={isPending}
            className="bg-[#FFC800] hover:bg-[#E6B400] text-black font-semibold px-6 py-2 rounded disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isPending ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              buttonLabel
            )}
          </button>
        )}
      </div>
      {showConnector && currentStep !== "result" && (
        <div className="absolute left-5 top-10 w-0.5 h-8 bg-gray-700" />
      )}
    </div>
  );
}

