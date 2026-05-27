"use client";

import { Button } from "@/components/ui/button";
import { Network } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  HEADER_VIEW_OPTIONS,
  HEADER_ACTIVE_VIEW,
  HEADER_INACTIVE_VIEW,
  HEADER_PRIMARY_TAB,
  HEADER_SECONDARY_TAB,
} from "@/app/genealogy/constants/genealogy-header";
import type { GenealogyHeaderProps } from "@/app/genealogy/types/genealogy-header";

export function GenealogyHeader({ view, onChangeView }: GenealogyHeaderProps) {
  return (
    <div className="flex flex-col items-center gap-6 px-4 py-10 text-center">
      <div className="flex gap-4">
        <Button variant="ghost" className={HEADER_SECONDARY_TAB}>
          Table
        </Button>
        <Button className={HEADER_PRIMARY_TAB}>Genealogy tree</Button>
      </div>

      <div className="max-w-6xl space-y-3">
        <Network className="mx-auto h-6 w-6 text-amber-400" />
        <h1 className="text-2xl font-semibold text-white">
          My network genealogy tree
        </h1>
        <p className="text-sm text-white/60">
          Genealogy tree is a visualization of your affiliate structure. Linear
          tree displays the direct affiliation while binary tree displays users’
          positions in binary form. Therefore all users from the linear
          structure are visible in binary tree but not all users from binary
          need to be visible in your linear tree as they might be direct
          affiliates of your upline structure. If you want to find out more
          about the affiliate, please visit the academy here.
        </p>
      </div>

      <div className="flex gap-4 pt-4">
        {HEADER_VIEW_OPTIONS.map((option) => (
          <Button
            key={option.value}
            onClick={() => onChangeView(option.value)}
            className={cn(
              view === option.value ? HEADER_ACTIVE_VIEW : HEADER_INACTIVE_VIEW
            )}
          >
            {option.label}
          </Button>
        ))}
      </div>
    </div>
  );
}
