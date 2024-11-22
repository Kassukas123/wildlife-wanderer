import React from "react";
import { Marker, Popup } from "react-leaflet";
import L from "leaflet";

interface MarkerProps {
  position: [number, number];
  title: string;
  description: string;
}

export default function MarkerComponent({
  position,
  title,
  description,
}: MarkerProps) {
  const customIcon = L.divIcon({
    className: "custom-icon",
    html: '<div class="w-4 h-4 bg-red-500 rounded-full border-2 border-white shadow-lg"></div>',
    iconSize: [20, 20],
    iconAnchor: [10, 10],
  });

  return (
    <Marker position={position} icon={customIcon}>
      <Popup>
        <h3>{title}</h3>
        <p>{description}</p>
      </Popup>
    </Marker>
  );
}
