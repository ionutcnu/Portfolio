"use client"

import { useState, useEffect } from "react";
import { Github, Linkedin } from "lucide-react";
import Link from "next/link";

interface VisitorStats {
  total: number;
  today: number;
}

const Footer = () => {
  const [currentTime, setCurrentTime] = useState("");
  const [globalClicks, setGlobalClicks] = useState(0);
  const [servicesStatus, setServicesStatus] = useState<"operational" | "degraded" | "down">("operational");
  const [visitors, setVisitors] = useState<VisitorStats>({ total: 0, today: 0 });

  // Update clock every second
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString('en-US', { hour12: false }));
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

  // Track visitor and fetch stats
  useEffect(() => {
    const trackAndFetch = async () => {
      // Get or create session ID
      let sessionId = localStorage.getItem('analytics-session-id');
      if (!sessionId) {
        sessionId = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
        localStorage.setItem('analytics-session-id', sessionId);
      }

      // Track this visitor
      try {
        await fetch('/api/visitors/track', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ sessionId }),
        });
      } catch (error) {
        console.error('Failed to track visitor:', error);
      }

      // Fetch visitor stats
      try {
        const response = await fetch('/api/visitors/stats');
        const data = await response.json() as VisitorStats;
        setVisitors(data);
      } catch (error) {
        console.error('Failed to fetch visitor stats:', error);
      }
    };

    trackAndFetch();
    const interval = setInterval(trackAndFetch, 60000); // Update every minute
    return () => clearInterval(interval);
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
    <div className="relative m-auto mx-3 md:mx-5 mb-5">
      {/* Main footer */}
      <footer className="bg-[#11111b] text-[#a6adc8] border border-[#313244]/20 flex h-auto flex-col md:flex-row items-center justify-center md:justify-between gap-y-3 md:gap-y-0 rounded-lg p-3 md:p-5 text-xs md:text-sm">
        {/* Left Section */}
        <div className="flex flex-wrap items-center justify-center md:justify-start gap-x-3 gap-y-2 text-center md:text-left">
          <span className="max-w-full">
            © {new Date().getFullYear()} Ionut Cioncu 
          </span>

          <span className="hidden md:inline text-border">-</span>

          <div className="flex items-center gap-1 whitespace-nowrap" title="Service Status">
            <span className="relative mr-1.5 flex h-3 w-3">
              <span className={`absolute inline-flex h-full w-full animate-ping rounded-full ${statusColors[servicesStatus]}/75`}></span>
              <span className={`relative inline-flex h-3 w-3 rounded-full ${statusColors[servicesStatus]}`}></span>
            </span>
            <span className="text-xs md:text-sm font-medium">{statusTexts[servicesStatus]}</span>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex flex-wrap items-center justify-center md:justify-end gap-x-2 md:gap-x-3 gap-y-2 text-xs">
          {/* Clock */}
          <div className="flex items-center gap-1.5" title="Current time">
            <svg className="w-3 h-3 md:w-3.5 md:h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
              <circle cx="12" cy="12" r="10"/>
              <path d="M12 6v6l4 2"/>
            </svg>
            <span className="font-mono text-accent">{currentTime}</span>
          </div>

          <span className="hidden sm:inline text-border">-</span>

          {/* Visitor Counter */}
          <span className="hover:text-accent transition-colors cursor-pointer" title={`${visitors?.today || 0} visitors today`}>
            Visitor #{(visitors?.total || 0).toLocaleString()}
          </span>

          <span className="hidden sm:inline text-border">-</span>

          {/* View Counter */}
          <span className="hover:text-accent transition-colors cursor-pointer" title="Total clicks">
            {globalClicks.toLocaleString()} views
          </span>

          <span className="hidden sm:inline text-border">-</span>

          {/* Social Links */}
          <div className="flex items-center gap-x-2 md:gap-x-3">
            <Link
              href="https://github.com/ionutcnu"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-accent transition-colors"
              aria-label="GitHub"
            >
              <Github size={16} className="md:w-[18px] md:h-[18px]" strokeWidth={1.5} />
            </Link>
            <Link
              href="https://linkedin.com/in/cioncu"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-accent transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin size={16} className="md:w-[18px] md:h-[18px]" strokeWidth={1.5} />
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Footer
