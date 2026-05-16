import { useEffect, useState } from "react";

import AppLayout from "../components/AppLayout";

import { api } from "../lib/api";

export default function Friends() {

  const [friends, setFriends] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");


  async function load() {
    try {
      const { data } = await api.get("/friends");
      setFriends(data.friends || []);
    } catch (err) {
      console.log(err);
    }
  }


  useEffect(() => {
    load();
  }, []);


  async function addFriend(e) {

    e.preventDefault();

    const friend = {
      name,
      email,
    };
}
