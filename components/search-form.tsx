import type { SearchFilters } from "@/types";

interface SearchFormProps {
  filters: SearchFilters;
}

export default function SearchForm({ filters }: SearchFormProps) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
        Encuentra tu proxima estancia
      </h2>
      <form className="mt-4 grid gap-3 md:grid-cols-4">
        <label className="flex flex-col gap-1 text-sm font-medium text-slate-700">
          Destino
          <input
            defaultValue={filters.destination}
            className="h-11 rounded-xl border border-slate-300 px-3 text-slate-900 outline-none transition focus:border-slate-500"
            type="text"
            placeholder="Ciudad o zona"
          />
        </label>

        <label className="flex flex-col gap-1 text-sm font-medium text-slate-700">
          Check-in
          <input
            defaultValue={filters.checkIn}
            className="h-11 rounded-xl border border-slate-300 px-3 text-slate-900 outline-none transition focus:border-slate-500"
            type="date"
          />
        </label>

        <label className="flex flex-col gap-1 text-sm font-medium text-slate-700">
          Check-out
          <input
            defaultValue={filters.checkOut}
            className="h-11 rounded-xl border border-slate-300 px-3 text-slate-900 outline-none transition focus:border-slate-500"
            type="date"
          />
        </label>

        <label className="flex flex-col gap-1 text-sm font-medium text-slate-700">
          Huespedes
          <input
            defaultValue={filters.guests}
            className="h-11 rounded-xl border border-slate-300 px-3 text-slate-900 outline-none transition focus:border-slate-500"
            type="number"
            min={1}
          />
        </label>
      </form>
    </section>
  );
}
