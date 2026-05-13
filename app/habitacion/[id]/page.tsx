"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import DatePicker from "react-datepicker";
import { differenceInCalendarDays } from "date-fns";
import "react-datepicker/dist/react-datepicker.css";

type RoomDetail = {
  id: string;
  title: string;
  location: string;
  rating: number;
  reviews: number;
  hostName: string;
  hostYears: number;
  pricePerNight: number;
  photos: string[];
  amenities: Array<{ icon: string; label: string }>;
};

const roomSeed: Record<string, RoomDetail> = {
  "catalog-1": {
    id: "catalog-1",
    title: "Apartamento moderno con terraza",
    location: "Barcelona, Espana",
    rating: 4.8,
    reviews: 132,
    hostName: "Laura",
    hostYears: 6,
    pricePerNight: 180,
    photos: ["Foto 1", "Foto 2", "Foto 3", "Foto 4"],
    amenities: [
      { icon: "📶", label: "Wifi rapido" },
      { icon: "🍳", label: "Cocina equipada" },
      { icon: "🧺", label: "Lavadora" },
      { icon: "❄️", label: "Aire acondicionado" },
      { icon: "📺", label: "TV 4K" },
      { icon: "🚗", label: "Parking" },
    ],
  },
  "catalog-2": {
    id: "catalog-2",
    title: "Casa acogedora cerca del centro",
    location: "Madrid, Espana",
    rating: 4.6,
    reviews: 89,
    hostName: "Pedro",
    hostYears: 4,
    pricePerNight: 140,
    photos: ["Foto 1", "Foto 2", "Foto 3"],
    amenities: [
      { icon: "📶", label: "Wifi" },
      { icon: "🔥", label: "Calefaccion" },
      { icon: "🛏️", label: "2 habitaciones" },
      { icon: "☕", label: "Cafetera" },
    ],
  },
};

const defaultRoom: RoomDetail = {
  id: "default",
  title: "Habitacion premium",
  location: "Valencia, Espana",
  rating: 4.7,
  reviews: 74,
  hostName: "Ana",
  hostYears: 5,
  pricePerNight: 165,
  photos: ["Foto 1", "Foto 2", "Foto 3", "Foto 4"],
  amenities: [
    { icon: "📶", label: "Wifi" },
    { icon: "🍳", label: "Cocina" },
    { icon: "🧴", label: "Bano privado" },
    { icon: "🛎️", label: "Check-in autonomo" },
  ],
};

