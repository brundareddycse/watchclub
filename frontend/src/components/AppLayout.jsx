import { Link, NavLink, useNavigate } from "react-router-dom";

import {
  Film,
  Users,
  Inbox,
  BarChart3,
  LogOut,
  Plus,
} from "lucide-react";

import { GRADIENTS } from "../lib/api";
import { useAuth } from "../lib/auth";

const navItems = [
  { to: "/app", label: "Library", icon: Film, end: true },
  { to: "/app/friends", label: "Friends", icon: Users },
  { to: "/app/recommendations", label: "Recommendations", icon: Inbox },
  { to: "/app/stats", label: "Stats", icon: BarChart3 },
];

export default function AppLayout({ children, onAdd }) {
  const { user, logout } = useAuth();
  const nav = useNavigate();

  return (
    <div className="min-h-screen bg-[#0A0A0B] grain flex flex-col">
      <header className="sticky top-0 z-30 border-b border-white/5 bg-[#0a0a0b]/80 backdrop-blur">
        <div className="max-w-[1200px] mx-auto px-5 md:px-8 h-16 flex items-center justify-between">
          <Link
            to="/app"
            className="flex items-center gap-2"
          >
            <span
              className="inline-block w-2.5 h-2.5 rounded-full"
              style={{ background: GRADIENTS.purple }}
            />

            <span className="text-white font-display text-lg font-medium">
              watchclub
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((it) => (
              <NavLink
                key={it.to}
                to={it.to}
                end={it.end}
                className={({ isActive }) =>
                  `flex items-center gap-2 px-3.5 py-2 rounded-full text-sm transition ${
                    isActive
                      ? "bg-white/10 text-white"
                      : "text-white/60 hover:text-white hover:bg-white/5"
                  }`
                }
              >
                <it.icon size={15} />
                {it.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            {onAdd && (
              <button
                onClick={onAdd}
                className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-white text-black text-sm font-medium"
              >
                <Plus size={15} />
                Add title
              </button>
            )}

            <button
              onClick={async () => {
                await logout();
                nav("/");
              }}
              className="p-2 rounded-full text-white/60 hover:text-white"
            >
              <LogOut size={16} />
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-[1200px] w-full mx-auto px-5 md:px-8 py-8 relative z-10">
        {children}
      </main>
    </div>
  );
}
