import React from "react";

function Badges({ score, streak, quizzes }) {
  return (
    <div className="flex gap-4">
      {score >= 90 && <span>🏅 Accuracy Master</span>}
      {streak >= 7 && <span>🔥 Streak King</span>}
      {quizzes >= 50 && <span>🧠 Quiz Warrior</span>}
      {score < 40 && streak >= 3 && <span>🎉 Comeback Champ</span>}
    </div>
  );
}

export default Badges;