"use client";

import dynamic from "next/dynamic";
import ClickCounterWidget from "@/components/bento/ClickCounterWidget";
import ContactWidget from "@/components/bento/ContactWidget";
import RecentCommitsWidget from "@/components/bento/RecentCommitsWidget";
import StatsWidget from "@/components/bento/StatsWidget";
import WakaTimeWidget from "@/components/bento/WakaTimeWidget";
import SiteInformation from "@/components/layout/SiteInformation";

const LocationMapWidget = dynamic(() => import("@/components/bento/LocationMapWidget"), {
  ssr: false,
  loading: () => <p>Loading map...</p>,
});

export default function PortfolioExtras({ active }: { active: boolean }) {
  return (
    <>
      <div className="flex items-baseline justify-between gap-4 max-sm:flex-wrap max-sm:gap-2">
        <h2>A little more of me.</h2>
        <a
          className="mt-[10px] inline-block text-[13px] text-accent-dynamic"
          href="https://github.com/ionutcnu"
          target="_blank"
          rel="noopener noreferrer"
        >
          Explore my GitHub
        </a>
      </div>
      <div className="portfolio-extras-grid mt-6 grid grid-cols-1 items-stretch gap-[18px] min-[641px]:grid-cols-2 min-[1001px]:grid-cols-3">
        <div className="extras-wakatime col-span-2 min-w-0">
          <WakaTimeWidget />
        </div>
        <div className="extras-summary col-span-1 grid min-w-0 grid-cols-1 gap-[18px] p-0 min-[641px]:col-span-2 min-[641px]:grid-cols-2 min-[1001px]:col-span-1 min-[1001px]:grid-cols-1">
          <div className="extras-stats h-auto min-w-0 bg-transparent p-0 min-[641px]:col-span-2 min-[801px]:col-span-1">
            <StatsWidget />
          </div>
          <div className="extras-counter h-auto min-w-0 bg-transparent p-0">
            <ClickCounterWidget active={active} />
          </div>
        </div>
        <div className="extras-map min-w-0">
          <LocationMapWidget active={active} />
        </div>
        <div className="extras-activity min-w-0 min-[1001px]:col-span-2">
          <RecentCommitsWidget />
        </div>
        <div className="extras-contact col-span-full min-w-0">
          <ContactWidget />
        </div>
      </div>
      <div className="portfolio-site-information mt-7 border-t border-border pt-6">
        <h3 className="mb-4">Behind the site</h3>
        <SiteInformation active={active} />
      </div>
    </>
  );
}
