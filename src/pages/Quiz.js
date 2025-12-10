import React, { useState, useContext } from "react";
import { AppContext } from "../AppContext";
import Confetti from "react-confetti"; // ⬅️ Confetti import

function Quiz() {
  const { addUserScore, userName } = useContext(AppContext);
  const [score, setScore] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const questions = [
    { id: 1, question: "Who was the first President of India?", options: ["Jawaharlal Nehru", "Rajendra Prasad", "Mahatma Gandhi", "Sardar Patel"], answer: "Rajendra Prasad" },
    { id: 2, question: "In which year did India gain independence?", options: ["1942", "1947", "1950", "1930"], answer: "1947" },
  ];

  const handleSubmit = () => {
    setSubmitted(true);
    addUserScore(score); // Context में नाम + score save होगा
  };

  return (
    <div className="bg-white p-4 rounded shadow-md w-full max-w-xl mx-auto mt-4">
      <h2 className="text-2xl font-bold mb-4">UPSC Quiz</h2>

      {questions.map((q) => (
        <div key={q.id} className="mb-4">
          <p className="font-semibold">{q.question}</p>
          {q.options.map((opt) => (
            <label key={opt} className="block">
              <input
                type="radio"
                name={`question-${q.id}`}
                value={opt}
                onChange={() => {
                  if (opt === q.answer) {
                    setScore((prev) => prev + 1);
                  }
                }}
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

      {submitted && (
        <div className="mt-6 p-4 bg-green-100 rounded-lg shadow-md animate-bounce relative">
          {/* 🎉 Confetti Animation */}
          <Confetti numberOfPieces={200} recycle={false} />

          <h3 className="text-xl font-bold text-green-700">
            🎉 Congratulations {userName}!
          </h3>
          <p className="text-lg mt-2">
            You scored <span className="font-bold">{score}</span> points!
          </p>
          <p className="mt-1 text-sm text-gray-600">
            Keep it up, you're climbing the leaderboard 🚀
          </p>
        </div>
      )}
    </div>
  );
}

export default Quiz;