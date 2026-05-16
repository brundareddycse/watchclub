import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { api } from "./api";

const AuthCtx = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function check() {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          setUser(false);
          return;
        }

        const { data } = await api.get("/auth/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUser(data);
      } catch {
        localStorage.removeItem("token");
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

      localStorage.setItem("token", data.token);

      setUser(data.user);

      return true;
    } catch (err) {
      console.log(err);
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

      localStorage.setItem("token", data.token);

      setUser(data.user);

      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  }

  async function logout() {
    localStorage.removeItem("token");
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
