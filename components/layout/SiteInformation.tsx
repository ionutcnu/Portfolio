"use client";

import { useEffect, useState } from "react";
import { type ServiceStatus, statusTexts } from "@/lib/constants/status";

export default function SiteInformation({ active = true }: { active?: boolean }) {
  const [currentTime, setCurrentTime] = useState("");
  const [globalClicks, setGlobalClicks] = useState(0);
  const [servicesStatus, setServicesStatus] = useState<ServiceStatus>("operational");
  const [visitors, setVisitors] = useState({ total: 0, today: 0 });

  useEffect(() => {
    if (!active) return;
    let cancelled = false;
    const clock = () => setCurrentTime(new Date().toLocaleTimeString("en-US", { hour12: false }));
    const clicks = async () => {
      try {
        const response = await fetch("/api/clicks");
        if (cancelled) return;
        setServicesStatus(response.ok ? "operational" : "degraded");
        if (response.ok) {
          const data = (await response.json()) as { clicks?: number };
          if (!cancelled) setGlobalClicks(data.clicks || 0);
        }
      } catch {
        if (!cancelled) setServicesStatus("down");
      }
    };
    const visitorStats = async () => {
      try {
        const response = await fetch("/api/visitors/stats");
        if (!response.ok) return;
        const data = (await response.json()) as { total: number; today: number };
        if (!cancelled) setVisitors(data);
      } catch {
        /* Keep the last available visitor totals. */
      }
    };
    clock();
    void clicks();
    void visitorStats();
    const clockTimer = setInterval(clock, 1000);
    const clicksTimer = setInterval(clicks, 10000);
    const visitorsTimer = setInterval(visitorStats, 60000);
    return () => {
      cancelled = true;
      clearInterval(clockTimer);
      clearInterval(clicksTimer);
      clearInterval(visitorsTimer);
    };
  }, [active]);

  return (
    <dl className="grid grid-cols-2 gap-6 text-sm md:grid-cols-4">
      <div>
        <dt className="mb-2 text-xs text-muted-foreground">Service status</dt>
        <dd>{statusTexts[servicesStatus]}</dd>
      </div>
      <div>
        <dt className="mb-2 text-xs text-muted-foreground">Current time</dt>
        <dd className="tabular-nums">{currentTime || "--:--:--"}</dd>
      </div>
      <div>
        <dt className="mb-2 text-xs text-muted-foreground">Visitors</dt>
        <dd>
          {(visitors?.total || 0).toLocaleString()}{" "}
          <span className="text-xs text-muted-foreground">({visitors?.today || 0} today)</span>
        </dd>
      </div>
      <div>
        <dt className="mb-2 text-xs text-muted-foreground">Total clicks</dt>
        <dd>{globalClicks.toLocaleString()}</dd>
      </div>
    </dl>
  );
}
