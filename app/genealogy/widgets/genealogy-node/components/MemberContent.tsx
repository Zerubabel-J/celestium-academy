"use client";

import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import {
  DEFAULT_MEMBER_AMOUNT,
  DEFAULT_MEMBER_SCORE,
} from "@/app/genealogy/constants/genealogy-node";
import type { GenealogyNodeData } from "../../../types/genealogy-node";

interface MemberContentProps {
  data: GenealogyNodeData;
}

export function MemberContent({ data }: MemberContentProps) {
  return (
    <>
      <div className="flex items-center justify-end">
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="h-6 w-6 text-muted-foreground hover:text-foreground"
        >
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </div>
      <h3 className="mb-1 font-semibold text-foreground">{data.name}</h3>
      <div className="flex items-center justify-between text-sm">
        <span className="text-muted-foreground">{data.id}</span>
        <div className="flex items-baseline gap-1 text-right">
          <span className="font-semibold text-amber-400">
            {DEFAULT_MEMBER_SCORE}
          </span>
          <span className="text-muted-foreground">
            / {data.amount ?? DEFAULT_MEMBER_AMOUNT}
          </span>
        </div>
      </div>
    </>
  );
}
