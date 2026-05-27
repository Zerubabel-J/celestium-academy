import { useEffect } from "react";
import { animate, type MotionValue } from "motion/react";
import type { Segment } from "../../../utils/segments";

type UseRouletteAnimationProps = {
  spinKey: number;
  spinTarget: string | null;
  segments: Segment[];
  sliceAngle: number;
  rotation: MotionValue<number>;
  onSpinComplete: (stoneId: string) => void;
};

export const useRouletteAnimation = ({
  spinKey,
  spinTarget,
  segments,
  sliceAngle,
  rotation,
  onSpinComplete,
}: UseRouletteAnimationProps) => {
  useEffect(() => {
    if (!spinTarget || segments.length === 0) return;

    const targetIndices = segments
      .map((segment, index) => (segment.stone.id === spinTarget ? index : -1))
      .filter((index) => index >= 0);

    if (targetIndices.length === 0) return;

    const targetIndex =
      targetIndices[(spinKey + targetIndices.length) % targetIndices.length];
    const targetAngle = segments[targetIndex].midAngle;

    const currentRotation = rotation.get();
    const normalized = ((currentRotation % 360) + 360) % 360;

    const pointerAngle = 0;
    const rotationNeeded = pointerAngle - targetAngle;
    const normalizedRotation = ((rotationNeeded % 360) + 360) % 360;

    let delta = 360 * 4 + normalizedRotation - normalized;
    if (delta < sliceAngle * 1.5) {
      delta += 360;
    }

    const animation = animate(rotation, currentRotation + delta, {
      duration: 4.4,
      ease: [0.16, 0.74, 0.25, 1],
    });

    animation.finished.then(() => {
      onSpinComplete(segments[targetIndex].stone.id);
    });

    return () => animation.stop();
  }, [spinKey, spinTarget, segments, sliceAngle, rotation, onSpinComplete]);
};
