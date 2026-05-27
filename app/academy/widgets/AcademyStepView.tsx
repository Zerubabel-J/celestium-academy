import { ArrowLeft, ArrowRight, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import LevelBadge from "./LevelBadge";
import StarLevelBadge from "./StarLevelBadge";
import type { AcademyLevelResolved } from "../types/academy";

type AcademyStepViewProps = {
  stepId: string;
  levels: AcademyLevelResolved[];
  onBack?: () => void;
};

export default function AcademyStepView({
  stepId,
  levels,
  onBack,
}: AcademyStepViewProps) {
  const currentLevel = levels.find((lvl) =>
    lvl.steps.some((st) => st.id === stepId)
  );
  const currentStep = currentLevel?.steps.find((st) => st.id === stepId);

  const stepNumber = currentStep?.badgeNumber ?? 0;
  const stepTitle = currentStep?.title ?? "Unknown Step";
  const levelNumber = currentLevel?.star?.level ?? 1;
  const levelSubtitle = currentLevel?.star?.subtitle ?? "Academy Level";

  return (
    <div className="flex flex-col items-center justify-center px-6">
      <div className="border-b border-white/10 w-full max-w-6xl mx-auto mb-8" />

      <div className="flex items-center gap-4 mb-8 w-full max-w-3xl">
        <Button
          variant="ghost"
          size="icon"
          onClick={onBack}
          className="h-12 w-12 text-gray-400 hover:text-white"
        >
          <ArrowLeft className="size-5" />
        </Button>

        <div className="flex items-center gap-3">
          <StarLevelBadge level={levelNumber} />

          <div className="flex flex-col sm:flex-row sm:items-center sm:gap-3">
            <div className="text-lg font-semibold">{`LVL ${levelNumber}`}</div>
            <div className="text-sm text-gray-400">{levelSubtitle}</div>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center w-full ">
        <div className="flex items-center gap-6 mb-12">
          <div className="flex items-center justify-center w-8 h-8">
            <LevelBadge number={stepNumber} className="scale-85" />
          </div>
          <h1 className="text-2xl font-normal">{stepTitle}</h1>
        </div>
        <div
          className="
                    w-[95%]
                    sm:w-[85%]
                    md:w-[75%]
                    lg:w-[65%]
                    xl:w-[60%]
                    aspect-video
                    bg-academy-surface
                    rounded-2xl
                    flex items-center justify-center
                    relative
                    mx-auto
                  "
        >
          <Button className="bg-academy-primary hover:bg-academy-primary-hover text-white w-32 gap-2 px-8 py-6 rounded-md text-base">
            Video
            <Play className="h-5 w-5 fill-academy-accent text-academy-accent" />
          </Button>
        </div>

        <div className="flex items-center justify-between w-full max-w-3xl mt-4">
          <Button
            variant="ghost"
            size="icon"
            className="h-14 w-14 text-gray-500 hover:text-white"
          >
            <ArrowLeft className="size-7" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-14 w-14 text-gray-500 hover:text-white"
          >
            <ArrowRight className="size-7" />
          </Button>
        </div>
      </div>
    </div>
  );
}
