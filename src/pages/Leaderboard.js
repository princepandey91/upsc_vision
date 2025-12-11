import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../AppContext";
import "./Leaderboard.css";

  // ShareCard और StreakTracker import किए गए
import ShareCard from "../components/ShareCard";   // Share करने का card
import StreakTracker from "../components/StreakTracker"; // Streak दिखाने वाला tracker

function Leaderboard() {
  const { userScores, setUserScores, userName } = useContext(AppContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [visibleCount, setVisibleCount] = useState(10);
  const [filter, setFilter] = useState("all"); // ✅ Filter state

  // ✅ LocalStorage Persistence → leaderboard data save करता है
  useEffect(() => {
    localStorage.setItem("leaderboard", JSON.stringify(userScores));
  }, [userScores]);

  // ✅ LocalStorage से data load करता है
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("leaderboard") || "[]");
    if (saved.length > 0) {
      setUserScores(saved);
    }
  }, [setUserScores]);

  // ✅ Sort by score → highest score ऊपर दिखेगा
  const sortedScores = [...userScores].sort((a, b) => b.score - a.score);

  // ✅ Filters (today/week/streak/all)
  const today = new Date().toLocaleDateString();
  const startOfWeek = new Date();
  startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay()); // Sunday

  const filteredByDate = sortedScores.filter((item) => {
    if (filter === "today") {
      return item.date === today;
    } else if (filter === "week") {
      const itemDate = new Date(item.date);
      return itemDate >= startOfWeek;
    } else if (filter === "streak") {
      return item.streak >= 5;
    }
    return true; // all
  });

  // ✅ Search filter → name से search करता है
  const filteredScores = filteredByDate.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // ✅ Infinite Scroll → नीचे scroll करने पर और entries load होती हैं
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 50
      ) {
        setVisibleCount((prev) => prev + 10);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const currentScores = filteredScores.slice(0, visibleCount);

  return (
    <div className="bg-white p-4 rounded shadow-md w-full max-w-3xl mx-auto mt-4 overflow-x-auto">
      <h2 className="text-2xl font-bold mb-4 text-center">🏆 Leaderboard</h2>

      {/* 🔍 Search + Filter Controls */}
      <div className="mb-4 flex flex-col md:flex-row justify-between gap-2">
        <input
          type="text"
          placeholder="Search by name..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setVisibleCount(10);
          }}
          className="border px-3 py-2 rounded md:w-1/2"
        />

        <select
          value={filter}
          onChange={(e) => {
            setFilter(e.target.value);
            setVisibleCount(10);
          }}
          className="border px-3 py-2 rounded md:w-1/3"
        >
          <option value="all">🌍 All Time</option>
          <option value="today">📅 Today</option>
          <option value="week">📆 This Week</option>
          <option value="streak">🔥 Streak ≥ 5</option>
        </select>
      </div>

      {/* Leaderboard Table */}
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th className="border px-4 py-2">Rank</th>
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Score</th>
            <th className="border px-4 py-2">Streak</th>
            <th className="border px-4 py-2">Date</th>
          </tr>
        </thead>
        <tbody>
          {currentScores.length === 0 ? (
            <tr>
              <td colSpan="5" className="text-center py-4">
                No matching entries found.
              </td>
            </tr>
          ) : (
            currentScores.map((item, index) => {
              const globalRank = sortedScores.indexOf(item) + 1;
              const isCurrentUser = item.name === userName;

              return (
                <React.Fragment key={globalRank}>
                  <tr
                    className={`transition duration-300 hover:bg-indigo-50
                      ${globalRank === 1 ? "bg-yellow-100 font-bold" : ""}
                      ${globalRank === 2 ? "bg-gray-100" : ""}
                      ${globalRank === 3 ? "bg-orange-100" : ""}
                      ${isCurrentUser ? "bg-green-200 font-bold animate-pulse" : ""}
                    `}
                  >
                    <td className="border px-4 py-2 text-center">
                      {globalRank === 1
                        ? "🥇"
                        : globalRank === 2
                        ? "🥈"
                        : globalRank === 3
                        ? "🥉"
                        : globalRank}
                    </td>
                    <td className="border px-4 py-2 flex items-center justify-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-indigo-200 flex items-center justify-center">
                        {item.name[0]}
                      </div>
                      {item.name}
                      {globalRank === 1 && (
                        <span className="animate-bounce text-yellow-600 text-xl">👑</span>
                      )}
                      {item.streak >= 5 && <span className="text-red-500">🔥</span>}
                    </td>
                    <td className="border px-4 py-2 text-center">{item.score}</td>
                    <td className="border px-4 py-2 text-center">{item.streak || 0} days</td>
                    <td className="border px-4 py-2 text-center">{item.date || "-"}</td>
                  </tr>

                  {/* 🆕 Current user की row के नीचे extra row */}
                  {isCurrentUser && (
                    <tr>
                      <td colSpan="5" className="p-4">
                        {/* ShareCard → rank share करने का card */}
                        <ShareCard rank={globalRank} name={item.name} score={item.score} />

                        {/* StreakTracker → streak count दिखाने वाला tracker */}
                        <StreakTracker streak={item.streak} />
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              );
            })
          )}
        </tbody>
      </table>

      {visibleCount < filteredScores.length && (
        <p className="text-center mt-4 text-gray-500">Loading more...</p>
      )}
    </div>
  );
}

export default Leaderboard;