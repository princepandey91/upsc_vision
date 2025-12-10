import React, { useContext } from "react";
import { AppContext } from "../AppContext";

function Leaderboard() {
  const { userScores } = useContext(AppContext);

  // Highest score पहले दिखाने के लिए sort
  const sortedScores = [...userScores].sort((a, b) => b.score - a.score);

  return (
    <div className="bg-white p-4 rounded shadow-md w-full max-w-xl mx-auto mt-4">
      <h2 className="text-2xl font-bold mb-4 text-center">🏆 Leaderboard</h2>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th className="border px-4 py-2">Rank</th>
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Score</th>
          </tr>
        </thead>
        <tbody>
          {sortedScores.length === 0 ? (
            <tr>
              <td colSpan="3" className="text-center py-4">
                No entries yet. Take a quiz to appear here!
              </td>
            </tr>
          ) : (
            sortedScores.map((item, index) => (
              <tr
                key={index}
                className={`transition duration-500 ease-in-out transform hover:scale-105
                  ${index === 0 ? "bg-yellow-100 font-bold" : ""}
                  ${index === 1 ? "bg-gray-100" : ""}
                  ${index === 2 ? "bg-orange-100" : ""}
                `}
              >
                <td className="border px-4 py-2 text-center">
                  {index === 0
                    ? "🥇"
                    : index === 1
                    ? "🥈"
                    : index === 2
                    ? "🥉"
                    : index + 1}
                </td>
                <td className="border px-4 py-2 flex items-center justify-center gap-2">
                  {item.name}
                  {index === 0 && (
                    <span className="animate-bounce text-yellow-600 text-xl">👑</span>
                  )}
                </td>
                <td className="border px-4 py-2">{item.score}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Leaderboard;