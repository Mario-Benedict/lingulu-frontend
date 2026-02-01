import { createContext, useEffect, useState, type ReactNode } from "react";
import { getToken, clearToken } from "@/utils/token";
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
  const hasToken = Boolean(getToken());

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(hasToken);

  useEffect(() => {
    if (!hasToken) return;

    getAuthenticatedUser()
      .then(() => setIsAuthenticated(true))
      .catch(() => clearToken())
      .finally(() => setLoading(false));
  }, [hasToken]);

  const logout = () => {
    clearToken();
    setIsAuthenticated(false);
    window.location.href = "/login";
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, loading, logout }}>
      {children}
    </AuthContext.Provider>
  );
};