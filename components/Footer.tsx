"use client"

import { useState, useEffect } from "react";
import { Github, Linkedin, Twitter, Instagram } from "lucide-react";
import Link from "next/link";

const Footer = () => {
  const [currentTime, setCurrentTime] = useState("");
  const [globalClicks, setGlobalClicks] = useState(0);
  const [commitHash, setCommitHash] = useState("loading...");
  const [servicesStatus, setServicesStatus] = useState<"operational" | "degraded" | "down">("operational");

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
    <div className="relative m-auto mx-5 mb-5">
      {/* Raised webring section */}
      <div className="relative">
        <div className="absolute -top-10 right-5 md:right-8 z-10 flex items-center rounded-t-lg border-t border-r border-l border-[#313244]/20 bg-[#11111b] px-4 py-2 shadow-sm">
          <div className="flex items-center gap-x-1 text-xs md:text-sm text-muted-foreground whitespace-nowrap">
            <span className="text-foreground/60">Webrings:</span>
            <span className="font-mono text-accent">dev</span>
            <span className="text-xs leading-none opacity-75">
              <span className="opacity-40">{'{'}</span>
              <a href="#" className="text-accent hover:text-accent/80 px-0.5 align-top transition-colors">{'<'}</a>
              <span className="text-accent opacity-40">|</span>
              <a href="#" className="text-accent hover:text-accent/80 px-0.5 align-top transition-colors">{'>'}</a>
              <span className="opacity-40">{'}'}</span>
            </span>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <footer className="bg-[#11111b] text-[#a6adc8] border border-[#313244]/20 flex h-auto flex-col md:flex-row items-center justify-center md:justify-between gap-y-3 md:gap-y-0 rounded-lg p-5 text-sm">
        {/* Left Section */}
        <div className="flex flex-wrap items-center justify-center md:justify-start gap-x-3 gap-y-2">
          <span className="whitespace-nowrap">© {new Date().getFullYear()} Ionut Cioncu</span>

          <span className="hidden md:inline text-border">-</span>

          <div className="flex items-center gap-1 whitespace-nowrap" title="Service Status">
            <span className="relative mr-1.5 flex h-3 w-3">
              <span className={`absolute inline-flex h-full w-full animate-ping rounded-full ${statusColors[servicesStatus]}/75`}></span>
              <span className={`relative inline-flex h-3 w-3 rounded-full ${statusColors[servicesStatus]}`}></span>
            </span>
            <span className="text-sm font-medium">{statusTexts[servicesStatus]}</span>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex flex-wrap items-center justify-center md:justify-end gap-x-3 gap-y-2">
          {/* Clock */}
          <div className="flex items-center gap-1.5" title="Time on site">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
              <circle cx="12" cy="12" r="10"/>
              <path d="M12 6v6l4 2"/>
            </svg>
            <span className="font-mono text-xs text-accent">{currentTime}</span>
          </div>

          <span className="hidden sm:inline text-border">-</span>

          {/* View Counter */}
          <span className="hover:text-accent transition-colors cursor-pointer" title="View Analytics">
            {globalClicks.toLocaleString()} views
          </span>

          <span className="hidden sm:inline text-border">-</span>

          {/* Commit Hash */}
          <div className="flex items-center gap-x-1 hover:text-accent transition-colors" title={`Deployment commit (${commitHash})`}>
            <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
              <circle cx="12" cy="12" r="3"/>
              <path d="M12 3v6m0 6v6M3 12h6m6 0h6"/>
            </svg>
            <span className="font-mono text-xs">{commitHash}</span>
          </div>

          <span className="hidden sm:inline text-border">-</span>

          {/* Social Links */}
          <div className="flex items-center gap-x-3">
            <Link
              href="https://github.com/ionutcnu"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-accent transition-colors"
              aria-label="GitHub"
            >
              <Github size={18} strokeWidth={1.5} />
            </Link>
            <Link
              href="https://linkedin.com/in/ionut-cioncu"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-accent transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin size={18} strokeWidth={1.5} />
            </Link>
            <Link
              href="https://x.com/ionutcnu"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-accent transition-colors"
              aria-label="X/Twitter"
            >
              <Twitter size={18} strokeWidth={1.5} />
            </Link>
            <Link
              href="https://instagram.com/ionut.cioncu"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-accent transition-colors"
              aria-label="Instagram"
            >
              <Instagram size={18} strokeWidth={1.5} />
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Footer
