"use client";

import { forwardRef } from "react";
import { Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type StepCardProps = {
  title: string;
  buttonText?: string;
  badge?: React.ReactNode;
  className?: string;
  onClickVideo?: () => void;
};

const StepCard = forwardRef<HTMLDivElement, StepCardProps>(
  ({ title, buttonText = "Video", badge, className, onClickVideo }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "relative flex w-full max-w-sm flex-col items-center rounded-lg bg-academy-surface pt-12 pb-6 text-center transition-colors duration-200 md:max-w-lg",
          className
        )}
      >
        {badge && (
          <div className="absolute -top-[25px] left-1/2 -translate-x-1/2">
            {badge}
          </div>
        )}

        <h3 className="text-base md:text-lg mb-3 font-light px-8 md:px-10">
          {title}
        </h3>

        <div className="pl-4 pr-4">
          <Button
            className="h-10 w-40 bg-academy-primary text-white hover:bg-academy-primary-hover"
            size="default"
            onClick={onClickVideo}
          >
            {buttonText}
            <Play className="h-4 w-4 fill-academy-accent text-academy-accent" />
          </Button>
        </div>
      </div>
    );
  }
);

StepCard.displayName = "StepCard";
export default StepCard;
