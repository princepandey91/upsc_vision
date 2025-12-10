
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AppProvider } from './AppContext';
import Navbar from "./components/Navbar";
import Notes from "./pages/Notes";
import PYQ from "./pages/PYQ";
import Motivation from "./pages/Motivation";
import Quiz from "./pages/Quiz";
import Leaderboard from "./pages/Leaderboard";
import Login from "./pages/Login";  // ✅ Login page import करो


function App() {
  return (
    <AppProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <main className="max-w-6xl mx-auto px-4 py-6">
            <Routes>
               <Route path="/" element={<h2 className="text-2xl font-bold">Welcome to UPSC Vision</h2>} />
               <Route path="/notes" element={<Notes />} />
               <Route path="/pyq" element={<PYQ />} />
               <Route path="/motivation" element={<Motivation />} />
               <Route path="/quiz" element={<Quiz />} />
               <Route path="/leaderboard" element={<Leaderboard />} />
               <Route path="/login" element={<Login />} />
            </Routes>
          </main>
        </div>
      </Router>
    </AppProvider>
  );
}

export default App;