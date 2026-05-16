import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

export const API_BASE = `${BACKEND_URL}/api`;

export const api = axios.create({
  baseURL: API_BASE,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export function formatApiError(err) {
  const detail = err?.response?.data?.detail;

  if (!detail) return err.message || "Something went wrong.";

  if (typeof detail === "string") return detail;

  if (Array.isArray(detail)) {
    return detail.map((e) => e.msg).join(" ");
  }

  return String(detail);
}

export const GRADIENTS = {
  pink: "linear-gradient(137deg, #FF3D77 0%, #FFB1CE 45%, #FF9D3C 100%)",
  cyan: "linear-gradient(137deg, #FFFFFF 0%, #7DD3FC 45%, #06B6D4 100%)",
  purple: "linear-gradient(137deg, #4361EE 0%, #E0AEFF 45%, #F72585 100%)",
  green: "linear-gradient(137deg, #34d399 0%, #a7f3d0 45%, #06b6d4 100%)",
};

export const TYPES = [
  "movie",
  "series",
  "sitcom",
  "anime",
  "documentary",
];

export const GENRES = [
  "Thriller",
  "Drama",
  "Comedy",
  "Sci-Fi",
  "Romance",
  "Horror",
  "Action",
];

export const LANGUAGES = [
  "English",
  "Hindi",
  "Telugu",
  "Tamil",
  "Korean",
  "Japanese",
  "Spanish",
  "French",
];

export const MOODS = [
  "intense",
  "hilarious",
  "emotional",
  "mind-bending",
  "chill",
];

export const STATUSES = [
  { key: "watchlist", label: "Watchlist" },
  { key: "watching", label: "Currently Watching" },
  { key: "watched", label: "Watched Log" },
];
