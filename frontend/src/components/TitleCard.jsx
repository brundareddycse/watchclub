export default function TitleCard({ t }) {
  return (
    <div className="rounded-[24px] overflow-hidden bg-white/[0.03] border border-white/10">
      {t.poster_url && (
        <img
          src={t.poster_url}
          alt={t.title}
          className="w-full h-[320px] object-cover"
        />
      )}

      <div className="p-4">
        <div className="text-white text-xl font-medium">
          {t.title}
        </div>

        <div className="text-white/40 text-sm mt-1">
          {[t.year, t.type, t.language]
            .filter(Boolean)
            .join(" · ")}
        </div>

        {t.note && (
          <div className="mt-4 text-white/70 text-sm">
            {t.note}
          </div>
        )}
      </div>
    </div>
  );
}
