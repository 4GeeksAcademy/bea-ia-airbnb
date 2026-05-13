"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import StayCard from "@/components/stay-card";
import type { Stay } from "@/types";

type StayCard = Stay & {
  category: string;
};

type FilterItem = {
  id: string;
  label: string;
  icon: string;
};

const categoryFilters: FilterItem[] = [
  { id: "Todas", label: "Todas", icon: "🏠" },
  { id: "Playa", label: "Playa", icon: "🏖️" },
  { id: "Mansiones", label: "Mansiones", icon: "🏛️" },
  { id: "Tendencias", label: "Tendencias", icon: "🔥" },
  { id: "Cabaña", label: "Cabaña", icon: "🌲" },
  { id: "Diseño", label: "Diseño", icon: "🎨" },
];

const seedStays: StayCard[] = [
  {
    id: "stay-1",
    title: "Villa frente al mar en Costa Brava",
    location: "Girona, España",
    category: "Playa",
    pricePerNight: 220,
    rating: 4.9,
    imageUrl: "",
  },
  {
    id: "stay-2",
    title: "Mansión clásica con jardín privado",
    location: "Sevilla, España",
    category: "Mansiones",
    pricePerNight: 410,
    rating: 4.8,
    imageUrl: "",
  },
  {
    id: "stay-3",
    title: "Loft en barrio artístico",
    location: "Madrid, España",
    category: "Tendencias",
    pricePerNight: 150,
    rating: 4.7,
    imageUrl: "",
  },
  {
    id: "stay-4",
    title: "Cabaña minimalista en la montaña",
    location: "Asturias, España",
    category: "Cabaña",
    pricePerNight: 130,
    rating: 4.6,
    imageUrl: "",
  },
  {
    id: "stay-5",
    title: "Casa de autor con interiores únicos",
    location: "Valencia, España",
    category: "Diseño",
    pricePerNight: 195,
    rating: 4.9,
    imageUrl: "",
  },
  {
    id: "stay-6",
    title: "Apartamento cerca de la playa",
    location: "Málaga, España",
    category: "Playa",
    pricePerNight: 115,
    rating: 4.5,
    imageUrl: "",
  },
];

export default function Home() {
  const [searchText, setSearchText] = useState("");
  const [activeCategory, setActiveCategory] = useState("Todas");
  const [loading, setLoading] = useState(true);
  const [allStays, setAllStays] = useState<StayCard[]>([]);
  const [visibleStays, setVisibleStays] = useState<StayCard[]>([]);

  const applyFilters = (query: string, category: string, source: StayCard[]) => {
    const normalizedQuery = query.trim().toLowerCase();

    const filtered = source.filter((stay) => {
      const matchesCategory = category === "Todas" || stay.category === category;
      const matchesQuery =
        normalizedQuery.length === 0 ||
        stay.title.toLowerCase().includes(normalizedQuery) ||
        stay.location.toLowerCase().includes(normalizedQuery);

      return matchesCategory && matchesQuery;
    });

    setVisibleStays(filtered);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setAllStays(seedStays);
      setVisibleStays(seedStays);
      setLoading(false);
    }, 900);

    return () => clearTimeout(timer);
  }, []);

  const handleSearchChange = (value: string) => {
    setSearchText(value);
    applyFilters(value, activeCategory, allStays);
  };

  const handleCategoryClick = (category: string) => {
    setActiveCategory(category);
    applyFilters(searchText, category, allStays);
  };

  return (
    <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col px-4 pb-10 pt-6 sm:px-6 lg:px-8">
      <header className="sticky top-0 z-20 rounded-2xl border border-slate-200 bg-white/95 px-4 py-3 shadow-sm backdrop-blur sm:px-5">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="text-2xl font-black tracking-tight text-rose-500">holidays</div>

          <div className="flex h-11 w-full items-center gap-2 rounded-full border border-slate-200 px-4 md:max-w-lg">
            <svg viewBox="0 0 24 24" className="h-5 w-5 text-slate-400" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-3.5-3.5" />
            </svg>
            <input
              value={searchText}
              onChange={(event) => handleSearchChange(event.target.value)}
              type="text"
              placeholder="Buscar destino o alojamiento"
              className="h-full w-full bg-transparent text-sm text-slate-700 outline-none"
            />
          </div>

          <div className="ml-auto flex items-center gap-2">
            <Link
              href="/catalogo"
              className="rounded-full border border-rose-200 bg-rose-50 px-4 py-2 text-sm font-semibold text-rose-600 transition hover:bg-rose-100"
            >
              Ver catalogo
            </Link>
            <button
              type="button"
              className="rounded-full border border-slate-200 p-2 text-slate-600 transition hover:bg-slate-100"
              aria-label="Abrir menu"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 7h16M4 12h16M4 17h16" />
              </svg>
            </button>
            <button
              type="button"
              className="rounded-full border border-slate-200 p-2 text-slate-600 transition hover:bg-slate-100"
              aria-label="Cuenta de usuario"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="8" r="3.5" />
                <path d="M4 20c1.6-3.2 4.3-4.8 8-4.8s6.4 1.6 8 4.8" />
              </svg>
            </button>
          </div>
        </div>

        <div className="mt-4 flex gap-2 overflow-x-auto pb-1">
          {categoryFilters.map((category) => {
            const isActive = category.id === activeCategory;

            return (
              <button
                key={category.id}
                type="button"
                onClick={() => handleCategoryClick(category.id)}
                className={`inline-flex shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition ${
                  isActive
                    ? "border-rose-500 bg-rose-50 text-rose-600"
                    : "border-slate-200 bg-white text-slate-600 hover:bg-slate-100"
                }`}
              >
                <span>{category.icon}</span>
                <span>{category.label}</span>
              </button>
            );
          })}
        </div>
      </header>

      <section className="mt-6">
        {loading ? (
          <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center text-slate-500 shadow-sm">
            Cargando alojamientos...
          </div>
        ) : (
          <>
            <div className="mb-4 text-sm text-slate-600">{visibleStays.length} alojamientos visibles</div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {visibleStays.map((stay) => (
                <Link key={stay.id} href={`/habitacion/${stay.id}`} className="block">
                  <StayCard stay={stay} />
                </Link>
              ))}
            </div>
          </>
        )}
      </section>
    </main>
  );
}
