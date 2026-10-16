import { useState, useEffect, useRef } from "react";
import type { ReactNode } from "react";
import { authAPI } from "../lib/api";
import { AuthContext } from "./auth-context";
import type { User } from "./auth-context";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(() => localStorage.getItem("token"));
  const [isLoading, setIsLoading] = useState(() => Boolean(localStorage.getItem("token")));
  const initialToken = useRef(token);

  useEffect(() => {
    if (!initialToken.current) return;

    let isMounted = true;
    authAPI
      .me()
      .then((res) => {
        if (isMounted) setUser(res.data);
      })
      .catch(() => {
        if (!isMounted) return;
        localStorage.removeItem("token");
        setToken(null);
      })
      .finally(() => {
        if (isMounted) setIsLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const login = async (email: string, password: string) => {
    const res = await authAPI.login({ email, password });
    const newToken = res.data.access_token;
    localStorage.setItem("token", newToken);
    setToken(newToken);
    try {
      const meRes = await authAPI.me();
      setUser(meRes.data);
    } catch (error) {
      localStorage.removeItem("token");
      setToken(null);
      setUser(null);
      throw error;
    }
  };

  const register = async (name: string, email: string, password: string) => {
    await authAPI.register({ name, email, password });
    await login(email, password);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
  };

  return <AuthContext.Provider value={{ user, token, login, register, logout, isLoading }}>{children}</AuthContext.Provider>;
}
