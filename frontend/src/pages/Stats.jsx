import { useEffect, useState } from "react";

import AppLayout from "../components/AppLayout";

import { api } from "../lib/api";

export default function Stats() {

  const [stats, setStats] = useState({
    totalMovies: 0,
    recommendations: 0,
    friends: 0,
  });


  useEffect(() => {

    async function load() {

      try {

        const { data } = await api.get("/stats");

        setStats(data);

      } catch (err) {
        console.log(err);
      }
    }

    load();

  }, []);


  return (
    <AppLayout>

      <h1 className="text-white text-4xl font-display mb-2">
        Stats
      </h1>

      <p className="text-white/50 mb-8">
        Your movie universe.
      </p>


      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

        <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-8">

          <div className="text-white/40 text-sm">
            Movies
          </div>

          <div className="text-white text-5xl font-bold mt-3">
            {stats.totalMovies}
          </div>

        </div>


        <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-8">

          <div className="text-white/40 text-sm">
            Recommendations
          </div>

          <div className="text-white text-5xl font-bold mt-3">
            {stats.recommendations}
          </div>

        </div>


        <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-8">

          <div className="text-white/40 text-sm">
            Friends
          </div>

          <div className="text-white text-5xl font-bold mt-3">
            {stats.friends}
          </div>

        </div>

      </div>

    </AppLayout>
  );
}
