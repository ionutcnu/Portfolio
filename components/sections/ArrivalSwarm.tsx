"use client";

import { RotateCcw } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import HiddenDetails from "./HiddenDetails";

type SwarmController = {
  start: () => void;
  stop: (reveal?: boolean) => void;
  readonly app: unknown;
};
declare global {
  interface Window {
    __swarmRebuild?: SwarmController;
  }
}
let enginePromise: Promise<SwarmController> | undefined;

function loadEngine(): Promise<SwarmController> {
  if (window.__swarmRebuild) return Promise.resolve(window.__swarmRebuild);
  if (enginePromise) return enginePromise;
  enginePromise = new Promise<SwarmController>((resolve, reject) => {
    const script = document.createElement("script");
    script.src = "/vendor/swarm-rebuild/swarm.js";
    script.async = true;
    const timeout = window.setTimeout(() => {
      script.remove();
      reject(new Error("Animation load timed out"));
    }, 12000);
    script.onload = () => {
      clearTimeout(timeout);
      if (window.__swarmRebuild) resolve(window.__swarmRebuild);
      else reject(new Error("Animation engine unavailable"));
    };
    script.onerror = () => {
      clearTimeout(timeout);
      script.remove();
      reject(new Error("Animation could not load"));
    };
    document.head.appendChild(script);
  }).catch((error) => {
    enginePromise = undefined;
    throw error;
  });
  return enginePromise;
}

export default function ArrivalSwarm() {
  const pathname = usePathname();
  const [replay, setReplay] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduced.matches) return;
    let cancelled = false;
    let ownsEngine = false;
    const stop = () => {
      cancelled = true;
      if (ownsEngine) window.__swarmRebuild?.stop(false);
      setLoading(false);
    };
    // Exit before keyboard users reach the snapshot's decorative controls.
    const key = (event: KeyboardEvent) => {
      if (event.key === "Tab" || event.key === "Escape") stop();
    };
    const frame = requestAnimationFrame(async () => {
      setLoading(true);
      setError(false);
      try {
        const engine = await loadEngine();
        if (cancelled || reduced.matches) return;
        window.dispatchEvent(new Event("portfolio:rebuild"));
        if (cancelled) return;
        engine.start();
        ownsEngine = true;
      } catch {
        if (!cancelled) setError(true);
      } finally {
        if (!cancelled) setLoading(false);
      }
    });
    window.addEventListener("keydown", key, true);
    window.addEventListener("portfolio:section-change", stop);
    window.addEventListener("popstate", stop);
    window.addEventListener("pagehide", stop);
    reduced.addEventListener("change", stop);
    return () => {
      cancelAnimationFrame(frame);
      stop();
      window.removeEventListener("keydown", key, true);
      window.removeEventListener("portfolio:section-change", stop);
      window.removeEventListener("popstate", stop);
      window.removeEventListener("pagehide", stop);
      reduced.removeEventListener("change", stop);
    };
  }, [pathname, replay]);

  return (
    <div className="arrival-replay" data-swarm-ignore>
      <HiddenDetails />
      {error && <span role="status">Animation unavailable. You can try again.</span>}
      <button
        className="arrival-replay-button"
        disabled={loading}
        onClick={() => {
          window.dispatchEvent(new Event("portfolio:rebuild"));
          window.__swarmRebuild?.stop(false);
          window.scrollTo({ top: 0, behavior: "instant" });
          setReplay((value) => value + 1);
        }}
      >
        <RotateCcw size={13} aria-hidden="true" />
        {loading ? "Loading animation..." : "Replay intro"}
      </button>
    </div>
  );
}
