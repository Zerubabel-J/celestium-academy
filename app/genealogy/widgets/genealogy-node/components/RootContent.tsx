import Image from "next/image";
import { cn } from "@/lib/utils";
import type { GenealogyVariantTokens } from "@/app/genealogy/constants/nodeVariants";
import {
  DEFAULT_LEFT_VOLUME,
  DEFAULT_RIGHT_VOLUME,
  ROOT_AVATAR_SRC,
  ROOT_BORDER_FADE,
} from "@/app/genealogy/constants/genealogy-node";
import type { GenealogyNodeData } from "../../../types/genealogy-node";

interface RootContentProps {
  data: GenealogyNodeData;
  tokens: GenealogyVariantTokens;
}

export function RootContent({ data, tokens }: RootContentProps) {
  return (
    <div className="flex flex-col items-center space-y-4 text-center">
      <div className={cn("rounded-full border", tokens.border)}>
        <Image
          src={data.avatarUrl ?? ROOT_AVATAR_SRC}
          alt={data.name}
          width={96}
          height={96}
          className="h-24 w-24 rounded-full"
        />
      </div>
      <h3 className={cn("text-2xl font-bold", tokens.text)}>{data.name}</h3>
      <p className="text-xs text-genealogy-accent">{data.id}</p>
      <div
        className="my-3 w-full border-t"
        style={{ borderColor: ROOT_BORDER_FADE }}
      />
      <p className="text-sm text-white">
        Unmatched volume in{" "}
        <span className="font-medium text-amber-300">CELESTIUM</span>
      </p>
      <div className="flex items-center justify-center gap-10 pt-2 text-white">
        <div className="flex flex-col items-center">
          <span className="text-lg font-bold">
            {data.leftVolume ?? DEFAULT_LEFT_VOLUME}
          </span>
          <span className={cn("text-sm", tokens.text)}>Left</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-lg font-bold">
            {data.rightVolume ?? DEFAULT_RIGHT_VOLUME}
          </span>
          <span className={cn("text-sm", tokens.text)}>Right</span>
        </div>
      </div>
    </div>
  );
}
