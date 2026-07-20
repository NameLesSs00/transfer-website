"use client";

import React, { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix for default Leaflet icon paths in Next.js
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

interface LocationCoords {
  name: string;
  lat: number;
  lng: number;
}

interface RouteMapProps {
  origin: LocationCoords | null;
  destination: LocationCoords | null;
}

// Helper component to auto-zoom/fit bounds when origin/destination changes
function MapBoundsUpdater({ origin, destination }: RouteMapProps) {
  const map = useMap();

  useEffect(() => {
    if (origin && destination) {
      const bounds = L.latLngBounds(
        [origin.lat, origin.lng],
        [destination.lat, destination.lng]
      );
      // Pad bounds to give some breathing room around markers
      map.fitBounds(bounds, { padding: [50, 50], maxZoom: 14 });
    } else if (origin) {
      map.setView([origin.lat, origin.lng], 13);
    } else if (destination) {
      map.setView([destination.lat, destination.lng], 13);
    }
  }, [origin, destination, map]);

  return null;
}

export default function RouteMap({ origin, destination }: RouteMapProps) {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    // Delay mounting to bypass React 19 StrictMode double-mount issues with Leaflet DOM attachment
    const timer = setTimeout(() => setMounted(true), 50);
    return () => clearTimeout(timer);
  }, []);

  // Default center if no route is selected (e.g. Red Sea / Hurghada coordinates)
  const defaultCenter: [number, number] = [27.2579, 33.8116];

  if (!mounted) {
    return (
      <div className="w-full h-full min-h-[400px] flex items-center justify-center bg-gray-50 rounded-2xl border border-gray-200">
        <div className="w-8 h-8 animate-spin rounded-full border-4 border-transfer-green border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="w-full h-full min-h-[400px] rounded-2xl overflow-hidden shadow-xl border border-gray-200">
      <MapContainer
        center={origin ? [origin.lat, origin.lng] : defaultCenter}
        zoom={origin ? 10 : 8}
        style={{ height: "100%", width: "100%", zIndex: 10 }}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {origin && (
          <Marker position={[origin.lat, origin.lng]}>
            <Popup>
              <strong>Origin:</strong> <br /> {origin.name}
            </Popup>
          </Marker>
        )}

        {destination && (
          <Marker position={[destination.lat, destination.lng]}>
            <Popup>
              <strong>Destination:</strong> <br /> {destination.name}
            </Popup>
          </Marker>
        )}

        {origin && destination && (
          <Polyline
            positions={[
              [origin.lat, origin.lng],
              [destination.lat, destination.lng],
            ]}
            pathOptions={{ color: "#00b998", weight: 4, dashArray: "10, 10" }}
          />
        )}

        <MapBoundsUpdater origin={origin} destination={destination} />
      </MapContainer>
    </div>
  );
}
