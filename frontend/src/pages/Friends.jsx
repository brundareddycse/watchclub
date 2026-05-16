import { useEffect, useState } from "react";

import AppLayout from "../components/AppLayout";

import { api } from "../lib/api";

export default function Friends() {

  const [friends, setFriends] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");


  async function load() {

    try {

      const { data } = await api.get("/friends");

      setFriends(data.friends || []);

    } catch (err) {
      console.log(err);
    }
  }


  useEffect(() => {
    load();
  }, []);


  async function addFriend(e) {

    e.preventDefault();

    const friend = {
      name,
      email,
    };

    await api.post("/friends", friend);

    setName("");
    setEmail("");

    load();
  }


  return (
    <AppLayout>

      <h1 className="text-white text-4xl font-display mb-2">
        Friends
      </h1>

      <p className="text-white/50 mb-8">
        Your watch circle.
      </p>


      <form
        onSubmit={addFriend}
        className="flex flex-col md:flex-row gap-4 mb-10"
      >

        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Friend name"
          className="px-4 py-3 rounded-2xl bg-white/5 border border-white/10 text-white"
        />

        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Friend email"
          className="px-4 py-3 rounded-2xl bg-white/5 border border-white/10 text-white"
        />

        <button
          className="px-5 py-3 rounded-2xl bg-white text-black font-medium"
        >
          Add Friend
        </button>

      </form>


      {friends.length === 0 ? (

        <div className="text-white/40">
          No friends yet.
        </div>

      ) : (

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">

          {friends.map((f, i) => (

            <div
              key={i}
              className="rounded-3xl border border-white/10 bg-white/[0.03] p-6"
            >

              <div className="text-white text-xl font-medium">
                {f.name}
              </div>

              <div className="text-white/40 mt-2 text-sm">
                {f.email}
              </div>

            </div>

          ))}

        </div>

      )}

    </AppLayout>
  );
}
