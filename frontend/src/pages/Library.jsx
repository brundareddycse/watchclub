import { useEffect, useState } from "react";

import AppLayout from "../components/AppLayout";

import { api } from "../lib/api";

export default function Library() {

  const [titles, setTitles] = useState([]);

  useEffect(() => {

    async function load() {
      try {

        const r = await api.get("/library");

        setTitles(r.data.movies || []);

      } catch (err) {
        console.log(err);
      }
    }

    load();

  }, []);


  async function addDemoMovie() {

    const movie = {
      title: "Interstellar",
      year: "2014",
      poster_url:
        "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg"
}
