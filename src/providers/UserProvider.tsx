import React, { useState } from "react";
import UserContext from "../context/UserContext";

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [username, setUsername] = useState<string | null>(
    localStorage.getItem("username") || null
  );

  const [userId, setUserIdState] = useState<number | null>(
    localStorage.getItem("userId")
      ? Number(localStorage.getItem("userId"))
      : null
  );

  const updateUsername = (name: string | null) => {
    if (name) {
      localStorage.setItem("username", name);
    } else {
      localStorage.removeItem("username");
    }
    setUsername(name);
  };

  const updateId = (userId: number | null) => {
    if (userId !== null) {
      localStorage.setItem("userId", userId.toString());
    } else {
      localStorage.removeItem("userId");
    }
    setUserIdState(userId);
  };

  return (
    <UserContext.Provider
      value={{
        username,
        setUsername: updateUsername,
        userId,
        setUserId: updateId,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
