import React, { useContext } from "react";
import { AppContext } from "../AppContext";
import StreakTracker from "../components/StreakTracker"; 
import Badges from "../components/Badges";   // 🏅 Motivational Badges

export default function QuizResult({ questions, answers, startTime, endTime }) {
  const { userScores, setUserScores, userName, streak, updateStreak } = useContext(AppContext);

  const total = questions.length;
  const correct = answers.filter(a => a.isCorrect).length;
  const accuracy = Math.round((correct / total) * 100);
  const avgTime = Math.round((endTime - startTime) / 1000 / total); // seconds

  const topicStats = {};
  questions.forEach((q, i) => {
    const topic = q.topic;
    if (!topicStats[topic]) topicStats[topic] = { total: 0, correct: 0 };
    topicStats[topic].total++;
    if (answers[i].isCorrect) topicStats[topic].correct++;
  });

  // ✅ Save Result Handler
  const handleSaveResult = () => {
    updateStreak();
    const newEntry = {
      name: userName,
      score: correct,
      streak: streak,
      date: new Date().toLocaleDateString()
    };
    setUserScores([...userScores, newEntry]);
    alert("🎉 Result saved to Leaderboard!");
  };

  return (
    <div className="p-4 bg-gray-50 rounded shadow">
      <h2 className="text-xl font-bold text-indigo-700 mb-2">📊 Quiz Analytics</h2>
      <p>✅ Accuracy: {accuracy}%</p>
      <p>⏱️ Avg Time: {avgTime} sec/question</p>

      {/* 🏅 Motivational Badges */}
      <Badges score={correct} streak={streak} quizzes={userScores.length} />

      <h3 className="mt-4 font-semibold">📚 Topic-wise Performance</h3>
      <ul className="list-disc ml-6">
        {Object.entries(topicStats).map(([topic, stat]) => (
          <li key={topic}>
            {topic}: {stat.correct}/{stat.total} correct
          </li>
        ))}
      </ul>

      <button
        className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded"
        onClick={() => alert("Retake wrong answers")}
      >
        🔁 Retake Wrong Answers
      </button>

      {/* 🧠 Recommended Notes + PYQs */}
      <div className="mt-6 p-4 bg-white rounded border border-indigo-200">
        <h3 className="text-lg font-semibold text-indigo-700 mb-2">📚 Recommended Notes</h3>
        <a href="/notes" className="text-indigo-600 underline">Go to Notes</a>

        <h3 className="text-lg font-semibold text-indigo-700 mt-4 mb-2">📝 Related PYQs</h3>
        <a href="/pyq" className="text-indigo-600 underline">Check PYQs</a>
      </div>

      {/* 💾 Save Result Button */}
      <button
        className="mt-6 px-4 py-2 bg-green-600 text-white rounded"
        onClick={handleSaveResult}
      >
        💾 Save Result to Leaderboard
      </button>

      {/* 🔥 Streak Tracker */}
      <StreakTracker streak={streak} />  

       {/* 📊 View Detailed Analytics Button */}
      <div className="mt-4">
        <a
          href="/analytics"
          className="px-4 py-2 bg-indigo-600 text-white rounded shadow"
        >
          📊 View Detailed Analytics
        </a>
      </div>
      </div>
  );
}