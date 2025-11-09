import React, { createContext, useContext, useState, useEffect } from "react";
import { api } from "@/services/api";

interface User {
  id: string;
  email: string;
  name: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  login: (userData: User, token: string) => void; // Add token parameter
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const checkAuthStatus = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setUser(null);
        return;
      }

      try {
        const response = await api.get("/users/api/is-auth");
        setUser(response.data.user);
      } catch (error) {
        // If token is invalid, clear it
        localStorage.removeItem("token");
        setUser(null);
      }
    };
    checkAuthStatus();
  }, []);

  const login = (userData: User, token: string) => {
    setUser(userData);
    localStorage.setItem("token", token); // Store token
  };

  const logout = async () => {
    try {
      await api.post("/users/api/logout");
    } catch (error) {
      console.error("Logout error", error);
    } finally {
      setUser(null);
      localStorage.removeItem("token"); // Remove token
    }
  };

  const value: AuthContextType = {
    user,
    login,
    logout,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider.");
  }
  return context;
};
