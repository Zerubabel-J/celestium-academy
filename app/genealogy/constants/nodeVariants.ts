export type GenealogyVariant =
  | "primary"
  | "favorite"
  | "heart"
  | "default"
  | "destructive"
  | "root";

export interface GenealogyVariantTokens {
  border: string;
  dot: string;
  text: string;
  action: string;
}

export const GENEALOGY_VARIANT_TOKENS: Record<
  GenealogyVariant,
  GenealogyVariantTokens
> = {
  primary: {
    border: "border-accent",
    dot: "bg-accent",
    text: "text-accent",
    action: "bg-genealogy-accent hover:bg-genealogy-accent!",
  },
  favorite: {
    border: "border-amber-300",
    dot: "bg-amber-300",
    text: "text-amber-300",
    action: "bg-amber-300 hover:bg-amber-300!",
  },
  heart: {
    border: "border-rose-500",
    dot: "bg-rose-500",
    text: "text-rose-500",
    action: "bg-rose-500 hover:bg-rose-500!",
  },
  default: {
    border: "border-genealogy-accent",
    dot: "bg-genealogy-accent",
    text: "text-genealogy-accent",
    action: "bg-genealogy-accent hover:bg-genealogy-accent!",
  },
  destructive: {
    border: "border-destructive",
    dot: "bg-destructive",
    text: "text-destructive",
    action: "bg-genealogy-accent hover:bg-genealogy-accent!",
  },
  root: {
    border: "border-genealogy-accent",
    dot: "bg-genealogy-accent",
    text: "text-amber-300",
    action: "bg-genealogy-accent hover:bg-genealogy-accent!",
  },
};

export const GENEALOGY_NODE_DIMENSIONS = {
  root: "p-8 min-w-[300px] min-h-[250px]",
  regular: "p-3 min-w-[220px] min-h-[110px]",
};
