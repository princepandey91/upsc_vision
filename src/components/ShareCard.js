import React from "react";

function ShareCard({ rank, name, score }) {
  const shareText = `I am #${rank} on UPSC Vision with score ${score}! 🚀`;

  const handleShare = () => {
    navigator.clipboard.writeText(shareText);
    alert("Copied to clipboard! Share it on social media 🎉");
  };

  return (
    <div className="border p-4 rounded shadow-md">
      <h3>🏆 My Leaderboard Rank</h3>
      <p>{name} - Rank #{rank} - Score {score}</p>
      <button onClick={handleShare} className="bg-indigo-600 text-white px-3 py-1 rounded">
        Share
      </button>
    </div>
  );
}

export default ShareCard;