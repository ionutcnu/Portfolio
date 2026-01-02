"use client"

import { Star, ArrowRight, Link as LinkIcon } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

interface Project {
  slug: string
  title: string
  owner: string
  name: string
  repoDescription: string
  description: string
  stars: number
  contributors?: number
  contributorAvatars?: string[]
  tags: string[]
  url: string
}

const projects: Project[] = [
  {
    slug: "bats",
    title: "BATS",
    owner: "ionutcnu",
    name: "BATS",
    repoDescription: "Built a tool to understand how ATS systems work and optimize job applications",
    description: "BATS is a tool designed to analyze and optimize job applications for Applicant Tracking Systems (ATS).",
    stars: 12,
    contributors: 3,
    contributorAvatars: [
      "https://avatars.githubusercontent.com/u/25122138?v=4",
    ],
    tags: ["C#", ".NET", "automation", "ATS"],
    url: "https://github.com/ionutcnu/BATS"
  },
  {
    slug: "watcher",
    title: "Watcher",
    owner: "ionutcnu",
    name: "Watcher",
    repoDescription: "Data aggregator for World of Tanks clan statistics and performance tracking",
    description: "Watcher aggregates and analyzes World of Tanks clan data, providing insights into player performance and clan statistics.",
    stars: 8,
    contributors: 2,
    contributorAvatars: [
      "https://avatars.githubusercontent.com/u/25122138?v=4",
    ],
    tags: ["TypeScript", "React", "analytics", "gaming"],
    url: "https://github.com/ionutcnu/Watcher"
  },
]

export default function PortfolioProjects() {
  return (
    <section className="px-4 py-8 md:px-0">
      <div className="mb-8 flex items-center justify-between">
        <h2 className="flex items-center gap-3 text-2xl font-semibold md:text-3xl">
          <Star size={28} className="text-[#e5a54b]" />
          <span>Featured Projects</span>
        </h2>
        <Link
          href="/projects"
          className="group text-[#e5a54b]/90 hover:bg-[#e5a54b] hover:text-[#1e293b] underline decoration-dashed underline-offset-4 transition-all duration-200 hidden items-center gap-1 text-sm sm:inline-flex"
        >
          <span>View all</span>
          <ArrowRight
            size={14}
            className="transition-transform duration-200 group-hover:translate-x-0.5"
          />
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {projects.map((project) => (
          <div key={project.slug} className="group block overflow-hidden rounded-xl border border-gray-700/50 bg-gray-900/30 shadow-lg transition-all duration-300 hover:border-[#e5a54b]/50 hover:shadow-xl">
            {/* Terminal Window - GitHub Repo Preview */}
            <div className="bg-gray-300 rounded-t-xl overflow-hidden">
              <div className="bg-[#2d3748] px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
                  <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
                  <div className="w-3 h-3 rounded-full bg-[#27c93f]"></div>
                </div>
                <div className="flex items-center gap-1.5 text-white">
                  <span className="text-sm">{project.stars}</span>
                  <Star className="w-4 h-4 fill-white" />
                </div>
              </div>

              <div className="bg-[#1a202c] p-6 min-h-[200px] flex flex-col">
                <h3 className="font-mono text-base mb-4">
                  <span className="text-pink-400">{project.owner}</span>
                  <span className="text-gray-500"> / </span>
                  <span className="text-green-400 font-semibold">{project.name}</span>
                </h3>

                <p className="text-gray-300 text-sm mb-auto line-clamp-2">
                  {project.repoDescription}
                </p>

                <div className="flex items-center justify-between mt-6">
                  <div className="flex items-center -space-x-2">
                    {project.contributorAvatars?.map((avatar, i) => (
                      <Image
                        key={i}
                        src={avatar}
                        alt={`Contributor ${i + 1}`}
                        width={32}
                        height={32}
                        className="w-8 h-8 rounded-full border-2 border-[#1a202c]"
                      />
                    ))}
                  </div>
                  {project.contributors && (
                    <span className="text-xs text-gray-500">{project.contributors} Contributor{project.contributors !== 1 ? 's' : ''}</span>
                  )}
                </div>
              </div>
            </div>

            {/* Project Description */}
            <div className="space-y-3 p-5 bg-gray-900/50">
              <h3 className="text-white text-xl font-semibold group-hover:text-[#e5a54b] transition-colors">
                {project.title}
              </h3>
              <p className="text-gray-400 line-clamp-2 text-sm">{project.description}</p>

              <div className="flex items-center gap-2 pt-1">
                <LinkIcon size={14} className="text-gray-500" />
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 text-xs bg-gray-800/50 border border-gray-700/50 rounded text-gray-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Link for smaller screens */}
      <div className="mt-6 text-center sm:hidden">
        <Link
          href="/projects"
          className="group text-[#e5a54b] inline-flex items-center gap-1 text-sm hover:underline"
        >
          <span>View all projects</span>
          <ArrowRight
            size={14}
            className="transition-transform duration-200 group-hover:translate-x-0.5"
          />
        </Link>
      </div>
    </section>
  )
}
