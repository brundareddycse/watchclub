import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const AuthCtx = createContext(null);

export function AuthProvider({ children }) {

  const [user, setUser] = useState(null);


  useEffect(() => {

    const saved = localStorage.getItem("watchclub-user");

    if (saved) {
      setUser(JSON.parse(saved));
    } else {
      setUser(false);
    }

  }, []);


  async function login(email, password) {

    const user = {
      id: 1,
      name: "Watchclub User",
      email,
    };

    localStorage.setItem(
      "watchclub-user",
      JSON.stringify(user)
    );

    setUser(user);

    return true;
  }


  async function register(name, email, password) {

    const user = {
      id: 1,
      name,
      email,
    };

    localStorage.setItem(
      "watchclub-user",
      JSON.stringify(user)
    );

    setUser(user);

    return true;
  }


  async function logout() {

    localStorage.removeItem("watchclub-user");

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
