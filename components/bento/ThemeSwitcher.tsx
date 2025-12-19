"use client"

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";
import { Sun, Moon } from "lucide-react";
import { BentoBox } from "./BentoGrid";

export default function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <BentoBox>
        <div className="flex h-full items-center justify-center">
          <div className="h-8 w-8 animate-pulse rounded-full bg-muted"></div>
        </div>
      </BentoBox>
    );
  }

  const themes = [
    {
      name: "light",
      icon: Sun,
      label: "Light",
      preview: "bg-gradient-to-br from-slate-100 to-slate-200",
    },
    {
      name: "dark",
      icon: Moon,
      label: "Dark",
      preview: "bg-gradient-to-br from-slate-800 to-slate-900",
    },
  ];

  return (
    <BentoBox>
      <h3 className="mb-3 text-sm font-semibold">Theme</h3>
      <div className="grid grid-cols-2 gap-2">
        {themes.map((themeOption) => {
          const Icon = themeOption.icon;
          const isActive = theme === themeOption.name;

          return (
            <motion.button
              key={themeOption.name}
              onClick={() => setTheme(themeOption.name)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`
                relative flex flex-col items-center gap-2 rounded-lg border-2 p-3 transition-all duration-300
                ${
                  isActive
                    ? "border-accent-dynamic bg-accent-dynamic/5 shadow-md"
                    : "border-border bg-card hover:border-accent-dynamic/50 hover:bg-muted/50"
                }
              `}
            >
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-full ${themeOption.preview}`}
              >
                <Icon
                  size={18}
                  className={isActive ? "text-accent-dynamic" : "text-foreground/70"}
                />
              </div>
              <span
                className={`text-xs font-medium ${
                  isActive ? "text-accent-dynamic" : "text-muted-foreground"
                }`}
              >
                {themeOption.label}
              </span>
              {isActive && (
                <motion.div
                  layoutId="activeTheme"
                  className="absolute inset-0 rounded-lg border-2 border-accent-dynamic"
                  initial={false}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </motion.button>
          );
        })}
      </div>
    </BentoBox>
  );
}
