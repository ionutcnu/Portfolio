import PortfolioHero from "@/components/sections/PortfolioHero";
import PortfolioProjects from "@/components/sections/PortfolioProjects";
import BentoGrid from "@/components/bento/BentoGrid";
import ContactWidget from "@/components/bento/ContactWidget";
import StatsWidget from "@/components/bento/StatsWidget";
import ClickCounterWidget from "@/components/bento/ClickCounterWidget";
import LocationMapWidget from "@/components/bento/LocationMapWidget";
import RecentCommitsWidget from "@/components/bento/RecentCommitsWidget";
import TestimonialsWidget from "@/components/bento/TestimonialsWidget";
import Experience from "@/components/sections/Experience";

export default function Home() {

  return (
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
            <TestimonialsWidget />
            <RecentCommitsWidget />
          </BentoGrid>
        </section>
      </div>
    </main>
  );
}
