import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
        <h1 className="text-xl font-bold text-indigo-700">UPSC Vision</h1>
        <ul className="flex gap-6 text-gray-700 font-medium">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/notes">Notes</Link></li>
          <li><Link to="/pyq">PYQ</Link></li>
          <li> <Link to="/motivation">Motivation</Link></li>  
          <li><Link to="/quiz">Quiz</Link></li>
          <li><Link to="/leaderboard">Leaderboard</Link></li>
          <li><Link to="/login">Login</Link></li> {/* ✅ Login link added */}
          <Link to="/profile">Profile</Link>
          <Link to="/analytics">Analytics</Link>
          <Link to="/quizresult">Quiz Result</Link>
        </ul>
      </div>
    </nav>
  );
}