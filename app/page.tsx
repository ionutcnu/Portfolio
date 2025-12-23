"use client"

import Navigation from "@/components/Navigation";
import PortfolioHero from "@/components/PortfolioHero";
import PortfolioProjects from "@/components/PortfolioProjects";
import BentoGrid from "@/components/bento/BentoGrid";
import ContactWidget from "@/components/bento/ContactWidget";
import StatsWidget from "@/components/bento/StatsWidget";
import AccentColorPicker from "@/components/bento/AccentColorPicker";
import ClickCounterWidget from "@/components/bento/ClickCounterWidget";
import LocationMapWidget from "@/components/bento/LocationMapWidget";
import RecentCommitsWidget from "@/components/bento/RecentCommitsWidget";
import Experience from "@/components/Experience";
import Footer from "@/components/Footer";

export default function Home() {

  return (
    <>
      {/* Sticky Left Sidebar - Accent Color Picker */}
      <div className="fixed left-4 top-1/2 z-50 hidden -translate-y-1/2 lg:block">
        <AccentColorPicker />
      </div>

      <div className="mx-auto flex min-h-screen max-w-[90%] flex-col md:max-w-[80%]">
        <Navigation />

      <main className="flex-1 px-0 py-8 md:px-5">
        <div className="mx-auto max-w-6xl space-y-12 px-0 py-8 md:space-y-16 md:px-4 md:py-12">
        {/* Section 1: Hero / Introduction */}
        <PortfolioHero />

        {/* Section 2: Experience Timeline */}
        <Experience />

        {/* Section 3: Featured Projects */}
        <PortfolioProjects />

        {/* Section 4: Interactive BentoGrid */}
        <section className="px-4 md:px-0">
          <h2 className="sr-only">Dashboard / Highlights</h2>
          <BentoGrid>
            <ContactWidget />
            <LocationMapWidget />
            <ClickCounterWidget />
            <StatsWidget />
            <RecentCommitsWidget />
          </BentoGrid>
        </section>
        </div>
      </main>

      <Footer />
      </div>
    </>
  );
}