export default function DetalleHabitacionPage() {
  const params = useParams<{ id: string }>();
  const roomId = params.id;

  const [loading, setLoading] = useState(true);
  const [room, setRoom] = useState<RoomDetail | null>(null);
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);
  const [guests, setGuests] = useState(2);
  const [checkIn, setCheckIn] = useState<Date | null>(null);
  const [checkOut, setCheckOut] = useState<Date | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      const resolvedRoom = roomSeed[roomId] ?? {
        ...defaultRoom,
        id: roomId,
        title: `${defaultRoom.title} #${roomId}`,
      };

      const entryDate = new Date();
      entryDate.setDate(entryDate.getDate() + 2);

      const exitDate = new Date(entryDate);
      exitDate.setDate(exitDate.getDate() + 3);

      setRoom(resolvedRoom);
      setActivePhotoIndex(0);
      setCheckIn(entryDate);
      setCheckOut(exitDate);
      setLoading(false);
    }, 850);

    return () => clearTimeout(timer);
  }, [roomId]);

  const nights = useMemo(() => {
    if (!checkIn || !checkOut) {
      return 0;
    }

    return Math.max(0, differenceInCalendarDays(checkOut, checkIn));
  }, [checkIn, checkOut]);

  const totalPrice = useMemo(() => {
    if (!room) {
      return 0;
    }

    return room.pricePerNight * nights;
  }, [room, nights]);

  const goToPreviousPhoto = () => {
    if (!room) {
      return;
    }

    setActivePhotoIndex((index) =>
      index === 0 ? room.photos.length - 1 : index - 1
    );
  };

  const goToNextPhoto = () => {
    if (!room) {
      return;
    }

    setActivePhotoIndex((index) => (index + 1) % room.photos.length);
  };

  const decreaseGuests = () => {
    setGuests((current) => Math.max(1, current - 1));
  };

  const increaseGuests = () => {
    setGuests((current) => Math.min(10, current + 1));
  };

  if (loading || !room) {
    return (
      <main className="mx-auto flex w-full max-w-6xl flex-1 items-center justify-center px-4 py-10 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-slate-200 bg-white px-8 py-10 text-center text-slate-500 shadow-sm">
          Cargando detalle de la habitacion...
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-6 px-4 py-8 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <nav className="flex items-center gap-2 text-sm font-medium text-slate-500">
          <Link href="/catalogo" className="text-rose-600 transition hover:text-rose-700">
            Catalogo
          </Link>
          <span>/</span>
          <span className="truncate text-slate-700">{room.title}</span>
        </nav>

        <Link
          href="/catalogo"
          className="inline-flex w-fit items-center rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
        >
          Volver al catalogo
        </Link>
      </div>

      <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
        <div className="relative flex h-72 items-center justify-center bg-gradient-to-br from-slate-100 via-cyan-50 to-emerald-100 sm:h-96">
          <p className="text-2xl font-semibold text-slate-500">{room.photos[activePhotoIndex]}</p>

          <button
            type="button"
            onClick={goToPreviousPhoto}
            className="absolute left-4 rounded-full border border-slate-300 bg-white/90 px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-white"
          >
            Anterior
          </button>

          <button
            type="button"
            onClick={goToNextPhoto}
            className="absolute right-4 rounded-full border border-slate-300 bg-white/90 px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-white"
          >
            Siguiente
          </button>
        </div>

        <div className="flex items-center justify-center gap-2 px-4 py-3">
          {room.photos.map((photo, index) => {
            const isActive = index === activePhotoIndex;

            return (
              <button
                key={photo + index}
                type="button"
                onClick={() => setActivePhotoIndex(index)}
                className={`h-2.5 w-2.5 rounded-full transition ${
                  isActive ? "bg-rose-500" : "bg-slate-300 hover:bg-slate-400"
                }`}
                aria-label={`Ver ${photo}`}
              />
            );
          })}
        </div>
      </section>

      <section className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
        <div className="space-y-6">
          <header className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">{room.title}</h1>
            <p className="mt-2 text-sm font-medium text-slate-600">
              ★ {room.rating.toFixed(1)} · {room.reviews} reseñas · {room.location}
            </p>
          </header>

          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-200 text-sm font-bold text-slate-700">
                AV
              </div>
              <div>
                <h2 className="text-base font-semibold text-slate-900">Anfitrion: {room.hostName}</h2>
                <p className="text-sm text-slate-600">{room.hostYears} anos de experiencia como anfitrion</p>
              </div>
            </div>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900">Servicios</h2>
            <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {room.amenities.map((amenity) => (
                <div key={amenity.label} className="flex items-center gap-3 rounded-xl border border-slate-200 px-3 py-2">
                  <span className="text-lg" aria-hidden="true">
                    {amenity.icon}
                  </span>
                  <span className="text-sm font-medium text-slate-700">{amenity.label}</span>
                </div>
              ))}
            </div>
          </section>
        </div>

        <aside>
          <div className="sticky top-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900">Reserva</h2>
            <p className="mt-1 text-sm text-slate-600">
              <span className="text-xl font-bold text-slate-900">${room.pricePerNight}</span> / noche
            </p>

            <div className="mt-4 space-y-3">
              <div>
                <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-500">Fecha de entrada</label>
                <DatePicker
                  selected={checkIn}
                  onChange={(date) => setCheckIn(date)}
                  selectsStart
                  startDate={checkIn}
                  endDate={checkOut}
                  minDate={new Date()}
                  className="h-10 w-full rounded-xl border border-slate-300 px-3 text-sm text-slate-700 outline-none focus:border-slate-500"
                  placeholderText="Selecciona fecha"
                />
              </div>

              <div>
                <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-500">Fecha de salida</label>
                <DatePicker
                  selected={checkOut}
                  onChange={(date) => setCheckOut(date)}
                  selectsEnd
                  startDate={checkIn}
                  endDate={checkOut}
                  minDate={checkIn ?? new Date()}
                  className="h-10 w-full rounded-xl border border-slate-300 px-3 text-sm text-slate-700 outline-none focus:border-slate-500"
                  placeholderText="Selecciona fecha"
                />
              </div>

              <div>
                <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-500">Huespedes</label>
                <div className="flex items-center justify-between rounded-xl border border-slate-300 px-3 py-2">
                  <button
                    type="button"
                    onClick={decreaseGuests}
                    className="h-8 w-8 rounded-full border border-slate-300 text-lg font-semibold text-slate-700 transition hover:bg-slate-100"
                    aria-label="Reducir huespedes"
                  >
                    -
                  </button>
                  <span className="text-sm font-semibold text-slate-800">{guests} huespedes</span>
                  <button
                    type="button"
                    onClick={increaseGuests}
                    className="h-8 w-8 rounded-full border border-slate-300 text-lg font-semibold text-slate-700 transition hover:bg-slate-100"
                    aria-label="Aumentar huespedes"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-5 rounded-xl bg-slate-50 p-3 text-sm text-slate-700">
              <p className="flex items-center justify-between">
                <span>Noches</span>
                <span className="font-semibold">{nights}</span>
              </p>
              <p className="mt-1 flex items-center justify-between">
                <span>Total</span>
                <span className="text-base font-bold text-slate-900">${totalPrice}</span>
              </p>
            </div>

            <button
              type="button"
              disabled={nights <= 0}
              className="mt-4 h-11 w-full rounded-xl bg-rose-500 text-sm font-semibold text-white transition hover:bg-rose-600 disabled:cursor-not-allowed disabled:bg-slate-300"
            >
              Reservar ahora
            </button>
          </div>
        </aside>
      </section>
    </main>
  );
}
