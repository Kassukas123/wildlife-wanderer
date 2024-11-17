'use client'

import 'leaflet/dist/leaflet.css'
import { MapContainer, TileLayer } from 'react-leaflet'
import { useState } from 'react'

export function MapComponent() {
    const [coord] = useState<[number, number]>([51.505, -0.09]) 

    return (
        <div style={{ height: '100vh', width: '100vw' }}>
            <MapContainer 
                style={{
                    height: '100%',
                    width: '100%',
                }} 
                center={coord} 
                zoom={13} 
                scrollWheelZoom={false}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
            </MapContainer>
        </div>
    )
}