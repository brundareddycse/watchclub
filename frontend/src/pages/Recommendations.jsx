import { useEffect, useState } from "react";

import AppLayout from "../components/AppLayout";

import { api } from "../lib/api";

export default function Recommendations() {

  const [recommendations, setRecommendations] = useState([]);


  async function load() {

    try {

      const { data } = await api.get("/recommendations");

      setRecommendations(data.recommendations || []);

    } catch (err) {
      console.log(err);
    }
  }


  useEffect(() => {
    load();
  }, []);


  return (
    <AppLayout>

      <h1 className="text-white text-4xl font-display mb-2">
        Recommendations
      </h1>
}
