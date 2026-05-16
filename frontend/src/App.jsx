import "./App.css";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";

import { AuthProvider, useAuth } from "./lib/auth";

import Landing from "./pages/Landing";
import Auth from "./pages/Auth";
import Library from "./pages/Library";
import Friends from "./pages/Friends";
import Recommendations from "./pages/Recommendations";
import Stats from "./pages/Stats";

function Protected({ children }) {
  const { user } = useAuth();
  const loc = useLocation();

  if (user === null) {
    return (
      <div className="min-h-screen bg-[#0a0a0b] flex items-center justify-center text-white/40">
        Loading...
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: loc }} replace />;
  }

  return children;
}

function GuestOnly({ children }) {
  const { user } = useAuth();

  if (user === null) {
    return (
      <div className="min-h-screen bg-[#0a0a0b] flex items-center justify-center text-white/40">
        Loading...
      </div>
    );
  }

  if (user) return <Navigate to="/app" replace />;

  return children;
}

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Landing />} />

            <Route
              path="/login"
              element={
                <GuestOnly>
                  <Auth mode="login" />
                </GuestOnly>
              }
            />

            <Route
              path="/signup"
              element={
                <GuestOnly>
                  <Auth mode="signup" />
                </GuestOnly>
              }
            />

            <Route
              path="/app"
              element={
                <Protected>
                  <Library />
                </Protected>
              }
            />

            <Route
              path="/app/friends"
              element={
                <Protected>
                  <Friends />
                </Protected>
              }
            />

            <Route
              path="/app/recommendations"
              element={
                <Protected>
                  <Recommendations />
                </Protected>
              }
            />

            <Route
              path="/app/stats"
              element={
                <Protected>
                  <Stats />
                </Protected>
              }
            />

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
