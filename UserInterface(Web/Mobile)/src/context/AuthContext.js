import React, { createContext, useState, useEffect } from "react";

/**
 * Auth context for managing current user state and authentication.
 */
export const AuthContext = createContext();

// PUBLIC_INTERFACE
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Example stub: replace with real authentication/token logic with backend API
  useEffect(() => {
    // Fetch user from backend or localStorage/session if implemented.
    // setUser({ id: "demo", name: "Demo User" });
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
