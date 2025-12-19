"use client"

import { useState, useEffect } from "react";
import { MapPin, Clock, Sun, Moon } from "lucide-react";
import { BentoBox } from "./BentoGrid";
import dynamic from "next/dynamic";

// Dynamic import to avoid SSR issues with Leaflet
const LocationMap = dynamic(() => import("./LocationMap"), {
  ssr: false,
  loading: () => (
    <div className="h-48 w-full rounded-lg bg-muted animate-pulse flex items-center justify-center">
      <MapPin className="h-8 w-8 text-muted-foreground/50" />
    </div>
  ),
});

export default function LocationMapWidget() {
  const [time, setTime] = useState('');
  const [isDaytime, setIsDaytime] = useState(true);
  const timezone = 'Europe/Bucharest';
  const location = 'Bucharest, Romania';
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
    <BentoBox span={2}>
      <div className="mb-3 flex items-center justify-between">
        <h3 className="flex items-center gap-2 text-sm font-semibold">
          <MapPin size={16} className="text-[hsl(var(--accent))]" />
          Currently Based In
        </h3>
        <div className="flex items-center gap-1.5 text-xs">
          {isDaytime ? (
            <Sun size={12} className="text-yellow-500" />
          ) : (
            <Moon size={12} className="text-blue-400" />
          )}
          <Clock size={12} className="text-muted-foreground" />
          <span className="font-mono text-foreground font-medium">{time}</span>
        </div>
      </div>

      <LocationMap />

      <div className="mt-3 flex items-center justify-between text-xs">
        <div>
          <p className="text-foreground font-medium">{location}</p>
          <p className="text-muted-foreground">{utcOffset}</p>
        </div>
        <div className="text-right">
          <p className="text-muted-foreground">
            {isDaytime ? 'Daytime' : 'Nighttime'}
          </p>
          <p className="text-[hsl(var(--accent))] text-[10px]">
            Open to remote work
          </p>
        </div>
      </div>
    </BentoBox>
  );
}
