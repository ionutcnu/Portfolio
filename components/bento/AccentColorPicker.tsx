"use client"

import { Palette } from "lucide-react";
import { BentoBox } from "./BentoGrid";
import { useAccentColor, type AccentColor } from "@/lib/hooks/useAccentColor";

export default function AccentColorPicker() {
  const { accentColor, setAccentColor, accentColors, mounted } = useAccentColor();

  const colorNames = Object.keys(accentColors) as AccentColor[];

  if (!mounted) {
    return (
      <BentoBox span={1} className="lg:col-span-1">
        <div className="flex h-full items-center justify-center">
          <div className="h-8 w-full animate-pulse rounded bg-muted"></div>
        </div>
      </BentoBox>
    );
  }

  return (
    <div className="flex flex-col gap-2 rounded-xl border border-gray-700/50 bg-gray-900/80 p-3 shadow-lg backdrop-blur-sm">
      <h3 className="mb-1 flex items-center justify-center gap-1.5 text-xs font-medium text-gray-400">
        <Palette size={14} className="text-accent-dynamic" />
      </h3>
      <div className="flex flex-col gap-2">
        {colorNames.map((colorName) => {
          const isSelected = accentColor === colorName;
          const hslValue = accentColors[colorName];

          return (
            <button
              key={colorName}
              aria-label={`Select ${colorName} accent color`}
              title={colorName.charAt(0).toUpperCase() + colorName.slice(1)}
              onClick={() => setAccentColor(colorName)}
              style={{ backgroundColor: `hsl(${hslValue})` }}
              className={`h-10 w-10 cursor-pointer rounded transition-all duration-150 ${
                isSelected
                  ? "ring-2 ring-accent-dynamic ring-offset-2 ring-offset-gray-900"
                  : "opacity-60 hover:opacity-100 hover:scale-110"
              }`}
            >
              <span className="sr-only">{colorName}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
