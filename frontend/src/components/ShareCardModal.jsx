export default function ShareCardModal({
  open,
  onClose,
  title,
}) {
  if (!open || !title) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center">
      <div className="w-full max-w-md rounded-[28px] bg-[#16161a] border border-white/10 p-6">
        <h2 className="text-white text-2xl font-display mb-4">
          Share Card
        </h2>

        <div className="rounded-2xl overflow-hidden bg-white/[0.03] border border-white/10">
          {title.poster_url && (
            <img
              src={title.poster_url}
              alt={title.title}
              className="w-full h-[320px] object-cover"
            />
          )}

          <div className="p-4">
            <div className="text-white text-xl font-medium">
              {title.title}
            </div>
          </div>
        </div>

        <button
          onClick={onClose}
          className="mt-6 px-5 py-3 rounded-xl bg-white text-black font-medium"
        >
          Close
        </button>
      </div>
    </div>
  );
}
