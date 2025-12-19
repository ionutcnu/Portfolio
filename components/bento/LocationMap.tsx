"use client"

import { useEffect, useRef } from "react";
import L from "leaflet";

export default function LocationMap() {
  const mapRef = useRef<L.Map | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only initialize if we haven't already and container exists
    if (mapRef.current || !containerRef.current) return;

    const position: [number, number] = [44.4268, 26.1025];

    // Fix default marker icon paths
    const icon = L.icon({
      iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
      iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
      shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41],
    });

    // Create map instance
    const map = L.map(containerRef.current, {
      center: position,
      zoom: 6,
      zoomControl: false,
      scrollWheelZoom: false,
      dragging: true,
      touchZoom: true,
    });

    // Add tile layer
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map);

    // Add marker with popup
    L.marker(position, { icon })
      .addTo(map)
      .bindPopup(`
        <div style="text-align: center; padding: 4px;">
          <strong style="font-size: 14px;">Bucharest, Romania</strong><br/>
          <span style="font-size: 12px; color: #6b7280;">Open to remote opportunities</span>
        </div>
      `);

    mapRef.current = map;

    // Cleanup on unmount
    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="h-48 w-full rounded-lg"
      style={{ height: "192px", width: "100%" }}
    />
  );
}
