import Contact from "@/components/Contact";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact - Ionut | Let's Work Together",
  description: "Get in touch with Ionut for Product Owner, Business Analyst, or QA opportunities. Based in Romania, open to remote work.",
  openGraph: {
    title: "Contact Ionut",
    description: "Open to discussing new projects, creative ideas, and opportunities.",
    url: "https://ionut.dev/contact",
  },
};

export default function ContactPage() {
  return (
    <main className="min-h-screen pt-20">
      <Contact />
    </main>
  );
}
