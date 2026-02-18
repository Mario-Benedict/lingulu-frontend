import { createContext, useEffect, useState, type ReactNode } from "react";
import { getAuthenticatedUser, logoutUser } from "@/api/services";

type AuthContextType = {
  isAuthenticated: boolean;
  setIsAuthenticated: (value: boolean) => void;
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
        const isValid = response.data?.authenticated || false;
        setIsAuthenticated(isValid);
      } catch (err: any) {
        if (err?.response?.status === 401) {
          setIsAuthenticated(false);
        } else {
          console.error('Auth check error:', err);
        }
      } finally {
        setLoading(false);
      }
    };

    checkAuth();

    const handleLogoutEvent = () => {
      setIsAuthenticated(false);
    };

    window.addEventListener('user-logged-out', handleLogoutEvent);
    
    return () => {
      window.removeEventListener('user-logged-out', handleLogoutEvent);
    };
  }, []);

  const logout = async () => {
    try {
      await logoutUser();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setIsAuthenticated(false);
      // Dispatch event for other tabs
      window.dispatchEvent(new Event('user-logged-out'));
      window.location.href = "/login";
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, loading, logout }}>
      {children}
    </AuthContext.Provider>
  );
};