"use client";

import { useEffect } from "react";

// Shared across layout mounts and Strict Mode effect replays in this page session.
let tracking: Promise<unknown> | undefined;

// Retries once on a failed request so a cold start or transient network error
// does not silently drop the visit for the whole page session.
function postVisit(sessionId: string, retriesLeft: number): Promise<unknown> {
  return fetch("/api/visitors/track", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ sessionId }),
  })
    .then((response) => {
      if (response.ok) return;
      throw new Error(`Visitor tracking failed with ${response.status}`);
    })
    .catch((error) => {
      if (retriesLeft <= 0) throw error;
      return new Promise<void>((resolve) => {
        setTimeout(() => resolve(), 2000);
      }).then(() => postVisit(sessionId, retriesLeft - 1));
    });
}

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
    tracking = postVisit(sessionId, 2).catch(() => undefined);
  }, []);
  return null;
}
