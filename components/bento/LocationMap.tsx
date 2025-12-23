"use client"

import { useEffect, useRef } from "react";
import L from "leaflet";

interface LocationMapProps {
  onRecenter?: () => void;
}

export default function LocationMap({ onRecenter }: LocationMapProps) {
  const mapRef = useRef<L.Map | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only initialize if we haven't already and container exists
    if (mapRef.current || !containerRef.current) return;

    // Pitești, Romania coordinates
    const position: [number, number] = [44.8565, 24.8692];

    // Create map instance
    const map = L.map(containerRef.current, {
      center: position,
      zoom: 11,
      zoomControl: false,
      attributionControl: true,
      scrollWheelZoom: true,
      dragging: true,
      touchZoom: true,
      doubleClickZoom: true,
      boxZoom: true,
      keyboard: true,
    });

    // Add dark tile layer - using exact nyx format with {r} for retina
    L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", {
      maxZoom: 19,
      attribution: "© <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors, © <a href='https://carto.com/attributions'>CARTO</a>",
      subdomains: ['a', 'b', 'c', 'd'],
      keepBuffer: 4,
      updateWhenIdle: false,
      updateWhenZooming: false,
    }).addTo(map);

    // Add custom pin marker
    const customIcon = L.divIcon({
      className: 'custom-map-marker',
      html: `<div style="
        width: 24px;
        height: 24px;
        background: hsl(var(--accent-dynamic));
        border: 2px solid hsl(var(--background));
        border-radius: 50% 50% 50% 0;
        transform: rotate(-45deg);
        box-shadow: 0 2px 4px rgba(0,0,0,0.3);
      ">
        <div style="
          width: 8px;
          height: 8px;
          background: hsl(var(--background));
          border-radius: 50%;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        "></div>
      </div>`,
      iconSize: [24, 24],
      iconAnchor: [12, 24],
    });

    L.marker(position, { icon: customIcon }).addTo(map);

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
      className="h-32 w-full rounded-lg bg-background"
      style={{ height: "128px", width: "100%" }}
    />
  );
}
