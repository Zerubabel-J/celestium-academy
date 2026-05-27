"use client";

import { JSX, memo } from "react";
import { Handle, Position } from "@xyflow/react";
import { Heart, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  GENEALOGY_NODE_DIMENSIONS,
  GENEALOGY_VARIANT_TOKENS,
  type GenealogyVariant,
} from "@/app/genealogy/constants/nodeVariants";
import {
  ActionButton,
  ExpandToggle,
  ConnectionDot,
  RootContent,
  MemberContent,
} from "./components";
import type { GenealogyNodeData } from "../../types/genealogy-node";

export const GenealogyNode = memo(
  ({ data }: { data: GenealogyNodeData }): JSX.Element => {
    const variant: GenealogyVariant = data.variant ?? "default";
    const tokens = GENEALOGY_VARIANT_TOKENS[variant];
    const isBinaryView = data.viewType === "binary";
    const inputPosition = isBinaryView ? Position.Top : Position.Left;
    const outputPosition = isBinaryView ? Position.Bottom : Position.Right;
    const cardSize =
      variant === "root"
        ? GENEALOGY_NODE_DIMENSIONS.root
        : GENEALOGY_NODE_DIMENSIONS.regular;

    return (
      <div className="relative">
        {variant !== "root" && (
          <div className="absolute -top-4 left-4 z-10 flex items-center gap-2">
            <ActionButton
              label="Toggle heart"
              onClick={(event) => {
                event.stopPropagation();
                data.onToggleHeart?.();
              }}
              background={
                data.variant === "heart"
                  ? GENEALOGY_VARIANT_TOKENS.heart.action
                  : data.variant === "favorite"
                  ? GENEALOGY_VARIANT_TOKENS.favorite.action
                  : GENEALOGY_VARIANT_TOKENS.default.action
              }
            >
              <Heart className="h-4 w-4" fill="currentColor" stroke="none" />
            </ActionButton>
            <ActionButton
              label="Toggle favorite"
              onClick={(event) => {
                event.stopPropagation();
                data.onToggleFavorite?.();
              }}
              background={
                data.variant === "favorite"
                  ? GENEALOGY_VARIANT_TOKENS.favorite.action
                  : data.variant === "heart"
                  ? GENEALOGY_VARIANT_TOKENS.heart.action
                  : GENEALOGY_VARIANT_TOKENS.default.action
              }
            >
              <Star className="h-4 w-4" fill="currentColor" stroke="none" />
            </ActionButton>
            {!isBinaryView && data.hasChildren && (
              <ExpandToggle
                icon="chevron"
                variant={variant}
                isOpen={data.isExpanded}
                onClick={(event) => {
                  event.stopPropagation();
                  data.onToggleExpand?.();
                }}
              />
            )}
          </div>
        )}

        {isBinaryView && data.hasChildren && (
          <div className="absolute -bottom-4 left-1/2 z-10 -translate-x-1/2">
            <ExpandToggle
              icon="arrow"
              variant={variant}
              isOpen={data.isExpanded}
              onClick={(event) => {
                event.stopPropagation();
                data.onToggleExpand?.();
              }}
            />
          </div>
        )}

        {isBinaryView ? (
          <>
            <ConnectionDot
              variant={variant}
              className="absolute -top-1.5 left-1/2 -translate-x-1/2"
            />
            {!data.hasChildren && (
              <ConnectionDot
                variant={variant}
                className="absolute -bottom-1.5 left-1/2 -translate-x-1/2"
              />
            )}
          </>
        ) : (
          <>
            <ConnectionDot
              variant={variant}
              className="absolute -left-1.5 top-1/2 -translate-y-1/2"
            />
            {data.hasChildren && (
              <ConnectionDot
                variant={variant}
                className="absolute -right-1.5 top-1/2 -translate-y-1/2"
              />
            )}
          </>
        )}

        <div
          className={cn(
            "rounded-lg border-2 bg-transparent transition-all",
            tokens.border,
            cardSize
          )}
        >
          <Handle
            type="target"
            position={inputPosition}
            className="border-0! bg-transparent!"
          />
          {variant === "root" ? (
            <RootContent data={data} tokens={tokens} />
          ) : (
            <MemberContent data={data} />
          )}
          <Handle
            type="source"
            position={outputPosition}
            className="border-0! bg-transparent!"
          />
        </div>
      </div>
    );
  }
);

GenealogyNode.displayName = "GenealogyNode";
