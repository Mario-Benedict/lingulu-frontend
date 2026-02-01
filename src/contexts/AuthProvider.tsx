import { createContext, useEffect, useState, type ReactNode } from "react";
import { api } from "@/api/axios/index";
import { getAuthenticatedUser } from "@/api/services/user";

type AuthContextType = {
  isAuthenticated: boolean;
  loading: boolean;
  logout: () => void;
};

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext<AuthContextType>(null!);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await getAuthenticatedUser();
        setIsAuthenticated(response);
      } catch (e) {
        console.log(e);
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  const logout = async () => {
    try {
      await api.post("/api/account/logout"); 
    } finally {
      setIsAuthenticated(false);
      window.location.href = "/login";
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, loading, logout }}>
      {children}
    </AuthContext.Provider>
  );
};