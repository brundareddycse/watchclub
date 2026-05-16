import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { api, formatApiError } from "./api";

const AuthCtx = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

  const refresh = useCallback(async () => {
    try {
      const { data } = await api.get("/auth/me");
      setUser(data);
    } catch {
      setUser(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const login = async (email, password) => {
    setError("");

    try {
      const { data } = await api.post("/auth/login", {
        email,
        password,
      });

      setUser(data);
      return true;
    } catch (e) {
      setError(formatApiError(e));
      return false;
    }
  };

  const register = async (name, email, password) => {
    setError("");

    try {
      const { data } = await api.post("/auth/register", {
        name,
        email,
        password,
      });

      setUser(data);
      return true;
    } catch (e) {
      setError(formatApiError(e));
      return false;
    }
  };

  const logout = async () => {
    try {
      await api.post("/auth/logout");
    } catch {}

    setUser(false);
  };

  return (
    <AuthCtx.Provider
      value={{
        user,
        error,
        setError,
        login,
        register,
        logout,
        refresh,
      }}
    >
      {children}
    </AuthCtx.Provider>
  );
}

export function useAuth() {
  return useContext(AuthCtx);
}
