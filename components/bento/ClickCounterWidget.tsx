"use client"

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { MousePointer2, Sparkles } from "lucide-react";
import { BentoBox } from "./BentoGrid";

export default function ClickCounterWidget() {
  const [globalClicks, setGlobalClicks] = useState(750362);
  const [localClicks, setLocalClicks] = useState(0);
  const [isConnected, setIsConnected] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);

  useEffect(() => {
    // Load local clicks from localStorage
    const savedClicks = localStorage.getItem('local-clicks');
    if (savedClicks) {
      setLocalClicks(parseInt(savedClicks, 10));
    }

    // Connect to SSE endpoint
    const eventSource = new EventSource('/api/clicks');

    eventSource.onopen = () => {
      setIsConnected(true);
    };

    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setGlobalClicks(data.clicks);
    };

    eventSource.onerror = () => {
      setIsConnected(false);
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, []);

  const handleClick = async () => {
    // Increment local counter
    const newLocalClicks = localClicks + 1;
    setLocalClicks(newLocalClicks);
    localStorage.setItem('local-clicks', newLocalClicks.toString());

    // Show sparkle animation
    setShowSparkle(true);
    setTimeout(() => setShowSparkle(false), 300);

    // Increment global counter via API
    try {
      await fetch('/api/clicks/increment', { method: 'POST' });
    } catch (error) {
      console.error('Failed to increment global counter:', error);
    }
  };

  return (
    <BentoBox span={1}>
      <div className="flex items-center justify-between mb-1.5">
        <h3 className="flex items-center gap-2 text-sm font-semibold">
          <MousePointer2 size={14} className="text-[hsl(var(--accent))]" />
          Time Waster
        </h3>
        <div className="flex items-center gap-1">
          <div className={`h-2 w-2 rounded-full transition-colors ${isConnected ? 'bg-green-500' : 'bg-red-500'}`} />
          <span className="text-xs text-muted-foreground">
            {isConnected ? 'Live' : 'Offline'}
          </span>
        </div>
      </div>

      <motion.button
        onClick={handleClick}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="relative w-full rounded-lg bg-gradient-to-br from-[hsl(var(--accent))]/20 to-[hsl(var(--accent))]/5 p-4 text-center transition-all hover:from-[hsl(var(--accent))]/30 hover:to-[hsl(var(--accent))]/10 border border-[hsl(var(--accent))]/20 overflow-hidden"
      >
        {showSparkle && (
          <motion.div
            initial={{ scale: 0, rotate: 0 }}
            animate={{ scale: 1.5, rotate: 180, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
          >
            <Sparkles className="h-8 w-8 text-[hsl(var(--accent))]" />
          </motion.div>
        )}

        <motion.div
          key={globalClicks}
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.2 }}
          className="text-3xl font-bold text-[hsl(var(--accent))]"
        >
          {globalClicks.toLocaleString()}
        </motion.div>
        <div className="mt-2 text-xs text-muted-foreground">Global Clicks</div>
      </motion.button>

      <div className="mt-3 flex items-center justify-between text-xs">
        <span className="text-muted-foreground">
          You: <span className="font-semibold text-foreground">{localClicks.toLocaleString()}</span>
        </span>
        <span className="text-muted-foreground">
          Click to waste time →
        </span>
      </div>
    </BentoBox>
  );
}
