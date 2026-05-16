import { useState } from "react";

import { api } from "../lib/api";

export default function AddTitleModal({
  open,
  onClose,
  onSaved,
}) {
  const [title, setTitle] = useState("");

  if (!open) return null;

  const save = async () => {
    await api.post("/titles", {
      title,
      status: "watchlist",
    });

    onSaved?.();
    onClose?.();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center">
      <div className="w-full max-w-md rounded-[28px] bg-[#16161a] border border-white/10 p-6">
        <h2 className="text-white text-2xl font-display mb-4">
          Add Title
        </h2>

        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Movie or series"
          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white"
        />

        <button
          onClick={save}
          className="mt-6 px-5 py-3 rounded-xl bg-white text-black font-medium"
        >
          Save
        </button>
      </div>
    </div>
  );
}
