import { useEffect, useState } from "react";

import AppLayout from "../components/AppLayout";

import { api } from "../lib/api";

export default function Recommendations() {
  const [recs, setRecs] = useState([]);

  useEffect(() => {
    api
      .get("/recommendations/inbox")
      .then((r) => setRecs(r.data.recommendations || []));
  }, []);

  return (
    <AppLayout>
      <h1 className="text-white text-4xl font-display mb-2">
        Recommendations
      </h1>

      <p className="text-white/50 mb-8">
        Picks from your circle.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {recs.map((r) => (
          <div
            key={r.id}
            className="rounded-[24px] overflow-hidden bg-white/[0.03] border border-white/10"
          >
            <div className="p-4">
              <div className="text-white text-xl font-medium">
                {r.title?.title}
              </div>

              <div className="text-white/40 text-sm mt-1">
                From {r.from_user?.name}
              </div>

              {r.note && (
                <div className="mt-4 text-white/80 italic">
                  "{r.note}"
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </AppLayout>
  );
}
