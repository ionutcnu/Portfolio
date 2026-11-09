"use client";

import { usePathname, useRouter } from "next/navigation";
import { selectPortfolioSection } from "@/lib/hooks/usePortfolioSection";
import VisitorTracker from "./VisitorTracker";

export default function Footer() {
  const pathname = usePathname();
  const router = useRouter();
  return (
    <footer className="portfolio-footer flex flex-wrap justify-between gap-[18px] py-7 text-[11px] text-foreground/60">
      <VisitorTracker />
      <span>&copy; {new Date().getFullYear()} Ionut Cioncu</span>
      <div className="flex gap-[18px]">
        <button
          type="button"
          onClick={() => {
            selectPortfolioSection("extras");
            if (pathname !== "/") router.push("/");
            else document.querySelector('[role="tablist"]')?.scrollIntoView({ block: "nearest" });
          }}
        >
          Site information
        </button>
        <a href="https://github.com/ionutcnu" target="_blank" rel="noopener noreferrer">
          GitHub
        </a>
        <a href="https://www.linkedin.com/in/cioncu/" target="_blank" rel="noopener noreferrer">
          LinkedIn
        </a>
      </div>
    </footer>
  );
}
