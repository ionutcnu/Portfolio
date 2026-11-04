"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import ArrivalSwarm from "@/components/sections/ArrivalSwarm";
import {
  type PortfolioSection,
  selectPortfolioSection,
  usePortfolioSection,
} from "@/lib/hooks/usePortfolioSection";

const sectionPaths: Record<string, string> = {
  about: "details",
  projects: "projects",
  work: "projects",
  testimonials: "what-people-say",
  extras: "extras",
};

const Navigation = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [displayedPath, setDisplayedPath] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const active = usePortfolioSection();
  const section =
    pathname === "/"
      ? sectionPaths[active]
      : pathname.split("/").filter(Boolean).slice(0, 4).join(" / ");

  // Typing animation effect
  useEffect(() => {
    // Build the path text for typing animation (without ~/)
    const pathAfterHome = section ? `${section}/` : "";

    setIsTyping(true);
    setDisplayedPath("");

    let currentIndex = 0;
    let timeoutId: NodeJS.Timeout | null = null;
    const typingSpeed = 50; // ms per character

    const typeNextChar = () => {
      if (currentIndex < pathAfterHome.length) {
        setDisplayedPath(pathAfterHome.slice(0, currentIndex + 1));
        currentIndex++;
        timeoutId = setTimeout(typeNextChar, typingSpeed);
      } else {
        setIsTyping(false);
      }
    };

    typeNextChar();

    // Cleanup timeout on unmount or pathname change
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [section]);

  // Focus input when entering edit mode
  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  // Handle path click - enable editing
  const handlePathClick = () => {
    setIsEditing(true);
    setEditValue(section);
  };

  // Handle Enter key - navigate to typed path
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const value = editValue.replace(/^~?\//, "").replace(/\/$/, "");
      const sectionId = Object.entries(sectionPaths).find(
        ([id, label]) => value === id || value === label,
      )?.[0];
      if (sectionId) {
        selectPortfolioSection((sectionId === "work" ? "projects" : sectionId) as PortfolioSection);
        if (pathname !== "/") router.push("/");
      } else router.push(`/${value}`);
      setIsEditing(false);
    } else if (e.key === "Escape") {
      setIsEditing(false);
      setEditValue("");
    }
  };

  return (
    <div className="header portfolio-navigation relative z-10 flex items-center justify-between py-5 select-none">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumbs">
        <div className="text-md flex items-center">
          <Link
            href="/"
            onClick={() => selectPortfolioSection("about")}
            className="text-[#e5a54b] hover:text-[#e5a54b]/60 transition-colors"
          >
            ~/
          </Link>
          {isEditing ? (
            <input
              ref={inputRef}
              type="text"
              aria-label="Current section path"
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              onKeyDown={handleKeyDown}
              onBlur={() => setIsEditing(false)}
              className="bg-transparent border-none outline-none text-[#e5a54b] font-mono text-md"
              style={{ width: `${Math.max(editValue.length * 10 + 20, 100)}px` }}
            />
          ) : (
            <button
              className="text-[#e5a54b] cursor-text bg-transparent border-none p-0 font-mono text-md"
              onClick={handlePathClick}
              type="button"
              title="Click to edit path"
            >
              {displayedPath}
            </button>
          )}
          {!isEditing && (
            <span
              className={`bg-[#e5a54b] h-4 w-2 ml-1 ${isTyping ? "cursor-typing" : "cursor-blink"}`}
              aria-hidden="true"
            ></span>
          )}
        </div>
      </nav>

      {pathname === "/" && <ArrivalSwarm />}

      <style jsx>{`
        .header {
          mask: linear-gradient(black, black, transparent);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
        }

        @keyframes blink {
          0%, 100% {
            opacity: 1;
          }
          20% {
            opacity: 0;
          }
        }

        @keyframes typing-blink {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0;
          }
        }

        .cursor-blink {
          animation: blink 3s cubic-bezier(0.2, 1, 0.8, 1) infinite;
        }

        .cursor-typing {
          animation: typing-blink 0.5s ease-in-out infinite;
        }

      `}</style>
    </div>
  );
};

export default Navigation;
