import About from "@/components/sections/About";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About - Ionut Cioncu | QA Engineer at Endava",
  description: "Ionut Cioncu is a QA Engineer with 4+ years of experience across Maritime Logistics and Payments at Endava. Experienced with REST APIs, PostgreSQL, microservices, Playwright, Selenium, Cypress, and AI-assisted engineering.",
  keywords: ["Ionut Cioncu", "QA Engineer", "Endava", "Maritime Logistics", "Payments", "REST APIs", "PostgreSQL", "Microservices", "Kafka", "Cosmos DB", "Azure", "Kubernetes", "Playwright", "Selenium", "Cypress", "LLM Testing", "MCP", "Romania"],
  openGraph: {
    title: "About Ionut Cioncu - QA Engineer at Endava",
    description: "QA Engineer with 4+ years of experience across Maritime Logistics and Payments, working with APIs, distributed systems, test automation, and AI-assisted engineering.",
    url: "https://ionut.dev/about",
  },
};

export default function AboutPage() {
  return (
    <main className="min-h-screen pt-20">
      <About />
    </main>
  );
}
