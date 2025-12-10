// src/pages/Motivation.jsx
import { useState } from "react";

const QUOTES = [
  { text: "तुम अपनी मेहनत से अपनी किस्मत लिखते हो।", author: "— Unknown" },
  { text: "Consistency ही सफलता का असली राज़ है।", author: "— Mentor" },
  { text: "छोटे कदम रोज़, बड़े सपने सच करते हैं।", author: "— Unknown" },
  { text: "Focus एक superpower है—दैनिक अभ्यास करो।", author: "— Coach" },
  { text: "गलतियाँ सबक हैं, हार नहीं।", author: "— Unknown" },
];

export default function Motivation() {
  const [index, setIndex] = useState(0);
  const current = QUOTES[index];

  const nextQuote = () => setIndex((i) => (i + 1) % QUOTES.length);
  const prevQuote = () => setIndex((i) => (i - 1 + QUOTES.length) % QUOTES.length);
  const shuffleQuote = () => setIndex(() => Math.floor(Math.random() * QUOTES.length));
  const copyQuote = async () => {
    try {
      await navigator.clipboard.writeText(`${current.text} ${current.author}`);
      alert("Quote copied! Share it now.");
    } catch {
      alert("Copy failed. Try again.");
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold">Motivation</h2>

      <div className="bg-white rounded-xl shadow p-6 border border-gray-100">
        <p className="text-xl font-semibold leading-relaxed">{current.text}</p>
        <p className="text-gray-500 mt-2">{current.author}</p>

        <div className="mt-6 flex flex-wrap gap-3">
          <button onClick={prevQuote} className="px-4 py-2 rounded bg-gray-100 hover:bg-gray-200">
            Prev
          </button>
          <button onClick={nextQuote} className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700">
            Next
          </button>
          <button onClick={shuffleQuote} className="px-4 py-2 rounded bg-purple-600 text-white hover:bg-purple-700">
            Shuffle
          </button>
          <button onClick={copyQuote} className="px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700">
            Copy
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow p-6 border border-gray-100">
        <h3 className="text-lg font-semibold mb-3">Daily practice tip</h3>
        <ul className="list-disc pl-5 space-y-2 text-gray-700">
          <li><strong>Pomodoro:</strong> 25 मिनट पढ़ाई, 5 मिनट ब्रेक—4 cycles.</li>
          <li><strong>Revision first:</strong> सुबह 30 मिनट कल का revision करें।</li>
          <li><strong>Micro goals:</strong> रोज़ 3 छोटे targets set करें।</li>
        </ul>
      </div>
    </div>
  );
}