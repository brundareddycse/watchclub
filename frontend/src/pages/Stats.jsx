import { useEffect, useState } from "react";

import AppLayout from "../components/AppLayout";

import { api } from "../lib/api";

export default function Stats() {

  const [stats, setStats] = useState({
    totalMovies: 0,
    recommendations: 0,
    friends: 0,
  });


  useEffect(() => {

    async function load() {
      try {

        const { data } = await api.get("/stats");

        setStats(data);

      } catch (err) {
        console.log(err);
      }
    }

    load();

  }, []);


  return (
    <AppLayout>
}
