import { useEffect, useState } from "react";

import AppLayout from "../components/AppLayout";

import { api } from "../lib/api";

export default function Stats() {
  const [s, setS] = useState(null);

  useEffect(() => {
    api.get("/stats").then((r) => setS(r.data));
  }, []);

  if (!s) {
    return (
      <AppLayout>
        <div className="text-white/40">
          Loading...
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <h1 className="text-white text-4xl font-display mb-2">
        Stats
      </h1>

      <p className="text-white/50 mb-8">
        Your watching pulse.
      </p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Tile label="Titles" value={s.total} />
        <Tile label="Watched" value={s.watched_count} />
        <Tile label="Watchlist" value={s.watchlist_count} />
        <Tile label="Avg Rating" value={s.avg_rating || "-"} />
      </div>
    </AppLayout>
  );
}

function Tile({ label, value }) {
  return (
    <div className="rounded-2xl p-5 bg-white/[0.03] border border-white/10">
      <div className="text-white/40 text-xs uppercase">
        {label}
      </div>

      <div className="text-white text-3xl font-display mt-2">
        {value}
      </div>
    </div>
  );
}
