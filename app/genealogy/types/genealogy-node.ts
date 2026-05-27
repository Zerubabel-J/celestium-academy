import type { GenealogyVariant } from "@/app/genealogy/constants/nodeVariants";
import type { GenealogyView } from "./common";

export type GenealogyNodeData = {
  name: string;
  id: string;
  percentage?: string;
  amount?: string;
  variant?: GenealogyVariant;
  isExpanded?: boolean;
  hasChildren?: boolean;
  parentId?: string;
  viewType?: GenealogyView;
  onToggleHeart?: () => void;
  onToggleFavorite?: () => void;
  onToggleExpand?: () => void;
  avatarUrl?: string;
  leftVolume?: string;
  rightVolume?: string;
} & Record<string, unknown>;
