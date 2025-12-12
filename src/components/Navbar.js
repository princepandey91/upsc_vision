import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { AppContext } from "../AppContext";

export default function Navbar() {
  const { userName, setUserName } = useContext(AppContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [profilePic, setProfilePic] = useState(localStorage.getItem("profilePic") || null);

  const isQuizPage = location.pathname === "/quiz"; // ✅ Quiz page check

  // Auto-load username from localStorage
  useEffect(() => {
    const savedName = localStorage.getItem("userName");
    if (savedName) {
      setUserName(savedName);
    }
  }, [setUserName]);

  const handleLogout = () => {
    setUserName(""); // clear context
    localStorage.removeItem("userName");
    localStorage.removeItem("profilePic");
    alert("You have been logged out!");
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
        <h1 className="text-xl font-bold text-indigo-700">UPSC Vision</h1>

        <ul className="flex gap-6 text-gray-700 font-medium items-center">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/notes">Notes</Link></li>
          <li><Link to="/pyq">PYQ</Link></li>
          <li><Link to="/motivation">Motivation</Link></li>
          <li><Link to="/quiz">Quiz</Link></li>
          <li><Link to="/leaderboard">Leaderboard</Link></li>
          {!userName && <li><Link to="/login">Login</Link></li>}
          <li><Link to="/profile">Profile</Link></li>
          <li><Link to="/analytics">Analytics</Link></li>

          {/* ✅ Hide avatar + welcome + logout on quiz page */}
          {!isQuizPage && userName && (
            <li className="flex items-center gap-3">
              {profilePic && (
                <Link to="/profile">
                  <img
                    src={profilePic}
                    alt="avatar"
                    className="w-8 h-8 rounded-full border-2 border-indigo-600 object-cover cursor-pointer"
                  />
                </Link>
              )}
              <span className="font-semibold">Welcome, {userName} 👋</span>
              <button
                onClick={handleLogout}
                className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Logout
              </button>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}