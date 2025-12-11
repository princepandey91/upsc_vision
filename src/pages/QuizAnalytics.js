import React, { useContext } from "react";
import { AppContext } from "../AppContext";

function QuizAnalytics() {
  const { userScores } = useContext(AppContext);

  const avgScore = userScores.reduce((a, b) => a + b.score, 0) / userScores.length || 0;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">📊 Quiz Analytics</h2>
      <p>Average Score: {avgScore.toFixed(2)}</p>
      <p>Total Quizzes: {userScores.length}</p>
      {/* Future: Graphs, topic-wise breakdown */}
    </div>
  );
}

export default QuizAnalytics;