"use client";

import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer } from "react-leaflet";
import { useEffect, useState } from "react";
import { FilterComponent } from "./FilterComponent";
import MarkerComponent from "./MarkerComponent";
import { Trail } from "@/types/trail"; 

export function MapComponent() {
  const [coord] = useState<[number, number]>([58.5857, 25.5577]);
  const [markerData, setMarkerData] = useState<
    { position: [number, number]; title: string; description: string }[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchTrails() {
      try {
        const response = await fetch("/api/trails");
        if (!response.ok) {
          throw new Error("Failed to fetch trail data");
        }

        const trails: Trail[] = await response.json();

        const markers = trails.map((trail) => ({
          position: [trail.xCoordinate, trail.yCoordinate] as [number, number],
          title: trail.name,
          description: trail.location, 
        }));

        setMarkerData(markers);
      } catch (error) {
        setError("Failed to load map data");
      } finally {
        setLoading(false);
      }
    }

    fetchTrails();
  }, []);

  if (loading) {
    return <div>Loading map...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

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
