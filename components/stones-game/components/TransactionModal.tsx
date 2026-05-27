"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Image from "next/image";
import { CheckCircle2, Loader2, Lock, Zap, Trophy } from "lucide-react";
import cashCelestiumIcon from "../assets/Roulette/cash_celestium.svg";
import { useTransactionFlow } from "../hooks/useTransactionFlow";
import { formatBetAmount } from "../utils/transaction";
import { TransactionStep } from "../hooks/useTransactionFlow";

interface TransactionModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  betAmount: number;
  potentialWinning: number;
  onTransactionComplete?: () => void;
}

const steps: Array<{
  key: TransactionStep;
  label: string;
  icon: React.ReactNode;
}> = [
  { key: "approve", label: "Approve", icon: <Lock className="w-5 h-5" /> },
  { key: "execute", label: "Execute", icon: <Zap className="w-5 h-5" /> },
  { key: "result", label: "Complete", icon: <Trophy className="w-5 h-5" /> },
];

function getStepStatus(step: TransactionStep, currentStep: TransactionStep) {
  if (step === currentStep) return "active";
  const stepOrder: TransactionStep[] = ["approve", "execute", "result"];
  const currentIndex = stepOrder.indexOf(currentStep);
  const stepIndex = stepOrder.indexOf(step);
  return stepIndex < currentIndex ? "completed" : "pending";
}

export function TransactionModal({
  open,
  onOpenChange,
  betAmount,
  potentialWinning,
  onTransactionComplete,
}: TransactionModalProps) {
  const { currentStep, isPending, handleApprove } = useTransactionFlow({
    betAmount,
    onTransactionComplete,
    isOpen: open,
  });

  const currentStepIndex = steps.findIndex((s) => s.key === currentStep);
  const progress = ((currentStepIndex + 1) / steps.length) * 100;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="bg-gradient-to-br from-[#0f1419] via-[#131624] to-[#0f1419] border-gray-800 text-white max-w-lg"
        showCloseButton={true}
      >
        <DialogHeader className="space-y-4">
          <DialogTitle className="text-white text-2xl font-bold text-center">
            Processing Your Bet
          </DialogTitle>
          <div className="flex items-center justify-center gap-3 py-2">
            <span className="text-3xl font-bold">
              {formatBetAmount(betAmount)}
            </span>
            <Image
              src={cashCelestiumIcon}
              alt="CELESTIUM"
              width={24}
              height={24}
              className="w-6 h-6"
            />
          </div>
        </DialogHeader>

        <div className="space-y-6 py-6">
          <div className="relative">
            <div className="flex items-center justify-between mb-4 relative">
              <div className="absolute top-6 left-12 right-12 h-0.5 flex z-0">
                {steps.slice(0, -1).map((_, index) => {
                  const currentIndex = steps.findIndex(
                    (s) => s.key === currentStep
                  );
                  const isCompleted = currentIndex > index;

                  return (
                    <div
                      key={index}
                      className={`flex-1 h-full transition-all duration-500 ${
                        isCompleted
                          ? "bg-green-500"
                          : currentIndex === index
                          ? "bg-[#FFC800]"
                          : "bg-gray-800"
                      }`}
                    />
                  );
                })}
              </div>
              {steps.map((step, index) => {
                const status = getStepStatus(step.key, currentStep);
                const isActive = status === "active";
                const isCompleted = status === "completed";

                return (
                  <div
                    key={step.key}
                    className="flex flex-col items-center flex-1 relative z-10"
                  >
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 ${
                        isCompleted
                          ? "bg-green-500 text-white shadow-lg shadow-green-500/50"
                          : isActive
                          ? "bg-[#FFC800] text-black shadow-lg shadow-[#FFC800]/50 scale-110"
                          : "bg-gray-800 text-gray-500"
                      }`}
                    >
                      {isCompleted ? (
                        <CheckCircle2 className="w-6 h-6" />
                      ) : isActive && isPending ? (
                        <Loader2 className="w-6 h-6 animate-spin" />
                      ) : (
                        step.icon
                      )}
                    </div>
                    <span
                      className={`text-xs font-medium mt-2 ${
                        isActive || isCompleted ? "text-white" : "text-gray-500"
                      }`}
                    >
                      {step.label}
                    </span>
                  </div>
                );
              })}
            </div>

            <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#FFC800] to-[#E6B400] transition-all duration-500 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
            <div className="text-center">
              <p className="text-sm text-gray-400 mb-1">Current Step</p>
              <p className="text-lg font-semibold text-white">
                {steps.find((s) => s.key === currentStep)?.label ||
                  "Processing"}
              </p>
              {currentStep === "approve" && (
                <button
                  onClick={handleApprove}
                  disabled={isPending}
                  className="mt-4 w-full bg-gradient-to-r from-[#FFC800] to-[#E6B400] hover:from-[#E6B400] hover:to-[#FFC800] text-black font-bold py-3 px-6 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                >
                  {isPending ? (
                    <span className="flex items-center justify-center gap-2">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Waiting for signature...
                    </span>
                  ) : (
                    "Sign Transaction"
                  )}
                </button>
              )}
              {currentStep === "execute" && (
                <div className="mt-4 flex items-center justify-center gap-2 text-[#FFC800]">
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span className="text-sm">Executing transaction...</span>
                </div>
              )}
              {currentStep === "result" && (
                <div className="mt-4 flex items-center justify-center gap-2 text-green-400">
                  <CheckCircle2 className="w-5 h-5" />
                  <span className="text-sm font-medium">
                    Transaction completed!
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
