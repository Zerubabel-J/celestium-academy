import { useMemo } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { ACADEMY_LEVELS } from "../data/academy-levels";
import type {
  AcademyLevelResolved,
  ResolvedStepRelation,
  StepRelationConfig,
  StepRelationVariant,
} from "../types/academy";

const pickVariant = (
  config: StepRelationConfig,
  isMobile: boolean
): StepRelationVariant | undefined => {
  if (isMobile) {
    if (config.mobile === null) {
      return undefined;
    }
    if (config.mobile) {
      return config.mobile;
    }
    if (config.desktop === null) {
      return undefined;
    }
    return config.desktop ?? undefined;
  }
  if (config.desktop === null) {
    return undefined;
  }
  if (config.desktop) {
    return config.desktop;
  }
  if (config.mobile === null) {
    return undefined;
  }
  return config.mobile ?? undefined;
};

const buildRelations = (
  relations: StepRelationConfig[] | undefined,
  isMobile: boolean
): ResolvedStepRelation[] | undefined => {
  if (!relations) {
    return undefined;
  }
  const resolved = relations
    .map((relation) => {
      const variant = pickVariant(relation, isMobile);
      if (!variant) {
        return undefined;
      }
      return {
        targetId: relation.targetId,
        sourceAnchor: variant.sourceAnchor,
        targetAnchor: variant.targetAnchor,
        style: variant.style,
      } satisfies ResolvedStepRelation;
    })
    .filter(Boolean) as ResolvedStepRelation[];
  return resolved.length > 0 ? resolved : undefined;
};

export const useAcademyFlow = (): {
  levels: AcademyLevelResolved[];
  isMobile: boolean;
} => {
  const isMobile = useIsMobile();
  const levels = useMemo(() => {
    return ACADEMY_LEVELS.map((level) => ({
      ...level,
      steps: level.steps.map((step) => ({
        ...step,
        relations: buildRelations(step.relations, isMobile),
      })),
    }));
  }, [isMobile]);

  return { levels, isMobile };
};
