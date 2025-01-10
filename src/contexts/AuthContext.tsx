// src/context/AuthContext.tsx
import React, { createContext, useContext, useState, ReactNode } from "react";
import { User } from "firebase/auth";

// Define the type for AuthContext
export interface AuthContextType {
  user: User | null; // User object or null if not authenticated
  setUser: React.Dispatch<React.SetStateAction<User | null>>; // setUser function to update user state
  logout: () => void; // logout function
}

// Create AuthContext with default value
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// AuthProvider component to provide AuthContext
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null); // State for user

  const logout = () => {
    // Implement logout logic (e.g., signOut from Firebase)
    setUser(null); // Clear user on logout
  };

  return (
    <AuthContext.Provider value={{ user, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to access AuthContext
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
