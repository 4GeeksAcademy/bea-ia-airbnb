import type { Stay } from "@/types";
import StayCard from "@/components/stay-card";

interface StayGridProps {
  stays: Stay[];
}

export default function StayGrid({ stays }: StayGridProps) {
  return (
    <section className="space-y-4">
      <header className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-slate-900">Alojamientos disponibles</h2>
        <p className="text-sm text-slate-600">{stays.length} resultados</p>
      </header>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {stays.map((stay) => (
          <StayCard key={stay.id} stay={stay} />
        ))}
      </div>
    </section>
  );
}
