
import React from "react";

function Notes() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Your UPSC Notes</h2>
      <textarea
        className="w-full h-64 p-4 border rounded shadow"
        placeholder="Type your notes here..."
      ></textarea>
    </div>
  );
}

export default Notes;