import { Link } from "react-router-dom";
import { Film, Users, Share2 } from "lucide-react";

import FeatureCard from "../components/FeatureCard";
import { GRADIENTS } from "../lib/api";

export default function Landing() {
  return (
    <div className="min-h-screen bg-[#0a0a0b] text-white overflow-hidden grain">
      <div className="max-w-[1200px] mx-auto px-6 pt-8 pb-24">

        {/* navbar */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div
              className="w-2.5 h-2.5 rounded-full"
              style={{ background: GRADIENTS.purple }}
            />
            <span className="font-display text-lg font-medium">
              watchclub
            </span>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/login"
              className="text-sm text-white/70 hover:text-white transition"
            >
              Log in
            </Link>

            <Link
              to="/signup"
              className="px-5 py-2 rounded-full bg-white text-black text-sm font-medium hover:bg-white/90 transition"
            >
              Get in
            </Link>
          </div>
        </div>

        {/* hero */}
        <div className="text-center mt-24">

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/[0.03] text-xs text-white/50">
            ✨ Your private letterboxd, built for the group chat
          </div>

          <h1 className="font-display text-[56px] md:text-[84px] leading-[0.95] tracking-[-0.06em] font-semibold mt-8">
            <span className="text-white">
              Log what you watch.
            </span>

            <br />

            <span className="bg-gradient-to-r from-blue-500 via-violet-400 to-pink-500 bg-clip-text text-transparent">
              Whisper your favorites to friends.
            </span>
          </h1>

          <p className="text-white/55 text-lg md:text-xl leading-8 max-w-[760px] mx-auto mt-8">
            A quiet corner for movie nerds. Track every title,
            rate it, remember why you liked it, and pass it on —
            to one friend, or none.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 mt-10">
            <Link
              to="/signup"
              className="px-7 py-4 rounded-full bg-white text-black font-medium hover:bg-white/90 transition"
            >
              Start your library →
            </Link>

            <Link
              to="/login"
              className="px-7 py-4 rounded-full border border-white/10 bg-white/[0.02] hover:bg-white/[0.05] transition text-white"
            >
              I already have an account
            </Link>
          </div>
        </div>

        {/* feature cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-24 max-w-[1100px] mx-auto">

          <FeatureCard
            title="Log"
            description="Every title you ever watched, rated and tagged. Movies, series, sitcoms, anime — all in one quiet shelf."
            icon={<Film size={28} />}
            gradient={GRADIENTS.pink}
            delay={0.1}
          />

          <FeatureCard
            title="Recommend"
            description="Send a title straight to a friend with a personal note. It lands in their inbox — nowhere else."
            icon={<Users size={28} />}
            gradient={GRADIENTS.cyan}
            delay={0.2}
          />

          <FeatureCard
            title="Share"
            description="Generate a poster-style card for anyone — even off-app. Drop it in WhatsApp and let them in."
            icon={<Share2 size={28} />}
            gradient={GRADIENTS.purple}
            delay={0.3}
          />

        </div>
      </div>
    </div>
  );
}
