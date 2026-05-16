export default function RecommendModal({
  open,
  onClose,
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center">
      <div className="w-full max-w-md rounded-[28px] bg-[#16161a] border border-white/10 p-6">
        <h2 className="text-white text-2xl font-display mb-4">
          Recommend
        </h2>

        <p className="text-white/50 mb-6">
          Send this title to a friend.
        </p>

        <button
          onClick={onClose}
          className="px-5 py-3 rounded-xl bg-white text-black font-medium"
        >
          Close
        </button>
      </div>
    </div>
  );
}
