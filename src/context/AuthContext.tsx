import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import type { AuthContextType } from "../types/auth";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const MOCK_USERNAME = "admin";
const MOCK_PASSWORD = "password";
const AUTH_STORAGE_KEY = "isAuthenticated";

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
    const storedAuth = localStorage.getItem(AUTH_STORAGE_KEY);
    return storedAuth === "true";
  });

  useEffect(() => {
    localStorage.setItem(AUTH_STORAGE_KEY, isLoggedIn.toString());
  }, [isLoggedIn]);
  const login = (username: string, password: string): boolean => {
    if (username === MOCK_USERNAME && password === MOCK_PASSWORD) {
      setIsLoggedIn(true);
      return true;
    }
    return false;
  };
  const logout = () => {
    setIsLoggedIn(false);
  };

  const value: AuthContextType = {
    isLoggedIn,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  return context;
}
