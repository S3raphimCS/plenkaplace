'use client';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import React from 'react';

const customIcon = L.icon({
  iconUrl: '/map/marker.png',
  iconSize: [24, 24],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

export const MapSection: React.FC = () => {
  const center: [number, number] = [43.121026, 131.901653];

  return (
    <>
      <MapContainer
        center={center}
        zoom={13}
        attributionControl={false}
        zoomControl={false}
        className="h-full w-full"
        style={{ zIndex: 1 }}
      >
        <TileLayer
          zIndex={1}
          attribution={'PlenkaPalace'}
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={center} icon={customIcon}>
          <Popup>Владивосток, ул. Гоголя 19</Popup>
        </Marker>
      </MapContainer>
    </>
  );
};
