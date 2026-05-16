import { Link } from "react-router-dom";

import {
  Film,
  Users,
  Share2,
} from "lucide-react";

import FeatureCard from "../components/FeatureCard";

import { GRADIENTS } from "../lib/api";

export default function Landing() {
  return (
    <div className="min-h-screen bg-[#0A0A0B] flex flex-col items-center justify-center p-6 md:p-12">
      <div className="max-w-5xl mx-auto text-center">
        <h1 className="font-display text-white text-5xl md:text-7xl tracking-tight">
          Your private cinema journal.
        </h1>

        <p className="text-white/50 text-lg mt-6 max-w-2xl mx-auto">
          Watchclub helps you log films, share recommendations,
          and build your personal movie universe with friends.
        </p>

        <div className="flex items-center justify-center gap-3 mt-8">
          <Link
            to="/signup"
            className="px-6 py-3 rounded-full bg-white text-black font-medium"
          >
            Start your library
          </Link>

          <Link
            to="/login"
            className="px-6 py-3 rounded-full border border-white/10 text-white"
          >
            Login
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-3 mt-20">
          <FeatureCard
            title="Log"
            description="Track everything you watch in one cinematic shelf."
            icon={<Film size={32} />}
            gradient={GRADIENTS.pink}
            delay={0.1}
          />

          <FeatureCard
            title="Recommend"
            description="Send thoughtful recommendations to your circle."
            icon={<Users size={32} />}
            gradient={GRADIENTS.cyan}
            delay={0.2}
          />

          <FeatureCard
            title="Share"
            description="Create beautiful share cards for your favorite titles."
            icon={<Share2 size={32} />}
            gradient={GRADIENTS.purple}
            delay={0.3}
          />
        </div>
      </div>
    </div>
  );
}
