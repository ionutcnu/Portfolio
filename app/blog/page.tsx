import BlogContent from "@/components/BlogContent";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog - Ionut | Product Thinking & Tech Insights",
  description: "Coming soon: Insights on product thinking, QA methodologies, AI explorations, and career transitions from QA to Product Owner.",
  openGraph: {
    title: "Blog - Ionut",
    description: "Product thinking, QA methodologies, and tech explorations.",
    url: "https://ionut.dev/blog",
  },
};

export default function BlogPage() {
  return <BlogContent />;
}
