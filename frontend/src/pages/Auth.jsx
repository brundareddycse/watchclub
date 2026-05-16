import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GRADIENTS } from "../lib/api";
import { useAuth } from "../lib/auth";

export default function Auth({ mode = "login" }) {
  const nav = useNavigate();

  const { login, register, error } = useAuth();

  const [f, setF] = useState({
    name: "",
    email: "",
    password: "",
  });

  const submit = async (e) => {
    e.preventDefault();

    let ok = false;

    if (mode === "signup") {
      ok = await register(f.name, f.email, f.password);
    } else {
      ok = await login(f.email, f.password);
    }

    if (ok) nav("/app");
  };

  return (
    <div className="min-h-screen bg-[#0a0a0b] flex items-center justify-center p-6">
      <form
        onSubmit={submit}
        className="w-full max-w-md rounded-[32px] p-8"
        style={{
          border: "6px solid transparent",
          background: `linear-gradient(#16161a,#16161a) padding-box, ${GRADIENTS.purple} border-box`,
        }}
      >
        <h1 className="text-white text-3xl font-display mb-2">
          {mode === "signup" ? "Create account" : "Welcome back"}
        </h1>

        <p className="text-white/50 text-sm mb-6">
          {mode === "signup"
            ? "Make your shelf."
            : "Pick up where you paused."}
        </p>

        {mode === "signup" && (
          <input
            placeholder="Name"
            value={f.name}
            onChange={(e) => setF({ ...f, name: e.target.value })}
            className="w-full mb-3 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white"
          />
        )}

        <input
          type="email"
          placeholder="Email"
          value={f.email}
          onChange={(e) => setF({ ...f, email: e.target.value })}
          className="w-full mb-3 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white"
        />

        <input
          type="password"
          placeholder="Password"
          value={f.password}
          onChange={(e) => setF({ ...f, password: e.target.value })}
          className="w-full mb-4 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white"
        />

        {error && (
          <div className="text-rose-300 text-sm mb-4">
            {error}
          </div>
        )}

        <button className="w-full py-3 rounded-xl bg-white text-black font-medium">
          {mode === "signup" ? "Create account" : "Login"}
        </button>
      </form>
    </div>
  );
}
