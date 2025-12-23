import Projects from "@/components/Projects";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects - Ionut | Real Problem Solvers",
  description: "Personal projects built with curiosity and AI tools. BATS, Watcher, browser-use, and more. No fake credentials, just authentic problem-solving.",
  openGraph: {
    title: "Projects by Ionut",
    description: "Real projects that solve real problems. Built with TypeScript, Python, C#, and AI tools.",
    url: "https://ionut.dev/projects",
  },
};

export default function ProjectsPage() {
  return (
    <main className="min-h-screen pt-20">
      <Projects />
    </main>
  );
}
