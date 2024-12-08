"use client";

import React from "react";
import { Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { useRouter } from "next/navigation";
import { Trail } from "@/types/trail";

type MarkerProps = Omit<Trail, "xCoordinate" | "yCoordinate"> & {
  position: [number, number];
};

export default function MarkerComponent({
  id,
  position,
  name,
  length,
  type,
  parking,
  camping,
  campfire,
  accessibility,
  berries_mushrooms,
  sightseeing,
  picture,
}: MarkerProps) {
  const router = useRouter();

  const handleNameClick = () => {
    router.push(`/trail/${id}`);
  };

  const customIcon = L.divIcon({
    className: "custom-icon",
    html: '<div class="w-4 h-4 bg-red-500 rounded-full border-2 border-white shadow-lg"></div>',
    iconSize: [20, 20],
    iconAnchor: [10, 10],
  });

  return (
    <Marker position={position} icon={customIcon}>
      <Popup>
        <p>
          <strong>Nimi:</strong>{" "}
          <span
            onClick={handleNameClick}
            style={{
              color: "black",
              cursor: "pointer",
            }}
          >
            {name}
          </span>
        </p>
        <p>
          <strong>Pikkus:</strong> {length} kilomeetrit
        </p>
        <p>
          <strong>Tüüp:</strong> {type}
        </p>
        <p>
          <strong>Parkimine:</strong> {parking ? "Olemas" : "Puudub"}
        </p>
        <p>
          <strong>Telkimine:</strong> {camping ? "Olemas" : "Puudub"}
        </p>
        <p>
          <strong>Lõkkeplats:</strong> {campfire ? "Olemas" : "Puudub"}
        </p>
        <p>
          <strong>Juurdepääs:</strong> {accessibility}
        </p>
        <p>
          <strong>Korilus:</strong>{" "}
          {berries_mushrooms === "puudub" || !berries_mushrooms
            ? "info puudub"
            : "Olemas"}
        </p>
        <p>
          <strong>Vaatamisväärsused:</strong>{" "}
          {sightseeing ? "Olemas" : "Puudub"}
        </p>
        {picture && (
          <div>
            <strong>Pilt:</strong>
            <img
              src={picture}
              alt={`${name} pilt`}
              style={{ width: "100%", marginTop: "10px" }}
            />
          </div>
        )}
      </Popup>
    </Marker>
  );
}
