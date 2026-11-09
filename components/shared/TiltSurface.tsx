"use client";

import { type ReactNode, useRef } from "react";

export default function TiltSurface({
  children,
  className,
  enabled = true,
}: {
  children: ReactNode;
  className: string;
  enabled?: boolean;
}) {
  const bounds = useRef<DOMRect | null>(null);
  return (
    <div
      className={`${className}${enabled ? " project-tilt" : ""}`}
      onPointerEnter={(event) => {
        bounds.current = event.currentTarget.getBoundingClientRect();
      }}
      onPointerMove={(event) => {
        if (
          !enabled ||
          event.pointerType !== "mouse" ||
          !bounds.current ||
          !window.matchMedia(
            "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
          ).matches
        )
          return;
        const rect = bounds.current;
        const x = Math.max(0, Math.min(1, (event.clientX - rect.left) / rect.width));
        const y = Math.max(0, Math.min(1, (event.clientY - rect.top) / rect.height));
        event.currentTarget.style.setProperty("--tilt-x", `${(0.5 - y) * 6}deg`);
        event.currentTarget.style.setProperty("--tilt-y", `${(x - 0.5) * 6}deg`);
        event.currentTarget.style.setProperty("--shine-x", `${x * 100}%`);
        event.currentTarget.style.setProperty("--shine-y", `${y * 100}%`);
      }}
      onPointerLeave={(event) => {
        bounds.current = null;
        event.currentTarget.style.removeProperty("--tilt-x");
        event.currentTarget.style.removeProperty("--tilt-y");
      }}
    >
      {children}
    </div>
  );
}
