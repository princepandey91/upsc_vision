import React, { useState, useContext } from "react";
import { AppContext } from "../AppContext";

// Extra Components
import Badges from "../components/Badges";        // 🏅 Motivational Badges
import StreakTracker from "../components/StreakTracker"; // 🔥 Streak Reminder
import ShareCard from "../components/ShareCard"; // 🏆 Shareable Leaderboard Card

export default function Profile() {
  const { userName, setUserName, userScores } = useContext(AppContext);
  const [profilePic, setProfilePic] = useState(localStorage.getItem("profilePic") || null);
  const [editing, setEditing] = useState(false);
  const [newName, setNewName] = useState(userName);

  // ✅ Upload / Remove Profile Picture
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePic(reader.result);
        localStorage.setItem("profilePic", reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  const handleRemoveImage = () => {
    setProfilePic(null);
    localStorage.removeItem("profilePic");
  };

  // ✅ Edit Name
  const handleSaveName = () => {
    if (newName.trim()) {
      setUserName(newName);
      localStorage.setItem("userName", newName);
      setEditing(false);
    }
  };

  // 📊 Progress Snapshot
  const totalQuizzes = userScores.length;
  const streak = localStorage.getItem("streak") || 0;
  const lastScore = userScores[userScores.length - 1]?.score || 0;
  const averageScore =
    totalQuizzes > 0
      ? (userScores.reduce((acc, curr) => acc + curr.score, 0) / totalQuizzes).toFixed(2)
      : 0;

  // ✅ Current user rank calculation
  const sortedScores = [...userScores].sort((a, b) => b.score - a.score);
  const myRank = sortedScores.findIndex(entry => entry.name === userName) + 1;

  return (
    <div className="p-6 bg-gray-50 rounded shadow-md max-w-2xl mx-auto">
      {/* 👤 User Info */}
      <h2 className="text-2xl font-bold text-indigo-700 mb-4">
        👤 {userName || "Guest"}'s Profile
      </h2>

      {/* Profile Picture */}
      <div className="flex flex-col items-center mb-4">
        {profilePic ? (
          <>
            <img
              src={profilePic}
              alt="Profile"
              className="w-32 h-32 rounded-full object-cover mb-3 border-2 border-indigo-600"
            />
            <button
              onClick={handleRemoveImage}
              className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Remove Picture
            </button>
          </>
        ) : (
          <label className="cursor-pointer px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700">
            Upload Picture
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          </label>
        )}
      </div>

      {/* Edit Name */}
      <div className="text-center mb-4">
        {editing ? (
          <div className="flex flex-col items-center gap-2">
            <input
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              className="border px-2 py-1 rounded"
            />
            <button
              onClick={handleSaveName}
              className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
            >
              Save
            </button>
          </div>
        ) : (
          <>
            <p className="text-lg font-semibold">Name: {userName || "Guest"}</p>
            <button
              onClick={() => setEditing(true)}
              className="mt-2 px-3 py-1 bg-indigo-600 text-white rounded hover:bg-indigo-700"
            >
              Edit Profile
            </button>
          </>
        )}
      </div>

      {/* 📊 Progress Snapshot */}
      <div className="bg-white p-4 rounded shadow mb-4">
        <h3 className="text-lg font-bold text-indigo-600 mb-2">Progress Snapshot</h3>
        <p>Total Quizzes Attempted: {totalQuizzes}</p>
        <p>🔥 Current Streak: {streak} days</p>
        <p>Average Score: {averageScore}</p>
      </div>

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