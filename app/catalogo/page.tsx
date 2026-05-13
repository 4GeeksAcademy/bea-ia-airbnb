"use client";

import { useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import StayCard from "@/components/stay-card";
import type { Stay } from "@/types";

type SortOrder = "asc" | "desc";

type StayWithCoordinates = Stay & {
  coordinates: [number, number];
};

const CatalogMap = dynamic(() => import("@/components/catalog-map"), {
  ssr: false,
  loading: () => (
    <div className="sticky top-6 flex h-64 items-center justify-center rounded-2xl border border-slate-300 bg-slate-200/70 text-lg font-semibold tracking-wide text-slate-600 lg:h-[calc(100vh-7rem)]">
      Cargando mapa...
    </div>
  ),
});

const initialStays: StayWithCoordinates[] = [
  {
    id: "catalog-1",
    title: "Apartamento moderno con terraza",
    location: "Barcelona, Espana",
    pricePerNight: 180,
    rating: 4.8,
    imageUrl: "",
    coordinates: [41.3851, 2.1734],
  },
  {
    id: "catalog-2",
    title: "Casa acogedora cerca del centro",
    location: "Madrid, Espana",
    pricePerNight: 140,
    rating: 4.6,
    imageUrl: "",
    coordinates: [40.4168, -3.7038],
  },
  {
    id: "catalog-3",
    title: "Villa premium junto a la costa",
    location: "Valencia, Espana",
    pricePerNight: 260,
    rating: 4.9,
    imageUrl: "",
    coordinates: [39.4699, -0.3763],
  },
  {
    id: "catalog-4",
    title: "Loft para escapadas de fin de semana",
    location: "Malaga, Espana",
    pricePerNight: 120,
    rating: 4.5,
    imageUrl: "",
    coordinates: [36.7213, -4.4217],
  },
  {
    id: "catalog-5",
    title: "Mansion con piscina y jardin",
    location: "Sevilla, Espana",
    pricePerNight: 390,
    rating: 5,
    imageUrl: "",
    coordinates: [37.3891, -5.9845],
  },
  {
    id: "catalog-6",
    title: "Estudio funcional para viajeros",
    location: "Bilbao, Espana",
    pricePerNight: 98,
    rating: 4.4,
    imageUrl: "",
    coordinates: [43.263, -2.935],
  },
];

export default function CatalogoPage() {
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");
  const [highlightedStayId, setHighlightedStayId] = useState<string | null>(null);
  const [cards, setCards] = useState<StayWithCoordinates[]>(() =>
    [...initialStays].sort((a, b) => a.pricePerNight - b.pricePerNight)
  );

  const handleSortChange = (order: SortOrder) => {
    setSortOrder(order);
    setCards((current) =>
      [...current].sort((a, b) =>
        order === "asc" ? a.pricePerNight - b.pricePerNight : b.pricePerNight - a.pricePerNight
      )
    );
  };

  return (
    <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col px-4 pb-10 pt-6 sm:px-6 lg:px-8">
      <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="rounded-full border border-slate-200 px-3 py-1.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-100"
            >
              Inicio
            </Link>
            <h1 className="text-xl font-semibold text-slate-900">{cards.length} resultados</h1>
          </div>

          <div className="flex items-center gap-2">
            <label htmlFor="sort-order" className="text-sm font-medium text-slate-600">
              Ordenar por precio
            </label>
            <select
              id="sort-order"
              value={sortOrder}
              onChange={(event) => handleSortChange(event.target.value as SortOrder)}
              className="h-10 rounded-xl border border-slate-300 px-3 text-sm font-medium text-slate-700 outline-none focus:border-slate-500"
            >
              <option value="asc">Ascendente</option>
              <option value="desc">Descendente</option>
            </select>
          </div>
        </div>
      </section>

      <section className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {cards.map((stay) => (
            <Link
              key={stay.id}
              href={`/habitacion/${stay.id}`}
              className="block"
              onMouseEnter={() => setHighlightedStayId(stay.id)}
              onMouseLeave={() => setHighlightedStayId(null)}
              onFocus={() => setHighlightedStayId(stay.id)}
              onBlur={() => setHighlightedStayId(null)}
            >
              <StayCard stay={stay} />
            </Link>
          ))}
        </div>

        <aside className="order-last lg:order-none">
          <CatalogMap stays={cards} highlightedStayId={highlightedStayId} />
        </aside>
      </section>
    </main>
  );
}
