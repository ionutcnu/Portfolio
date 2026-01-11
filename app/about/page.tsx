import About from "@/components/sections/About";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About - Ionut Cioncu | QA Tester at Endava",
  description: "Ionut Cioncu - QA Tester with 4 years of multi-domain experience at Endava PLC. Specializing in REST API testing, PostgreSQL, Kubernetes, and microservices across Naval Shipping and Payments domains. Based in Pitesti, Romania.",
  keywords: ["Ionut Cioncu", "QA Tester", "Endava", "REST API Testing", "Postman", "PostgreSQL", "Kubernetes", "Azure", "Kafka", "Naval Shipping", "Payments", "Pitesti", "Romania"],
  openGraph: {
    title: "About Ionut Cioncu - QA Tester at Endava",
    description: "QA Tester with 4 years of experience across Naval Shipping and Payments domains. Testing with context - understanding why we build, not just if it works.",
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
