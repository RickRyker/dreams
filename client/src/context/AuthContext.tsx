// src/context/AuthContext.tsx
import { createContext, useContext, useState, useEffect } from "react";
import { AuthClient } from "../api/authClient";
import { API_BASE_URL } from "../config/api";

const authClient = new AuthClient({
  baseUrl: API_BASE_URL,
  getToken: () => localStorage.getItem("accessToken"),
});

interface AuthContextValue {
  isAuthenticated: boolean;
  loading: boolean;
  login: (email: string, password: string, totp?: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setAuth] = useState(false);

  useEffect(() => {
    const restore = () => {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const claims = authClient.getTokenClaims(token);
        localStorage.setItem("accountId", claims.accountId);
        setAuth(true);
      } catch {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("accountId");
      }

      setLoading(false);
    };

    restore();
  }, []);

  const login = async (email: string, password: string, totp?: string) => {
    const res = await authClient.login({ email, password, totp });
    localStorage.setItem("accessToken", res.accessToken);
    localStorage.setItem("accountId", res.accountId);
    setAuth(true);
  };

  const logout = async () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("accountId");
    setAuth(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components -- colocated hook for the provider above, standard context pattern
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be inside AuthProvider");
  return ctx;
}
