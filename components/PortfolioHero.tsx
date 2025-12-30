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
        I&apos;m currently working as a QA Tester @{" "}
        <Link
          href="https://www.endava.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#e5a54b]/85 hover:bg-[#e5a54b] hover:text-[#1e293b] underline decoration-dashed underline-offset-4 transition-colors duration-200"
        >
          Endava Romania
        </Link>
        . I&apos;m in QA, but people say I think like a Business Analyst. I test real business scenarios, not just functionality. I go beyond the happy path, look for edge cases, and question if we&apos;re building the right thing.
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
