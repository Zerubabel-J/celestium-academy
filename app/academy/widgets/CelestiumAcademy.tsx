"use client";

import { useState } from "react";
import AcademyLayout from "./AcademyLayout";
import AcademyFlow from "./AcademyFlow";
import AcademyStepView from "./AcademyStepView";
import { useAcademyFlow } from "../hooks/useAcademyFlow";

export default function CelestiumAcademy() {
  const [selectedStepId, setSelectedStepId] = useState<string | null>(null);
  const { levels } = useAcademyFlow(); // also get flow data here

  return (
    <AcademyLayout activeResourceId="for-newbies">
      {selectedStepId ? (
        <AcademyStepView
          stepId={selectedStepId}
          onBack={() => setSelectedStepId(null)}
          levels={levels}
        />
      ) : (
        <AcademyFlow onStepSelect={setSelectedStepId} />
      )}
    </AcademyLayout>
  );
}
