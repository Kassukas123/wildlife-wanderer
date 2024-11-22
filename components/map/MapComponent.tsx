"use client";

import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer } from "react-leaflet";
import { useState } from "react";
import { FilterComponent } from "./FilterComponent";
import MarkerComponent from "./MarkerComponent";

export function MapComponent() {
  const [coord] = useState<[number, number]>([58.5857, 25.5577]);

  const markerData = [
    {
      position: [59.433585, 24.744026] as [number, number],
      title: "Tallinna Kesklinn",
      description: "Tallinna südames asuv oluline punkt.",
    },

    {
      position: [58.978917, 25.061693] as [number, number],
      title: "Teine Punkt",
      description: "Siin on veel üks huvitav koht.",
    },
  ];

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

          {markerData.map((data, index) => (
            <MarkerComponent
              key={index}
              position={data.position}
              title={data.title}
              description={data.description}
            />
          ))}
        </MapContainer>
      </div>
    </div>
  );
}
