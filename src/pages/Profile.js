import React, { useContext } from "react";
import { AppContext } from "../AppContext";

// Components
import Badges from "../components/Badges";        // 🏅 Motivational Badges
import StreakTracker from "../components/StreakTracker"; // 🔥 Streak Reminder
import ShareCard from "../components/ShareCard"; // 🏆 Shareable Leaderboard Card

export default function Profile() {
  const { userName, userScores, streak } = useContext(AppContext);

  const totalQuizzes = userScores.length;
  const lastScore = userScores[userScores.length - 1]?.score || 0;

  // ✅ Current user rank calculation
  const sortedScores = [...userScores].sort((a, b) => b.score - a.score);
  const myRank = sortedScores.findIndex(entry => entry.name === userName) + 1;

  return (
    <div className="p-6 bg-gray-50 rounded shadow-md max-w-2xl mx-auto">
      {/* 👤 User Info */}
      <h2 className="text-2xl font-bold text-indigo-700 mb-4">
        👤 {userName}'s Profile
      </h2>
      <p className="mb-2">📊 Total Quizzes Attempted: {totalQuizzes}</p>
      <p className="mb-2">🔥 Current Streak: {streak} days</p>

      {/* 🏅 Motivational Badges */}
      <Badges score={lastScore} streak={streak} quizzes={totalQuizzes} />

      {/* 🔥 Streak Tracker */}
      <StreakTracker streak={streak} />

      {/* 🏆 ShareCard → current rank share करने का option */}
      {myRank > 0 && (
        <div className="mt-6">
          <ShareCard rank={myRank} name={userName} score={lastScore} />
        </div>
      )}

      {/* 📝 Quiz History */}
      <h3 className="mt-6 font-semibold text-lg">📝 Quiz History</h3>
      <ul className="list-disc ml-6">
        {userScores.map((entry, index) => (
          <li key={index}>
            {entry.date} → Score: {entry.score}, Streak: {entry.streak} days
          </li>
        ))}
      </ul>

      {/* 📊 Link to Analytics Dashboard */}
      <div className="mt-6">
        <a
          href="/analytics"
          className="px-4 py-2 bg-indigo-600 text-white rounded shadow"
        >
          View Detailed Analytics
        </a>
      </div>
    </div>
  );
}