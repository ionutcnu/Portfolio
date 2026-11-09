"use client";

import { useSyncExternalStore } from "react";

export type PortfolioSection = "about" | "projects" | "testimonials" | "extras";
let current: PortfolioSection = "about";
const listeners = new Set<() => void>();
const subscribe = (listener: () => void) => {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
};

export function selectPortfolioSection(section: PortfolioSection) {
  if (current === section) return;
  current = section;
  listeners.forEach((listener) => listener());
  window.dispatchEvent(new Event("portfolio:section-change"));
}

export function usePortfolioSection() {
  return useSyncExternalStore(
    subscribe,
    () => current,
    () => "about" as PortfolioSection,
  );
}
