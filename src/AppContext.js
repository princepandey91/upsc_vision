import React, { createContext, useState, useEffect } from "react";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [userName, setUserName] = useState("");
  const [userScores, setUserScores] = useState([]);

  // ⬇️ LocalStorage से data load करना (scores + username)
  useEffect(() => {
    const savedScores = JSON.parse(localStorage.getItem("scores")) || [];
    setUserScores(savedScores);

    const savedName = localStorage.getItem("userName");
    if (savedName) setUserName(savedName);
  }, []);

  // ⬇️ जब भी userScores बदले, LocalStorage में save करना
  useEffect(() => {
    localStorage.setItem("scores", JSON.stringify(userScores));
  }, [userScores]);

  // ⬇️ नया score add करना (name + score + streak + date)
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
        setUserScores,   // ✅ flexibility
        addUserScore
      }}
    >
      {children}
    </AppContext.Provider>
  );
};