import React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface AcademyButtonProps {
  icon: React.ElementType;
  label: string;
  gradient?: string;
  iconColor?: string;
  textColor?: string;
  onClick?: () => void;
  className?: string;
}

export function AcademyButton({
  icon: Icon,
  label,
  gradient = "radial-gradient(ellipse 60% 150% at bottom, #7366ff -40%, #1d1a3d 60%)",
  iconColor = "#ffc800",
  textColor = "#ffffff",
  onClick,
  className,
}: AcademyButtonProps) {
  return (
    <Button
      type="button"
      onClick={onClick}
      variant="ghost"
      className={cn(
        "flex items-center justify-center gap-3 w-40 h-10 sm:w-40 md:w-20 lg:w-56 lg:h-12 bg-transparent transition-transform hover:scale-105 hover:bg-transparent active:scale-95",
        className
      )}
      style={{ background: gradient }}
    >
      <Icon
        className="size-5 sm:size-5 md:size-7"
        size={48}
        color={iconColor}
        aria-hidden="true"
      />
      <span
        className="text-base sm:text-lg font-medium leading-none"
        style={{ color: textColor }}
      >
        {label}
      </span>
    </Button>
  );
}
