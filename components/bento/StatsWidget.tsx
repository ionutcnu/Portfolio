"use client"

import { motion } from "framer-motion";
import { Code, Layers, Sparkles } from "lucide-react";
import { BentoBox } from "./BentoGrid";

export default function StatsWidget() {
  const stats = [
    {
      icon: Code,
      value: "4",
      label: "Projects",
    },
    {
      icon: Layers,
      value: "37+",
      label: "Technologies",
    },
    {
      icon: Sparkles,
      value: "3",
      label: "Languages",
    },
  ];

  return (
    <BentoBox>
      <h3 className="mb-1.5 text-sm font-semibold text-foreground">Quick Stats</h3>
      <div className="space-y-1.5">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="flex items-center gap-2 rounded-lg bg-accent-dynamic/5 p-1.5 transition-colors duration-200 hover:bg-accent-dynamic/10"
            >
              <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-md bg-accent-dynamic/10">
                <Icon size={14} className="text-accent-dynamic" />
              </div>
              <div className="flex-1">
                <div className="text-lg font-bold text-foreground">{stat.value}</div>
                <div className="text-[10px] text-muted-foreground">{stat.label}</div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </BentoBox>
  );
}
