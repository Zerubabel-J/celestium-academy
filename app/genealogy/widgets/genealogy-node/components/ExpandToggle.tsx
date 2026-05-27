"use client";

import type { MouseEvent } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  GENEALOGY_VARIANT_TOKENS,
  type GenealogyVariant,
} from "@/app/genealogy/constants/nodeVariants";
import { ChevronDown, ChevronRight, ArrowDown } from "lucide-react";

interface ExpandToggleProps {
  onClick: (event: MouseEvent<HTMLButtonElement>) => void;
  isOpen?: boolean;
  variant: GenealogyVariant;
  icon: "chevron" | "arrow";
}

export function ExpandToggle({
  onClick,
  isOpen,
  variant,
  icon,
}: ExpandToggleProps) {
  const tokens = GENEALOGY_VARIANT_TOKENS[variant];

  return (
    <Button
      type="button"
      size="icon"
      variant="ghost"
      onClick={onClick}
      className={cn(
        "h-8 w-8 rounded-full border-2 bg-slate-950 transition-transform hover:scale-110 hover:bg-slate-950! hover:text-slate-50 focus-visible:ring-0",
        tokens.border
      )}
      aria-label="Toggle children"
    >
      {icon === "chevron" ? (
        isOpen ? (
          <ChevronDown className="h-4 w-4" />
        ) : (
          <ChevronRight className="h-4 w-4" />
        )
      ) : (
        <ArrowDown
          className={cn(
            "h-4 w-4 transition-transform duration-200",
            !isOpen && "rotate-180"
          )}
        />
      )}
    </Button>
  );
}
