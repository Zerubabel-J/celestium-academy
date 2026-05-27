import { cn } from "@/lib/utils";
import {
  GENEALOGY_VARIANT_TOKENS,
  type GenealogyVariant,
} from "@/app/genealogy/constants/nodeVariants";

interface ConnectionDotProps {
  className: string;
  variant: GenealogyVariant;
}

export function ConnectionDot({ className, variant }: ConnectionDotProps) {
  return (
    <div
      className={cn(
        "h-3 w-3 rounded-full z-10",
        className,
        GENEALOGY_VARIANT_TOKENS[variant].dot
      )}
    />
  );
}
