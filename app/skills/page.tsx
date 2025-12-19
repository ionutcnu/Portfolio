import Skills from "@/components/Skills";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Skills - Ionut | Full-Stack & AI Technologies",
  description: "Technical skills across Frontend, Backend, AI & Automation, Databases, and more. TypeScript, React, Next.js, Python, C#, and modern web technologies.",
  openGraph: {
    title: "Skills & Technologies",
    description: "Comprehensive overview of technical skills: Frontend, Backend, AI, and more.",
    url: "https://ionut.dev/skills",
  },
};

export default function SkillsPage() {
  return (
    <main className="min-h-screen pt-20">
      <Skills />
    </main>
  );
}
