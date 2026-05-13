import Image from "next/image";
import type { Stay } from "@/types";

interface StayCardProps {
  stay: Stay;
}

export default function StayCard({ stay }: StayCardProps) {
  return (
    <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md">
      <div className="relative h-48 w-full">
        <Image
          src={stay.imageUrl}
          alt={stay.title}
          fill
          className="object-cover"
          sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 100vw"
        />
      </div>

      <div className="space-y-2 p-4">
        <p className="text-xs uppercase tracking-wide text-slate-500">{stay.location}</p>
        <h3 className="line-clamp-2 text-lg font-semibold text-slate-900">{stay.title}</h3>

        <div className="flex items-center justify-between text-sm">
          <p className="font-medium text-slate-900">${stay.pricePerNight} / noche</p>
          <p className="text-slate-600">{stay.rating.toFixed(1)} ★</p>
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
