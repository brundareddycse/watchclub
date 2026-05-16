import { useEffect, useState } from "react";

import AppLayout from "../components/AppLayout";

import { api } from "../lib/api";

export default function Library() {
  const [titles, setTitles] = useState([]);

  useEffect(() => {
    api.get("/library").then((r) => {
      setTitles(r.data);
    });
  }, []);

  return (
    <AppLayout>
      <h1 className="text-white text-4xl font-display mb-2">
        Your library
      </h1>

      <p className="text-white/50 mb-8">
        Everything you watch, in one place.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {titles.map((t) => (
          <div
            key={t.id}
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
    </AppLayout>
  );
}
