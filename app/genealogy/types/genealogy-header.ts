import type { GenealogyView } from "./common";

export interface GenealogyHeaderProps {
  view: GenealogyView;
  onChangeView: (view: GenealogyView) => void;
}
