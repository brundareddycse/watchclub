import { useEffect, useState } from "react";

import AppLayout from "../components/AppLayout";

import { api } from "../lib/api";

export default function Recommendations() {

  const [recommendations, setRecommendations] = useState([]);

  const [title, setTitle] = useState("");
  const [note, setNote] = useState("");


  async function load() {

    try {

      const { data } = await api.get("/recommendations");

      setRecommendations(data.recommendations || []);

    } catch (err) {
      console.log(err);
    }
  }


  useEffect(() => {
    load();
  }, []);


  async function addRecommendation(e) {

    e.preventDefault();

    const recommendation = {
      title,
      note,
    };

    await api.post(
      "/recommendations",
      recommendation
    );

    setTitle("");
    setNote("");

    load();
  }


  return (
    <AppLayout>

      <h1 className="text-white text-4xl font-display mb-2">
        Recommendations
      </h1>

      <p className="text-white/50 mb-8">
        Share movies with your circle.
      </p>


      <form
        onSubmit={addRecommendation}
        className="flex flex-col gap-4 mb-10"
      >

        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Movie title"
          className="px-4 py-3 rounded-2xl bg-white/5 border border-white/10 text-white"
        />

        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Why should they watch it?"
          className="px-4 py-3 rounded-2xl bg-white/5 border border-white/10 text-white min-h-[120px]"
        />

        <button
          className="px-5 py-3 rounded-2xl bg-white text-black font-medium"
        >
          Send Recommendation
        </button>

      </form>


      {recommendations.length === 0 ? (

        <div className="text-white/40">
          No recommendations yet.
        </div>

      ) : (

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">

          {recommendations.map((r, i) => (

            <div
              key={i}
              className="rounded-3xl border border-white/10 bg-white/[0.03] p-6"
            >

              <div className="text-white text-xl font-medium">
                {r.title}
              </div>

              <div className="text-white/40 mt-3 text-sm leading-6">
                {r.note}
              </div>

            </div>

          ))}

        </div>

      )}

    </AppLayout>
  );
}
