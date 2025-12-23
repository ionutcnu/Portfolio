"use client"

import { useState, useEffect } from "react";
import { Github, Linkedin, Twitter, Instagram, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

export default function StatusFooter() {
  const [currentTime, setCurrentTime] = useState("");
  const [uptime, setUptime] = useState("");
  const [globalClicks, setGlobalClicks] = useState(0);
  const [commitHash, setCommitHash] = useState("loading...");
  const [servicesStatus, setServicesStatus] = useState<"operational" | "degraded" | "down">("operational");

  // Update clock every second
  useEffect(() => {
    const startTime = Date.now();

    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString('en-US', { hour12: false }));

      // Calculate uptime (time since page load)
      const elapsed = Math.floor((Date.now() - startTime) / 1000);
      const hours = Math.floor(elapsed / 3600);
      const minutes = Math.floor((elapsed % 3600) / 60);
      const seconds = elapsed % 60;
      setUptime(`${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Fetch global clicks
  useEffect(() => {
    const fetchClicks = async () => {
      try {
        const response = await fetch('/api/clicks/increment');
        const data = await response.json() as { clicks?: number };
        setGlobalClicks(data.clicks || 0);
      } catch (error) {
        console.error('Failed to fetch clicks:', error);
      }
    };

    fetchClicks();
    const interval = setInterval(fetchClicks, 10000); // Update every 10s
    return () => clearInterval(interval);
  }, []);

  // Fetch latest commit hash
  useEffect(() => {
    const fetchCommit = async () => {
      try {
        const response = await fetch('/api/github/commits');
        const data = await response.json() as Array<{ commits?: Array<{ sha?: string }> }>;
        if (data[0]?.commits?.[0]?.sha) {
          setCommitHash(data[0].commits[0].sha);
        }
      } catch (error) {
        console.error('Failed to fetch commit:', error);
        setCommitHash('unknown');
      }
    };

    fetchCommit();
  }, []);

  // Check service status
  useEffect(() => {
    const checkStatus = async () => {
      try {
        const response = await fetch('/api/clicks/increment');
        setServicesStatus(response.ok ? 'operational' : 'degraded');
      } catch (error) {
        setServicesStatus('down');
      }
    };

    checkStatus();
    const interval = setInterval(checkStatus, 30000); // Check every 30s
    return () => clearInterval(interval);
  }, []);

  const statusColors = {
    operational: 'bg-green-500',
    degraded: 'bg-yellow-500',
    down: 'bg-red-500',
  };

  const statusTexts = {
    operational: 'All Services Nominal',
    degraded: 'Degraded Performance',
    down: 'Service Outage',
  };

  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-[hsl(var(--card))] border-t border-[hsl(var(--border))] px-6 py-3 text-xs text-muted-foreground z-50">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        {/* Left Section */}
        <div className="flex items-center gap-4">
          {/* Copyright */}
          <span className="hidden sm:inline">© 2025 Ionut Cioncu</span>

          {/* Service Status */}
          <div className="flex items-center gap-2">
            <div className={`h-2 w-2 rounded-full ${statusColors[servicesStatus]} animate-pulse`} />
            <span className="hidden md:inline">{statusTexts[servicesStatus]}</span>
          </div>
        </div>

        {/* Center Section */}
        <div className="flex items-center gap-4">
          {/* Live Clock */}
          <div className="flex items-center gap-2">
            <span className="hidden sm:inline">⏰</span>
            <span className="font-mono">{currentTime}</span>
          </div>

          {/* Uptime */}
          <div className="flex items-center gap-2 hidden lg:flex">
            <span>Uptime:</span>
            <span className="font-mono">{uptime}</span>
          </div>

          {/* View Counter */}
          <div className="flex items-center gap-2">
            <span>{globalClicks.toLocaleString()} views</span>
          </div>

          {/* Commit Hash */}
          <div className="hidden md:flex items-center gap-2">
            <span className="font-mono text-[hsl(var(--accent))]">{commitHash}</span>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-3">
          {/* Social Links */}
          <Link
            href="https://github.com/ionutcnu"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground transition-colors"
            aria-label="GitHub"
          >
            <Github size={16} />
          </Link>
          <Link
            href="https://linkedin.com/in/ionut-cioncu"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground transition-colors"
            aria-label="LinkedIn"
          >
            <Linkedin size={16} />
          </Link>
          <Link
            href="https://x.com/ionutcnu"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground transition-colors"
            aria-label="X/Twitter"
          >
            <Twitter size={16} />
          </Link>
          <Link
            href="https://instagram.com/ionut.cioncu"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground transition-colors"
            aria-label="Instagram"
          >
            <Instagram size={16} />
          </Link>

          {/* Webring Navigation (Optional) */}
          <div className="hidden xl:flex items-center gap-1 ml-2 pl-2 border-l border-border">
            <span className="text-[10px] uppercase tracking-wider">Webrings:</span>
            <span className="font-mono">dev</span>
            <button
              className="hover:text-foreground transition-colors"
              aria-label="Previous webring"
            >
              <ChevronLeft size={14} />
            </button>
            <button
              className="hover:text-foreground transition-colors"
              aria-label="Next webring"
            >
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
