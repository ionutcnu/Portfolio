"use client"

import { motion } from "framer-motion";
import { Palette } from "lucide-react";
import { BentoBox } from "./BentoGrid";
import { useAccentColor, type AccentColor } from "@/lib/hooks/useAccentColor";

export default function AccentColorPicker() {
  const { accentColor, setAccentColor, accentColors, mounted } = useAccentColor();

  if (!mounted) {
    return (
      <BentoBox span={2}>
        <div className="flex h-full items-center justify-center">
          <div className="h-8 w-full animate-pulse rounded-full bg-muted"></div>
        </div>
      </BentoBox>
    );
  }

  const colorLabels: Record<AccentColor, string> = {
    blue: "Blue",
    purple: "Purple",
    pink: "Pink",
    green: "Green",
    orange: "Orange",
    red: "Red",
  };

  return (
    <BentoBox span={2}>
      <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold">
        <Palette size={16} className="text-accent-dynamic" />
        Accent Color
      </h3>
      <div className="grid grid-cols-6 gap-2">
        {(Object.keys(accentColors) as AccentColor[]).map((color) => {
          const isActive = accentColor === color;
          const hslValue = accentColors[color];

          return (
            <motion.button
              key={color}
              onClick={() => setAccentColor(color)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="group relative flex items-center justify-center"
              aria-label={`Select ${colorLabels[color]} accent color`}
              role="radio"
              aria-checked={isActive}
            >
              <div
                className={`
                  h-10 w-10 rounded-full transition-all duration-300
                  ${isActive ? "ring-2 ring-offset-2 ring-offset-background" : "hover:ring-1 hover:ring-offset-2 hover:ring-offset-background hover:ring-foreground/20"}
                `}
                style={{
                  backgroundColor: `hsl(${hslValue})`,
                  ...(isActive && {
                    boxShadow: `0 0 0 2px hsl(var(--background)), 0 0 0 4px hsl(${hslValue})`,
                  }),
                }}
              />
              <span className="sr-only">{colorLabels[color]}</span>
            </motion.button>
          );
        })}
      </div>
      <p className="mt-3 text-xs text-muted-foreground">
        Selected: <span className="font-medium text-foreground">{colorLabels[accentColor]}</span>
      </p>
    </BentoBox>
  );
}
