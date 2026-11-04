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
      <div className="portfolio-section-heading">
        <h2>A little more of me.</h2>
        <a
          className="portfolio-github"
          href="https://github.com/ionutcnu"
          target="_blank"
          rel="noopener noreferrer"
        >
          Explore my GitHub
        </a>
      </div>
      <div className="portfolio-extras-grid">
        <div className="extras-wakatime">
          <WakaTimeWidget />
        </div>
        <div className="extras-summary">
          <div className="extras-stats">
            <StatsWidget />
          </div>
          <div className="extras-counter">
            <ClickCounterWidget active={active} />
          </div>
        </div>
        <div className="extras-map">
          <LocationMapWidget active={active} />
        </div>
        <div className="extras-activity">
          <RecentCommitsWidget />
        </div>
        <div className="extras-contact">
          <ContactWidget />
        </div>
      </div>
      <div className="portfolio-site-information">
        <h3>Behind the site</h3>
        <SiteInformation active={active} />
      </div>
    </>
  );
}
