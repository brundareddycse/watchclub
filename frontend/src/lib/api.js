import axios from "axios";

const BACKEND_URL =
  import.meta.env.VITE_BACKEND_URL ||
  "https://watchclub-production.up.railway.app";

export const API_BASE = `${BACKEND_URL}/api`;

export const api = axios.create({
  baseURL: API_BASE,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export function formatApiError(err) {
  return (
    err?.response?.data?.detail ||
    err?.message ||
    "Something went wrong."
  );
}

export const GRADIENTS = {
  pink: "linear-gradient(137deg, #FF3D77 0%, #FFB1CE 45%, #FF9D3C 100%)",
  cyan: "linear-gradient(137deg, #FFFFFF 0%, #7DD3FC 45%, #06B6D4 100%)",
  purple: "linear-gradient(137deg, #4361EE 0%, #E0AEFF 45%, #F72585 100%)",
};
