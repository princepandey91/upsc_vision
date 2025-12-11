// AppContext.js
import React, { createContext, useState, useEffect } from "react";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [userName, setUserName] = useState("");
  const [userScores, setUserScores] = useState([]);

  // ⬇️ LocalStorage से data load करना
  useEffect(() => {
    const savedScores = JSON.parse(localStorage.getItem("scores")) || [];
    setUserScores(savedScores);
  }, []);

  // ⬇️ जब भी userScores बदले, LocalStorage में save करना
  useEffect(() => {
    localStorage.setItem("scores", JSON.stringify(userScores));
  }, [userScores]);

  const addUserScore = (score) => {
    const streak = localStorage.getItem("streak") || 0;
    const date = new Date().toLocaleDateString();

    setUserScores([
      ...userScores,
      { name: userName, score, streak, date }
    ]);
  };

  return (
    <AppContext.Provider
      value={{
        userName,
        setUserName,
        userScores,
        setUserScores,   // ✅ अब ये भी context में है
        addUserScore
      }}
    >
      {children}
    </AppContext.Provider>
  );
};