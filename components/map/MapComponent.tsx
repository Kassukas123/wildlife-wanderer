"use client";

import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer } from "react-leaflet";
import { useEffect, useState } from "react";
import { FilterComponent } from "./FilterComponent";
import MarkerComponent from "./MarkerComponent";
import { Trail } from "@/types/trail"; 

export function MapComponent() {
  const [trails, setTrails] = useState<Trail[]>([]);
  const [coord] = useState<[number, number]>([58.5857, 25.5577]);

  useEffect(() => {
    async function fetchTrails() {
      try {
        const response = await fetch("/api/trails");
        if (!response.ok) throw new Error("Failed to fetch trails");
        const data: Trail[] = await response.json();
        setTrails(data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchTrails();
  }, []);

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

          {trails.map((trail) => (
            <MarkerComponent
              key={trail.id}
              position={[trail.xCoordinate, trail.yCoordinate]}
              {...trail}
            />
          ))}
        </MapContainer>
      </div>
    </div>
  );
}
