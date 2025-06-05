// src/context/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // Load user from localStorage on mount
  useEffect(() => {
    const userId = localStorage.getItem("user_id");
    const token = localStorage.getItem("token");
    if (userId && token) {
      setUser({ id: userId }); // Expand if needed with more user info
    }
  }, []);

  const login = (userData) => {
    setUser(userData);//don't set token here
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user_id");
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// Hook to use in components
export function useAuth() {
  return useContext(AuthContext);
}
