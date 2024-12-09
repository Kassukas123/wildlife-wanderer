'use client';

import dynamic from "next/dynamic";

const MapComponent = dynamic(() => import("../../components/map/MapComponent").then(mod => mod.MapComponent), {
    ssr: false,
  });

export default function Map() {
    return (
        <div style={{ width: '100%', height: '100vh', margin: 0, padding: 0 }}>
            <MapComponent />
        </div>
    );
}
