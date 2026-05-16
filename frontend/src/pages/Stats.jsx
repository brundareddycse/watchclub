import AppLayout from "../components/AppLayout";

import {
  Film,
  Users,
  Sparkles,
  Clock3,
} from "lucide-react";

export default function Stats() {

  const stats = [
    {
      label: "Movies Watched",
      value: "148",
      icon: <Film size={28} />,
    },
    {
      label: "Friends",
      value: "12",
      icon: <Users size={28} />,
    },
    {
      label: "Recommendations",
      value: "34",
      icon: <Sparkles size={28} />,
    },
    {
      label: "Watch Hours",
      value: "426",
      icon: <Clock3 size={28} />,
    },
  ];


  return (

    <AppLayout>

      <div className="min-h-screen">

        <div className="mb-12">

          <h1 className="text-white text-5xl font-bold tracking-tight mb-3">
            Your Stats
          </h1>

          <p className="text-white/50 text-lg">
            A cinematic overview of your universe.
          </p>

        </div>


        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-12">

          {stats.map((s, i) => (

            <div
              key={i}
              className="rounded-[32px] border border-white/10 bg-white/[0.03] p-8 backdrop-blur-xl"
            >

              <div className="text-white/60 mb-6">
                {s.icon}
              </div>

              <div className="text-white text-5xl font-bold mb-2">
                {s.value}
              </div>

              <div className="text-white/50">
                {s.label}
              </div>

            </div>

          ))}

        </div>


        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

          <div className="rounded-[32px] border border-white/10 bg-white/[0.03] p-8">

            <div className="text-white text-2xl font-semibold mb-6">
              Favorite Genres
            </div>

            <div className="space-y-4">

              <div>
                <div className="flex justify-between text-white/70 mb-2">
                  <span>Sci-Fi</span>
                  <span>38%</span>
                </div>

                <div className="h-3 rounded-full bg-white/10 overflow-hidden">
                  <div className="w-[38%] h-full bg-white rounded-full" />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-white/70 mb-2">
                  <span>Drama</span>
                  <span>27%</span>
                </div>

                <div className="h-3 rounded-full bg-white/10 overflow-hidden">
                  <div className="w-[27%] h-full bg-white rounded-full" />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-white/70 mb-2">
                  <span>Thriller</span>
                  <span>19%</span>
                </div>

                <div className="h-3 rounded-full bg-white/10 overflow-hidden">
                  <div className="w-[19%] h-full bg-white rounded-full" />
                </div>
              </div>

            </div>

          </div>


          <div className="rounded-[32px] border border-white/10 bg-white/[0.03] p-8">

            <div className="text-white text-2xl font-semibold mb-6">
              Recent Activity
            </div>

            <div className="space-y-5">

              <div className="flex items-center justify-between">
                <div>
                  <div className="text-white">
                    Added Interstellar
                  </div>

                  <div className="text-white/40 text-sm mt-1">
                    2 hours ago
                  </div>
                </div>

                <div className="text-white/20">
                  +1
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <div className="text-white">
                    Shared recommendation
                  </div>

                  <div className="text-white/40 text-sm mt-1">
                    Yesterday
                  </div>
                </div>

                <div className="text-white/20">
                  +1
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <div className="text-white">
                    Added new friend
                  </div>

                  <div className="text-white/40 text-sm mt-1">
                    3 days ago
                  </div>
                </div>

                <div className="text-white/20">
                  +1
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>

    </AppLayout>
  );
}
