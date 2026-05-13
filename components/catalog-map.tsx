"use client";

import { useEffect } from "react";
import { CircleMarker, MapContainer, Popup, TileLayer, useMap } from "react-leaflet";
import type { LatLngExpression } from "leaflet";
import "leaflet/dist/leaflet.css";

type StayPin = {
  id: string;
  title: string;
  location: string;
  pricePerNight: number;
  coordinates: [number, number];
};

interface CatalogMapProps {
  stays: StayPin[];
  highlightedStayId?: string | null;
}

function FitBounds({ stays }: { stays: StayPin[] }) {
  const map = useMap();

  useEffect(() => {
    if (stays.length === 0) {
      map.setView([40.4168, -3.7038], 5);
      return;
    }

    const bounds = stays.map((stay) => stay.coordinates);
    map.fitBounds(bounds, { padding: [30, 30] });
  }, [map, stays]);

  return null;
}

export default function CatalogMap({ stays, highlightedStayId }: CatalogMapProps) {
  const defaultCenter: LatLngExpression = [40.4168, -3.7038];

  return (
    <div className="sticky top-6 h-64 overflow-hidden rounded-2xl border border-slate-300 bg-slate-100 lg:h-[calc(100vh-7rem)]">
      <MapContainer center={defaultCenter} zoom={6} scrollWheelZoom className="h-full w-full">
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <FitBounds stays={stays} />

        {stays.map((stay) => {
          const isHighlighted = stay.id === highlightedStayId;

          return (
            <CircleMarker
              key={stay.id}
              center={stay.coordinates}
              radius={isHighlighted ? 11 : 8}
              pathOptions={{
                color: isHighlighted ? "#be123c" : "#e11d48",
                fillColor: isHighlighted ? "#f43f5e" : "#fb7185",
                fillOpacity: isHighlighted ? 1 : 0.9,
                weight: isHighlighted ? 3 : 2,
              }}
            >
              <Popup>
                <div className="space-y-1">
                  <p className="text-sm font-semibold text-slate-900">{stay.title}</p>
                  <p className="text-xs text-slate-600">{stay.location}</p>
                  <p className="text-xs font-semibold text-slate-900">${stay.pricePerNight} / noche</p>
                </div>
              </Popup>
            </CircleMarker>
          );
        })}
      </MapContainer>
    </div>
  );
}
