import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { api } from "./api";

const AuthCtx = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(false);

  useEffect(() => {
    async function check() {
      try {
        const { data } = await api.get("/auth/me");
        setUser(data);
      } catch {
        setUser(false);
      }
    }

    check();
  }, []);

  async function login(email, password) {
    try {
      const { data } = await api.post("/auth/login", {
        email,
        password,
      });

      setUser(data);
      return true;
    } catch {
      return false;
    }
  }

  async function register(name, email, password) {
    try {
      const { data } = await api.post("/auth/register", {
        name,
        email,
        password,
      });

      setUser(data);
      return true;
    } catch {
      return false;
    }
  }

  async function logout() {
    try {
      await api.post("/auth/logout");
    } catch {}

    setUser(false);
  }

  return (
    <AuthCtx.Provider
      value={{
        user,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthCtx.Provider>
  );
}

export function useAuth() {
  return useContext(AuthCtx);
}
