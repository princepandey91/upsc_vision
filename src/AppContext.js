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
    setUserScores([...userScores, { name: userName, score }]);
  };

  return (
    <AppContext.Provider value={{ userName, setUserName, userScores, addUserScore }}>
      {children}
    </AppContext.Provider>
  );
};