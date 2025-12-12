import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AppProvider } from "./AppContext";

// Components
import Navbar from "./components/Navbar";

// Pages
import Notes from "./pages/Notes";
import PYQ from "./pages/PYQ";
import Motivation from "./pages/Motivation";
import Quiz from "./pages/Quiz";
// import QuizResult from "./components/QuizResult"; // optional
import QuizAnalytics from "./pages/QuizAnalytics";
import Leaderboard from "./pages/Leaderboard";
import Login from "./pages/Login";
import Profile from "./pages/Profile";

// Dummy Home Page
function Home() {
  return (
    <div className="p-6 text-center">
      <h2 className="text-2xl font-bold text-indigo-700">Welcome to UPSC Vision 🚀</h2>
      <p className="mt-2 text-gray-600">
        Prepare smarter with quizzes, notes, motivation, and analytics.
      </p>
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <main className="max-w-6xl mx-auto px-4 py-6">
            <Routes>
              {/* Home */}
              <Route path="/" element={<Home />} />

              {/* Study Pages */}
              <Route path="/notes" element={<Notes />} />
              <Route path="/pyq" element={<PYQ />} />
              <Route path="/motivation" element={<Motivation />} />
              <Route path="/quiz" element={<Quiz />} />
              {/* <Route path="/quizresult" element={<QuizResult />} /> */}

              {/* Leaderboard + Analytics */}
              <Route path="/leaderboard" element={<Leaderboard />} />
              <Route path="/analytics" element={<QuizAnalytics />} />

              {/* User Management */}
              <Route path="/login" element={<Login />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
          </main>
        </div>
      </Router>
    </AppProvider>
  );
}