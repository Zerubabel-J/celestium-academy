"use client";

import { ArcherContainer, ArcherElement } from "react-archer";
import StepCard from "./StepCard";
import LevelBadge from "./LevelBadge";
import StarLevelBadge from "./StarLevelBadge";
import {
  ACADEMY_ARCHER_END_SHAPE,
  ACADEMY_ARCHER_LINE_STYLE,
  ACADEMY_ARCHER_OFFSET,
  ACADEMY_ARCHER_STROKE_COLOR,
  ACADEMY_ARCHER_STROKE_WIDTH,
  ACADEMY_ARCHER_STYLE,
  ACADEMY_SVG_CONTAINER_STYLE,
} from "../constants/academy";
import { useAcademyFlow } from "../hooks/useAcademyFlow";

type AcademyFlowProps = {
  onStepSelect?: (stepId: string) => void;
};

export default function AcademyFlow({ onStepSelect }: AcademyFlowProps) {
  const { levels } = useAcademyFlow();

  return (
    <div className="relative">
      <ArcherContainer
        strokeColor={ACADEMY_ARCHER_STROKE_COLOR}
        strokeWidth={ACADEMY_ARCHER_STROKE_WIDTH}
        lineStyle={ACADEMY_ARCHER_LINE_STYLE}
        offset={ACADEMY_ARCHER_OFFSET}
        endShape={ACADEMY_ARCHER_END_SHAPE}
        style={ACADEMY_ARCHER_STYLE}
        svgContainerStyle={ACADEMY_SVG_CONTAINER_STYLE}
      >
        {levels.map((level) => (
          <div key={level.id} className={level.layout.sectionClassName}>
            <div className={level.layout.contentClassName}>
              {level.star && (
                <div className={level.star.wrapperClassName}>
                  <StarLevelBadge
                    level={level.star.level}
                    title={level.star.title}
                    subtitle={level.star.subtitle}
                    className={level.star.className}
                  />
                </div>
              )}
              <div className={level.layout.stepsClassName}>
                {level.steps.map((step) => (
                  <ArcherElement
                    key={step.id}
                    id={step.id}
                    relations={step.relations}
                  >
                    <div className={step.containerClassName}>
                      <StepCard
                        title={step.title}
                        buttonText={step.buttonText}
                        className={step.cardClassName}
                        badge={
                          <LevelBadge
                            number={step.badgeNumber}
                            showText={false}
                          />
                        }
                        onClickVideo={() => onStepSelect?.(step.id)}
                      />
                    </div>
                  </ArcherElement>
                ))}
              </div>
            </div>
          </div>
        ))}
      </ArcherContainer>
    </div>
  );
}
