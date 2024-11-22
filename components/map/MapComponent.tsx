"use client";

import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer } from "react-leaflet";
import { useState } from "react";
import { FilterComponent } from "./FilterComponent";

export function MapComponent() {
  const [coord] = useState<[number, number]>([58.5857, 25.5577]);

  return (
    <div className="flex h-full w-full">
      <FilterComponent />

      <div className="flex-1">
        <MapContainer
          style={{
            height: "100%",
            width: "100%",
          }}
          center={coord}
          zoom={8}
          scrollWheelZoom={true}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
        </MapContainer>
      </div>
    </div>
  );
}
