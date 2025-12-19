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
    name: "Current Company",
    logo: "QA",
    url: "#",
  },
  {
    name: "Previous Company",
    logo: "DEV",
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
        I&apos;m currently working as a QA Engineer @{" "}
        <Link
          href="#"
          className="text-[#e5a54b]/85 hover:bg-[#e5a54b] hover:text-[#1e293b] underline decoration-dashed underline-offset-4 transition-colors duration-200"
        >
          Current Company
        </Link>
        . I&apos;m transitioning from QA to Product Owner/Business Analyst roles. What I care about is{" "}
        <span className="text-white">the actual problem</span>. I love asking &apos;why&apos; before &apos;how&apos; and building solutions that help people.
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
          href="https://linkedin.com/in/yourprofile"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-400 hover:text-[#e5a54b] inline-flex items-center gap-1 text-sm transition-colors duration-200"
        >
          <Linkedin size={16} />
          <span>LinkedIn</span>
        </Link>
        <span className="text-gray-700 text-xs">|</span>
        <Link
          href="https://x.com/yourhandle"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-400 hover:text-[#e5a54b] inline-flex items-center gap-1 text-sm transition-colors duration-200"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
          <span>X</span>
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
