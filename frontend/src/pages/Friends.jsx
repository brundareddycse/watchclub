import { useEffect, useState } from "react";

import AppLayout from "../components/AppLayout";

import { api, formatApiError } from "../lib/api";

export default function Friends() {
  const [friends, setFriends] = useState([]);
  const [email, setEmail] = useState("");
  const [err, setErr] = useState("");

  const load = async () => {
    try {
      const { data } = await api.get("/friends");
      setFriends(data.friends || []);
    } catch (e) {
      setErr(formatApiError(e));
    }
  };

  useEffect(() => {
    load();
  }, []);

  const add = async (e) => {
    e.preventDefault();

    try {
      await api.post("/friends", { email });
      setEmail("");
      load();
    } catch (e) {
      setErr(formatApiError(e));
    }
  };

  return (
    <AppLayout>
      <h1 className="text-white text-4xl font-display mb-2">
        Your circle
      </h1>

      <p className="text-white/50 mb-6">
        Add friends by email.
      </p>

      <form
        onSubmit={add}
        className="flex gap-2 mb-8"
      >
        <input
          type="email"
          placeholder="friend@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="flex-1 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white"
        />

        <button className="px-5 py-3 rounded-xl bg-white text-black font-medium">
          Add
        </button>
      </form>

      {err && (
        <div className="text-rose-300 mb-4">
          {err}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {friends.map((f) => (
          <div
            key={f.id}
            className="rounded-2xl p-4 bg-white/[0.03] border border-white/10"
          >
            <div className="text-white font-medium">
              {f.name}
            </div>

            <div className="text-white/40 text-sm">
              {f.email}
            </div>
          </div>
        ))}
      </div>
    </AppLayout>
  );
}
