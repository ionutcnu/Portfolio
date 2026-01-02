"use client"

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Code, Star, GitCommit } from "lucide-react";
import { BentoBox } from "./BentoGrid";

interface GitHubStats {
  repositories: number;
  stars: number;
  commitsLast7Days: number;
  followers: number;
}

export default function StatsWidget() {
  const [stats, setStats] = useState<GitHubStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch('/api/github/stats');
        const data = await response.json();
        setStats(data);
      } catch (error) {
        console.error('Failed to fetch GitHub stats:', error);
        // Use fallback data
        setStats({
          repositories: 12,
          stars: 45,
          commitsLast7Days: 15,
          followers: 20,
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, []);

  const statItems = stats ? [
    {
      icon: Code,
      value: stats.repositories.toString(),
      label: "Repositories",
    },
    {
      icon: Star,
      value: stats.stars.toString(),
      label: "GitHub Stars",
    },
    {
      icon: GitCommit,
      value: stats.commitsLast7Days.toString(),
      label: "Commits (7d)",
    },
  ] : [];

  return (
    <BentoBox>
      <h3 className="mb-1.5 text-sm font-semibold text-foreground">
        GitHub Stats
      </h3>
      <div className="space-y-1.5">
        {isLoading ? (
          // Loading skeleton
          Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className="flex items-center gap-2 rounded-lg bg-accent-dynamic/5 p-1.5"
            >
              <div className="h-7 w-7 flex-shrink-0 rounded-md bg-accent-dynamic/10 animate-pulse" />
              <div className="flex-1 space-y-1">
                <div className="h-4 w-12 bg-accent-dynamic/10 rounded animate-pulse" />
                <div className="h-3 w-16 bg-accent-dynamic/10 rounded animate-pulse" />
              </div>
            </div>
          ))
        ) : (
          statItems.map((stat, index) => {
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
          })
        )}
      </div>
    </BentoBox>
  );
}
