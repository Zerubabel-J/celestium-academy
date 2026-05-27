import type { GenealogyView } from "@/app/genealogy/types/common";

export const HEADER_VIEW_OPTIONS: Array<{
  label: string;
  value: GenealogyView;
}> = [
  { label: "Linear", value: "linear" },
  { label: "Binary", value: "binary" },
];

export const HEADER_ACTIVE_VIEW =
  "bg-amber-400 text-black hover:bg-amber-300 font-semibold";
export const HEADER_INACTIVE_VIEW =
  "bg-slate-900 text-gray-300 hover:bg-slate-800";
export const HEADER_PRIMARY_TAB =
  "bg-amber-400 text-black hover:bg-amber-300 font-semibold";
export const HEADER_SECONDARY_TAB =
  "border border-slate-600 bg-transparent text-gray-400 hover:bg-slate-900";
