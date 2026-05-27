"use client";

import type { MouseEvent, ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ActionButtonProps {
  onClick: (event: MouseEvent<HTMLButtonElement>) => void;
  label: string;
  children: ReactNode;
  background: string;
}

export function ActionButton({
  onClick,
  label,
  children,
  background,
}: ActionButtonProps) {
  return (
    <Button
      type="button"
      size="icon"
      variant="ghost"
      onClick={onClick}
      aria-label={label}
      className={cn(
        "h-8 w-8 rounded-full text-slate-950 transition-transform hover:scale-110 hover:text-slate-950 focus-visible:ring-0",
        background
      )}
    >
      {children}
    </Button>
  );
}
