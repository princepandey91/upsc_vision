import React, { useState, useContext, useEffect } from "react";
import { AppContext } from "../AppContext";
import Confetti from "react-confetti";

function Quiz() {
  const { addUserScore, userName, setUserName } = useContext(AppContext);

  // States
  const [score, setScore] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [started, setStarted] = useState(false);
  const [tempName, setTempName] = useState("");
  const [wrongAnswers, setWrongAnswers] = useState([]);
  const [timeTaken, setTimeTaken] = useState(0);

  // Questions
  const questions = [
    {
      id: 1,
      question: "Who was the first President of India?",
      options: ["Jawaharlal Nehru", "Rajendra Prasad", "Mahatma Gandhi", "Sardar Patel"],
      answer: "Rajendra Prasad"
    },
    {
      id: 2,
      question: "In which year did India gain independence?",
      options: ["1942", "1947", "1950", "1930"],
      answer: "1947"
    },
  ];

  // ✅ Handle Answer Selection
  const handleAnswer = (opt, q) => {
    if (opt === q.answer) {
      setScore((prev) => prev + 1);
    } else {
      setWrongAnswers((prev) => [...prev, q.question]);
    }
  };

  // ✅ Daily Streak Tracker
  const updateStreak = () => {
    const today = new Date().toDateString();
    const lastPlayed = localStorage.getItem("lastPlayed");
    let streak = parseInt(localStorage.getItem("streak") || "0", 10);

    if (lastPlayed !== today) {
      streak += 1;
      localStorage.setItem("streak", streak);
      localStorage.setItem("lastPlayed", today);
    }
  };

  // ✅ Submit Quiz
  const handleSubmit = () => {
    setSubmitted(true);
    addUserScore(score);
    updateStreak();
  };

  // ✅ Reset Quiz
  const handleResetQuiz = () => {
    setScore(0);
    setSubmitted(false);
    setStarted(false);
    setWrongAnswers([]);
    setTimeTaken(0);
  };

  // ✅ Start Quiz
  const handleStartQuiz = (e) => {
    e.preventDefault();
    setUserName(tempName);
    setStarted(true);
  };

  // ✅ Timer Logic
  useEffect(() => {
    let timer;
    if (started && !submitted) {
      timer = setInterval(() => {
        setTimeTaken((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [started, submitted]);

  return (
    <div className="bg-white p-4 rounded shadow-md w-full max-w-xl mx-auto mt-4">
      <h2 className="text-2xl font-bold mb-4">UPSC Quiz</h2>

      {/* Step 1: Form for Name */}
      {!started && (
        <form onSubmit={handleStartQuiz} className="mb-4">
          <label className="block mb-2 font-semibold">Enter your name:</label>
          <input
            type="text"
            value={tempName}
            onChange={(e) => setTempName(e.target.value)}
            className="border px-3 py-2 rounded w-full"
            required
          />
          <button
            type="submit"
            className="mt-3 px-4 py-2 bg-indigo-600 text-white rounded"
          >
            Start Quiz
          </button>
        </form>
      )}

      {/* Step 2: Quiz Questions */}
      {started && !submitted && (
        <>
          <p className="mb-4 text-sm text-gray-600">⏱️ Time: {timeTaken} sec</p>
          {questions.map((q) => (
            <div key={q.id} className="mb-4">
              <p className="font-semibold">{q.question}</p>
              {q.options.map((opt) => (
                <label key={opt} className="block">
                  <input
                    type="radio"
                    name={`question-${q.id}`}
                    value={opt}
                    onChange={() => handleAnswer(opt, q)}
                  />
                  {opt}
                </label>
              ))}
            </div>
          ))}

          <button
            onClick={handleSubmit}
            className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded"
          >
            Submit Quiz
          </button>
        </>
      )}

      {/* Step 3: Result with Confetti */}
      {submitted && (
        <div className="mt-6 p-4 bg-green-100 rounded-lg shadow-md animate-bounce relative">
          <Confetti numberOfPieces={200} recycle={false} />
          <h3 className="text-xl font-bold text-green-700">
            🎉 Congratulations {userName}!
          </h3>
          <p className="text-lg mt-2">
            You scored <span className="font-bold">{score}</span> points!
          </p>
          <p className="mt-2 text-indigo-700 font-semibold">
            ⏱️ You took {timeTaken} seconds to finish the quiz.
          </p>

          {/* Show Wrong Answers */}
          {wrongAnswers.length > 0 && (
            <div className="mt-4">
              <h4 className="font-semibold text-red-600">❌ Revise these questions:</h4>
              <ul className="list-disc ml-6">
                {wrongAnswers.map((q, i) => (
                  <li key={i}>{q}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Show Streak */}
          <p className="mt-2 text-indigo-700 font-semibold">
            🔥 Your current streak: {localStorage.getItem("streak")} days
          </p>

          <p className="mt-1 text-sm text-gray-600">
            Keep it up, you're climbing the leaderboard 🚀
          </p>

          {/* Reset Button */}
          <button
            onClick={handleResetQuiz}
            className="mt-4 px-4 py-2 bg-gray-700 text-white rounded"
          >
            🔄 Try Again
          </button>
        </div>
      )}
    </div>
  );
}

export default Quiz;