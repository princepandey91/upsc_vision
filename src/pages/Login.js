import React, { useState, useContext } from "react";
import { AppContext } from "../AppContext";

function Login() {
  const { setUserName } = useContext(AppContext);
  const [name, setName] = useState("");

  const handleLogin = () => {
    setUserName(name);
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-2">Login</h2>
      <input
        type="text"
        placeholder="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border px-2 py-1"
      />
      <button
        onClick={handleLogin}
        className="ml-2 px-4 py-2 bg-indigo-600 text-white rounded"
      >
       login
      </button>
    </div>
  );
}

export default Login;