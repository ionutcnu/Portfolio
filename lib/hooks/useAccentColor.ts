"use client"

import { useState, useEffect } from "react";

export type AccentColor = "blue" | "purple" | "pink" | "green" | "orange" | "red";

const accentColors: Record<AccentColor, string> = {
  blue: "217 92% 76%",
  purple: "267 84% 81%",
  pink: "316 73% 69%",
  green: "115 54% 76%",
  orange: "22 99% 52%",
  red: "343 81% 75%",
};

export function useAccentColor() {
  const [accentColor, setAccentColorState] = useState<AccentColor>("blue");
  const [mounted, setMounted] = useState(false);

  // Load accent color from localStorage on mount
  useEffect(() => {
    setMounted(true);
    try {
      const stored = localStorage.getItem("accent-color") as AccentColor;
      if (stored && accentColors[stored]) {
        setAccentColorState(stored);
        updateCSSVariable(accentColors[stored]);
      }
    } catch (error) {
      // localStorage unavailable (private browsing, etc.) - use default color
      console.warn('Failed to load accent color from localStorage:', error);
    }
  }, []);

  // Update CSS variable in document root
  const updateCSSVariable = (value: string) => {
    document.documentElement.style.setProperty("--accent-dynamic", value);
  };

  // Set accent color and persist to localStorage
  const setAccentColor = (color: AccentColor) => {
    setAccentColorState(color);
    try {
      localStorage.setItem("accent-color", color);
    } catch (error) {
      // localStorage unavailable (private browsing, etc.) - color still applies in memory
      console.warn('Failed to save accent color to localStorage:', error);
    }
    updateCSSVariable(accentColors[color]);
  };

  return {
    accentColor,
    setAccentColor,
    accentColors,
    mounted,
  };
}
