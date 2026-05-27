"use client";

import { useState } from "react";
import GenealogyTree from "./widgets/GenealogyTree";
import { GenealogyHeader } from "./widgets/GenealogyHeader";
import type { GenealogyView } from "./types/common";

export default function GenealogyPage() {
  const [view, setView] = useState<GenealogyView>("linear");

  return (
    <main className="flex flex-col bg-genealogy-background">
      <GenealogyHeader view={view} onChangeView={setView} />
      <div className="flex flex-1 relative px-6 pb-6">
        <GenealogyTree view={view} />
      </div>
    </main>
  );
}
