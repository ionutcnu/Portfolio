"use client"

import { useState, useEffect } from "react";
import { MapPin, Clock, Sun, Moon } from "lucide-react";
import { BentoBox } from "./BentoGrid";
import dynamic from "next/dynamic";

// Dynamic import to avoid SSR issues with Leaflet
const LocationMap = dynamic(() => import("./LocationMap"), {
  ssr: false,
  loading: () => (
    <div className="h-32 w-full rounded-lg bg-muted animate-pulse flex items-center justify-center">
      <MapPin className="h-8 w-8 text-muted-foreground/50" />
    </div>
  ),
});

export default function LocationMapWidget() {
  const [time, setTime] = useState('');
  const [isDaytime, setIsDaytime] = useState(true);
  const timezone = 'Europe/Bucharest';
  const location = 'Pitești, Romania';
  const utcOffset = 'UTC+2';

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();

      // Get time in Bucharest timezone
      const timeString = now.toLocaleTimeString('en-US', {
        timeZone: timezone,
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      });

      setTime(timeString);

      // Determine if it's daytime (6 AM - 9 PM)
      const hour = parseInt(
        now.toLocaleTimeString('en-US', {
          timeZone: timezone,
          hour: '2-digit',
          hour12: false,
        })
      );
      setIsDaytime(hour >= 6 && hour < 21);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <BentoBox span={1}>
      <h3 className="mb-1.5 flex items-center gap-1.5 text-sm font-semibold">
        <MapPin size={14} className="text-accent-dynamic" />
        Currently Based In 📍
      </h3>

      <LocationMap />

      <div className="mt-1.5 flex items-center justify-between text-xs">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="text-muted-foreground hover:text-accent-dynamic cursor-pointer whitespace-nowrap transition-colors text-left"
        >
          {location}
        </button>
        <div className="flex items-center gap-1">
          {isDaytime ? (
            <Sun size={12} className="text-yellow-500" />
          ) : (
            <Moon size={12} className="text-blue-400" />
          )}
          <span className="font-mono text-accent-dynamic font-medium text-[11px]">{time}</span>
        </div>
      </div>
    </BentoBox>
  );
}
