'use client';

import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer } from "react-leaflet";
import { useEffect, useState } from "react";
import { FilterComponent } from "./FilterComponent";
import MarkerComponent from "./MarkerComponent";
import { Trail } from "@/types/trail"; 

export function MapComponent() {
  const [trails, setTrails] = useState<Trail[]>([]);
  const [filteredTrails, setFilteredTrails] = useState<Trail[]>([]);
  const [filters, setFilters] = useState({
    parking: null as boolean | null,
    camping: null as boolean | null,
    campfire: null as boolean | null,
    length: null as string | null,
    type: null as string | null,
    accessibility: null as string | null,
  });

  const [tempFilters, setTempFilters] = useState(filters);
  const [coord] = useState<[number, number]>([58.5857, 25.5577]);

  useEffect(() => {
    async function fetchTrails() {
      try {
        const response = await fetch("/api/trails");
        if (!response.ok) throw new Error("Failed to fetch trails");
        const data: Trail[] = await response.json();
        setTrails(data);
        setFilteredTrails(data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchTrails();
  }, []);

  const handleApplyFilters = () => {
    const filtered = trails.filter((trail) => {
      const lengthCheck =
        tempFilters.length === null ||
        (tempFilters.length === "0-2" && trail.length >= 0 && trail.length <= 2) ||
        (tempFilters.length === "2-5" && trail.length > 2 && trail.length <= 5) ||
        (tempFilters.length === "5-10" && trail.length > 5 && trail.length <= 10) ||
        (tempFilters.length === "10+" && trail.length > 10);

      return (
        (tempFilters.parking === null || trail.parking === tempFilters.parking) &&
        (tempFilters.camping === null || trail.camping === tempFilters.camping) &&
        (tempFilters.campfire === null || trail.campfire === tempFilters.campfire) &&
        (tempFilters.type === null || trail.type === tempFilters.type) &&
        (tempFilters.accessibility === null || trail.accessibility === tempFilters.accessibility) &&
        lengthCheck
      ); 
    });
    setFilteredTrails(filtered); 
    setFilters(tempFilters); 
  };

  return (
    <div className="flex h-full w-full">
      <FilterComponent 
        filters={tempFilters} 
        onFilterChange={setTempFilters} 
        onApplyFilters={handleApplyFilters} 
      />

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

          {filteredTrails.map((trail) => (
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
