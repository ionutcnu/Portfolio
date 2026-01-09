"use client"

import { Github, Linkedin, ArrowRight } from "lucide-react"
import Link from "next/link"

interface Company {
  name: string
  logo: string
  url?: string
  isPast?: boolean
}

const companies: Company[] = [
  {
    name: "Endava Romania",
    logo: "QA",
    url: "https://www.endava.com/",
  },
  {
    name: "Vision",
    logo: "DEV",
    url: "https://www.vision.ro/",
    isPast: true,
  },
]

export default function PortfolioHero() {
  return (
    <section className="space-y-5 px-4 md:px-0">
      <h1 className="text-3xl font-bold md:text-4xl">
        Hey! I&apos;m <span className="text-[#e5a54b]">Ionut</span>
      </h1>

      <p className="text-gray-400 max-w-prose text-lg leading-relaxed">
        QA Tester with 4 years of experience at{" "}
        <Link
          href="https://www.endava.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#e5a54b]/85 hover:bg-[#e5a54b] hover:text-[#1e293b] underline decoration-dashed underline-offset-4 transition-colors duration-200"
        >
          Endava Romania
        </Link>
        . I test with context — understanding why we&apos;re building something, not just checking if it works.
      </p>

      <p className="text-gray-400 max-w-prose text-lg leading-relaxed">
        I&apos;ve worked across Naval Shipping and Payments domains, became the QA SME and I bridge the gap between testing and business analysis. I go beyond the happy path, look for edge cases, and question if we&apos;re building the right thing.
      </p>

      {/* Skills Section */}
      <div className="mt-8 max-w-prose">
        <h2 className="text-xl font-semibold mb-4">Tools & Technologies</h2>
        <div className="bg-[#1e1e2e]/50 border border-gray-800 rounded-lg p-4 font-mono text-sm text-gray-300 space-y-2">
          <div><span className="text-[#e5a54b]">API Testing:</span> Postman, REST APIs</div>
          <div><span className="text-[#e5a54b]">Databases:</span> PostgreSQL, SQL scripting</div>
          <div><span className="text-[#e5a54b]">Cloud & DevOps:</span> AWS S3, Azure, Kubernetes, Kibana</div>
          <div><span className="text-[#e5a54b]">Messaging:</span> Apache Kafka</div>
          <div><span className="text-[#e5a54b]">Automation:</span> Cypress, Selenium</div>
          <div><span className="text-[#e5a54b]">Other:</span> JSON, Microservices, Git</div>
        </div>
      </div>

      {/* CTA Line */}
      <p className="text-gray-400 max-w-prose text-base italic">
        Currently open to interesting projects and conversations.
      </p>

      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 pt-2">
        <Link
          href="https://github.com/ionutcnu"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-400 hover:text-[#e5a54b] inline-flex items-center gap-1 text-sm transition-colors duration-200"
        >
          <Github size={16} />
          <span>GitHub</span>
        </Link>
        <span className="text-gray-700 text-xs">|</span>
        <Link
          href="https://www.linkedin.com/in/cioncu/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-400 hover:text-[#e5a54b] inline-flex items-center gap-1 text-sm transition-colors duration-200"
        >
          <Linkedin size={16} />
          <span>LinkedIn</span>
        </Link>
        <span className="text-gray-700 text-xs">|</span>
        <Link
          href="/about"
          className="group text-gray-400 hover:text-[#e5a54b] inline-flex items-center gap-1 text-sm transition-colors duration-200"
        >
          <span>More about me</span>
          <ArrowRight size={16} className="transition-transform duration-200 group-hover:translate-x-0.5" />
        </Link>
      </div>
    </section>
  )
}
