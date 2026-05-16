import { useEffect, useState } from "react";

import AppLayout from "../components/AppLayout";

import { api } from "../lib/api";

export default function Library() {

  const [titles, setTitles] = useState([]);

  useEffect(() => {

   async function addDemoMovie() {

  const alreadyExists = titles.find(
    (m) => m.title === "Interstellar"
  );

  if (alreadyExists) return;

  const movie = {
    title: "Interstellar",
    year: "2014",
    poster_url:
      "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg"
  };

  await api.post("/library", movie);

  const r = await api.get("/library");

  setTitles(r.data.movies || []);
}

    load();

  }, []);


  async function addDemoMovie() {

    const movie = {
      title: "Interstellar",
      year: "2014",
      poster_url:
        "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg"
    };

    await api.post("/library", movie);

    const r = await api.get("/library");

    setTitles(r.data.movies || []);
  }


  return (
    <AppLayout>

      <h1 className="text-white text-4xl font-display mb-2">
        Your library
      </h1>

      <p className="text-white/50 mb-8">
        Everything you watch, in one place.
      </p>

      <button
        onClick={addDemoMovie}
        className="mb-8 px-5 py-3 rounded-full bg-white text-black font-medium"
      >
        Add Demo Movie
      </button>


      {titles.length === 0 ? (

        <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-10 text-center">

          <div className="text-white text-xl font-medium">
            Your library is empty
          </div>

          <div className="text-white/40 text-sm mt-2">
            Add your first movie soon.
          </div>

        </div>

      ) : (

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">

          {titles.map((t, i) => (

            <div
              key={i}
              className="rounded-[24px] overflow-hidden bg-white/[0.03] border border-white/10"
            >

              {t.poster_url && (
                <img
                  src={t.poster_url}
                  alt={t.title}
                  className="w-full h-[320px] object-cover"
                />
              )}

              <div className="p-4">

                <div className="text-white text-xl font-medium">
                  {t.title}
                </div>

                <div className="text-white/40 text-sm mt-1">
                  {t.year}
                </div>

              </div>

            </div>

          ))}

        </div>

      )}

    </AppLayout>
  );
}
