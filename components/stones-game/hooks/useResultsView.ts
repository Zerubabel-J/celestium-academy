import { useEffect, useState } from "react";

export const useResultsView = (hasWinner: boolean) => {
  const [showResultsView, setShowResultsView] = useState(true);

  useEffect(() => {
    if (hasWinner) {
      setShowResultsView(true);
    }
  }, [hasWinner]);

  return { showResultsView, setShowResultsView };
};

