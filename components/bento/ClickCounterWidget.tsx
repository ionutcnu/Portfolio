"use client"

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { MousePointer2, Sparkles } from "lucide-react";
import { BentoBox } from "./BentoGrid";

// Generate or retrieve session ID
function getSessionId(): string {
  try {
    let sessionId = localStorage.getItem('analytics-session-id');
    if (!sessionId) {
      sessionId = `${Date.now()}-${Math.random().toString(36).substring(2, 11)}`;
      localStorage.setItem('analytics-session-id', sessionId);
    }
    return sessionId;
  } catch (error) {
    // localStorage not available (private browsing, etc.)
    // Generate temporary session ID
    return `temp-${Date.now()}-${Math.random().toString(36).substring(2, 11)}`;
  }
}

interface PlusOne {
  id: number;
  x: number;
  y: number;
}

export default function ClickCounterWidget() {
  const [globalClicks, setGlobalClicks] = useState(750362);
  const [localClicks, setLocalClicks] = useState(0);
  const [isConnected, setIsConnected] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const [plusOnes, setPlusOnes] = useState<PlusOne[]>([]);
  const pageLoadTime = useRef(Date.now());

  useEffect(() => {
    // Load local clicks from localStorage
    try {
      const savedClicks = localStorage.getItem('local-clicks');
      if (savedClicks) {
        setLocalClicks(parseInt(savedClicks, 10));
      }
    } catch (error) {
      // localStorage not available, start at 0
      console.warn('[Counter] localStorage not available:', error);
    }

    // Fetch initial count immediately (before WebSocket connects)
    const fetchInitialCount = async () => {
      try {
        const response = await fetch('/api/clicks');
        if (response.ok) {
          const data = await response.json() as { clicks: number };
          setGlobalClicks(data.clicks);
        }
      } catch (error) {
        console.error('[Counter] Failed to fetch initial count:', error);
        // Keep fallback value if fetch fails
      }
    };

    fetchInitialCount();

    // WebSocket connection with auto-reconnect and exponential backoff
    let ws: WebSocket | null = null;
    let reconnectTimeout: NodeJS.Timeout;
    let isIntentionallyClosed = false;
    let reconnectAttempts = 0;
    const MAX_RECONNECT_ATTEMPTS = 10;
    const BASE_RECONNECT_DELAY = 1000; // 1 second
    const MAX_RECONNECT_DELAY = 30000; // 30 seconds

    const connect = () => {
      if (isIntentionallyClosed || reconnectAttempts >= MAX_RECONNECT_ATTEMPTS) {
        if (reconnectAttempts >= MAX_RECONNECT_ATTEMPTS) {
          console.error('[Counter] Max reconnect attempts reached');
        }
        return;
      }

      // Use wss:// for production, ws:// for local
      const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
      const wsUrl = `${protocol}//${window.location.host}/api/clicks/ws`;

      ws = new WebSocket(wsUrl);

      ws.onopen = () => {
        console.log('[Counter] WebSocket connected');
        setIsConnected(true);
        reconnectAttempts = 0; // Reset on successful connection
      };

      ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          // Validate data type before using
          if (typeof data.clicks === 'number') {
            setGlobalClicks(data.clicks);
          } else {
            console.error('[Counter] Invalid data type for clicks:', typeof data.clicks);
          }
        } catch (error) {
          console.error('[Counter] Failed to parse message:', error);
        }
      };

      ws.onerror = (error) => {
        console.error('[Counter] WebSocket error:', error);
        setIsConnected(false);
      };

      ws.onclose = () => {
        console.log('[Counter] WebSocket closed');
        setIsConnected(false);

        // Auto-reconnect with exponential backoff (unless intentionally closed)
        if (!isIntentionallyClosed && reconnectAttempts < MAX_RECONNECT_ATTEMPTS) {
          reconnectAttempts++;
          // Exponential backoff: delay = min(base * 2^attempts, max)
          const delay = Math.min(BASE_RECONNECT_DELAY * Math.pow(2, reconnectAttempts - 1), MAX_RECONNECT_DELAY);
          console.log(`[Counter] Reconnecting in ${delay}ms (attempt ${reconnectAttempts}/${MAX_RECONNECT_ATTEMPTS})`);

          reconnectTimeout = setTimeout(() => {
            console.log('[Counter] Reconnecting...');
            connect();
          }, delay);
        }
      };
    };

    // Initial connection
    connect();

    return () => {
      isIntentionallyClosed = true;
      clearTimeout(reconnectTimeout);
      if (ws) {
        ws.close();
      }
    };
  }, []);

  const handleClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
    // Increment local counter
    const newLocalClicks = localClicks + 1;
    setLocalClicks(newLocalClicks);

    try {
      localStorage.setItem('local-clicks', newLocalClicks.toString());
    } catch (error) {
      // localStorage not available, continue without persisting
      console.warn('[Counter] Could not save local clicks:', error);
    }

    // Show sparkle animation
    setShowSparkle(true);
    setTimeout(() => setShowSparkle(false), 300);

    // Create +1 animation at random position
    const newPlusOne: PlusOne = {
      id: Date.now(),
      x: Math.random() * 60 + 20, // Random position between 20-80%
      y: Math.random() * 40 + 30, // Random position between 30-70%
    };
    setPlusOnes(prev => [...prev, newPlusOne]);

    // Remove after animation completes
    setTimeout(() => {
      setPlusOnes(prev => prev.filter(p => p.id !== newPlusOne.id));
    }, 1000);

    // Collect comprehensive analytics data
    const analyticsData = {
      sessionId: getSessionId(),
      screenWidth: window.screen.width,
      screenHeight: window.screen.height,
      clickX: event.clientX,
      clickY: event.clientY,
      timeOnPage: Math.floor((Date.now() - pageLoadTime.current) / 1000), // seconds
    };

    // Increment global counter via API with analytics
    try {
      const response = await fetch('/api/clicks/increment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(analyticsData),
      });

      // Use server response for instant update
      if (response.ok) {
        const data = await response.json() as { success: boolean; clicks: number };
        if (data.clicks) {
          setGlobalClicks(data.clicks);
        }
      }
    } catch (error) {
      console.error('Failed to increment global counter:', error);
      // WebSocket will sync eventually
    }
  };

  return (
    <BentoBox span={1}>
      <div className="flex items-center justify-between mb-2 sm:mb-3">
        <h3 className="flex items-center gap-2 text-xs sm:text-sm font-semibold">
          <MousePointer2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[hsl(var(--accent))]" />
          Time Waster
        </h3>
        <div className="flex items-center gap-1">
          <div className={`h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full transition-colors ${isConnected ? 'bg-green-500' : 'bg-red-500'}`} />
          <span className="text-[10px] sm:text-xs text-muted-foreground">
            {isConnected ? 'Live' : 'Offline'}
          </span>
        </div>
      </div>

      <motion.button
        onClick={handleClick}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="relative w-full rounded-lg bg-gradient-to-br from-[hsl(var(--accent))]/20 to-[hsl(var(--accent))]/5 p-3 sm:p-4 md:p-6 text-center transition-all hover:from-[hsl(var(--accent))]/30 hover:to-[hsl(var(--accent))]/10 border border-[hsl(var(--accent))]/20 overflow-hidden"
      >
        {showSparkle && (
          <motion.div
            initial={{ scale: 0, rotate: 0 }}
            animate={{ scale: 1.5, rotate: 180, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
          >
            <Sparkles className="h-6 w-6 sm:h-8 sm:w-8 md:h-10 md:w-10 text-[hsl(var(--accent))]" />
          </motion.div>
        )}

        {plusOnes.map((plusOne) => (
          <motion.div
            key={plusOne.id}
            initial={{ opacity: 0, y: 0, scale: 0.5 }}
            animate={{ opacity: [0, 1, 1, 0], y: -50, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="absolute pointer-events-none text-sm sm:text-base md:text-lg font-bold text-[hsl(var(--accent))]"
            style={{ left: `${plusOne.x}%`, top: `${plusOne.y}%` }}
          >
            +1
          </motion.div>
        ))}

        <motion.div
          key={globalClicks}
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.2 }}
          className="text-2xl sm:text-3xl md:text-4xl font-bold text-[hsl(var(--accent))]"
        >
          {globalClicks.toLocaleString()}
        </motion.div>
        <div className="mt-1.5 sm:mt-2 text-[10px] sm:text-xs text-muted-foreground">Global Clicks</div>
      </motion.button>

      <div className="mt-3 sm:mt-4 flex items-center justify-between text-[10px] sm:text-xs">
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
