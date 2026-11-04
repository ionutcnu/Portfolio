"use client";

import { useEffect } from "react";

// Shared across layout mounts and Strict Mode effect replays in this page session.
let tracking: Promise<unknown> | undefined;
export default function VisitorTracker() {
  useEffect(() => {
    if (tracking) return;
    let sessionId = `temp-${Date.now()}-${Math.random().toString(36).slice(2)}`;
    try {
      sessionId = localStorage.getItem("analytics-session-id") || sessionId;
      localStorage.setItem("analytics-session-id", sessionId);
    } catch {
      /* Tracking still works when storage is unavailable. */
    }
    tracking = fetch("/api/visitors/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sessionId }),
    }).catch(() => undefined);
  }, []);
  return null;
}
