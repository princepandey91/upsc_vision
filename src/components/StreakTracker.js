import React, { useEffect } from "react";

function StreakTracker({ streak }) {
  useEffect(() => {
    if (streak > 0) {
      alert(`🔥 Don't break your streak! Current streak: ${streak} days`);
    }
  }, [streak]);

  return <p>Current Streak: {streak} days</p>;
}

export default StreakTracker;