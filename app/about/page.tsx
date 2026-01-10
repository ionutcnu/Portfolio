import About from "@/components/sections/About";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About - Ionut | Product Owner & QA Professional",
  description: "Learn about Ionut's journey from QA to Product Owner. Understanding the complete picture: user needs, business goals, and technical constraints.",
  openGraph: {
    title: "About Ionut",
    description: "Product-minded QA professional transitioning to Product Owner and Business Analyst roles.",
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
