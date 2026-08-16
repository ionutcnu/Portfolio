import Projects from "@/components/sections/Projects";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects - Ionut Cioncu | GitHub Projects",
  description: "Personal projects by Ionut Cioncu. Explore my GitHub repositories built with TypeScript, Next.js, and React.",
  keywords: ["Ionut Cioncu", "Projects", "GitHub", "TypeScript", "Next.js", "React", "Web Development"],
  openGraph: {
    title: "Projects - Ionut Cioncu",
    description: "GitHub projects built with TypeScript, Next.js, and React.",
    url: "https://lonut.dev/projects",
  },
};

export default function ProjectsPage() {
  return (
    <main className="min-h-screen pt-20">
      <Projects />
    </main>
  );
}
