import type { Stay } from "@/types";

interface StayCardProps {
  stay: Stay;
}

export default function StayCard({ stay }: StayCardProps) {
  return (
    <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex h-44 items-center justify-center bg-gradient-to-br from-sky-100 via-cyan-50 to-emerald-100 text-sm font-semibold text-slate-500">
        {stay.imageUrl ? "Foto" : "Foto placeholder"}
      </div>

      <div className="space-y-2 p-4">
        <h3 className="line-clamp-2 text-base font-semibold text-slate-900">{stay.title}</h3>
        <p className="text-sm text-slate-500">{stay.location}</p>

        <div className="flex items-center justify-between text-sm">
          <p className="font-semibold text-slate-900">${stay.pricePerNight} / noche</p>
          <p className="font-medium text-amber-600">★ {stay.rating.toFixed(1)}</p>
        </div>

        {stay.superhost ? (
          <span className="inline-flex rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-semibold text-emerald-700">
            Superhost
          </span>
        ) : null}
      </div>
    </article>
  );
}
