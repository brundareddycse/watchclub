import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../lib/auth";

function Auth({ mode }) {

  const nav = useNavigate();

  const { login, register } = useAuth();

  const [name, setName] = useState("");

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const isLogin = mode === "login";

  async function submit(e) {

    e.preventDefault();

    let ok = false;

    if (isLogin) {
      ok = await login(email, password);
    } else {
      ok = await register(name, email, password);
    }

    if (ok) {
      nav("/app");
    } else {
      alert("Authentication failed");
    }
  }

  return (
    <div className="min-h-screen bg-[#0a0a0b] flex items-center justify-center px-6">

      <form
        onSubmit={submit}
        className="w-full max-w-md rounded-[32px] border border-white/10 bg-white/[0.03] p-8"
      >

        <h1 className="text-white text-4xl mb-2">

          {isLogin ? "Welcome back" : "Create account"}

        </h1>

        <p className="text-white/50 mb-8">
          Enter your details below.
        </p>

        {!isLogin && (

          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            className="w-full px-4 py-4 rounded-2xl bg-white/5 border border-white/10 text-white mb-4"
          />

        )}

        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="w-full px-4 py-4 rounded-2xl bg-white/5 border border-white/10 text-white mb-4"
        />

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="w-full px-4 py-4 rounded-2xl bg-white/5 border border-white/10 text-white mb-6"
        />

        <button
          className="w-full py-4 rounded-2xl bg-white text-black font-medium"
        >
          {isLogin ? "Login" : "Create Account"}
        </button>

        <div className="text-white/40 text-sm mt-6 text-center">

          {isLogin ? (
            <>
              Don’t have an account?{" "}
              <Link to="/signup" className="text-white">
                Sign up
              </Link>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <Link to="/login" className="text-white">
                Login
              </Link>
            </>
          )}

        </div>

      </form>

    </div>
  );
}

export default Auth;
