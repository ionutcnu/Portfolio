"use client"

import { useState, useEffect } from "react"
import { Star, GitFork, ArrowRight, Link as LinkIcon } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

interface Contributor {
  login: string
  avatar_url: string
  html_url: string
  contributions: number
}

interface Repository {
  name: string
  owner: string
  description: string
  stars: number
  forks: number
  language: string | null
  languages: string[]
  topics: string[]
  url: string
  contributors: Contributor[]
  contributorCount: number
}

interface Project {
  name: string
  title: string
  repoDescription: string
  longDescription: string
}

const featuredProjects: Project[] = [
  {
    name: "BATS",
    title: "BATS",
    repoDescription: "Built a tool to understand how ATS systems work and optimize job applications",
    longDescription: "BATS is a tool designed to analyze and optimize job applications for Applicant Tracking Systems (ATS).",
  },
  {
    name: "Watcher",
    title: "Watcher",
    repoDescription: "Data aggregator for World of Tanks clan statistics and performance tracking",
    longDescription: "Watcher aggregates and analyzes World of Tanks clan data, providing insights into player performance and clan statistics.",
  },
]

export default function PortfolioProjects() {
  const [repos, setRepos] = useState<Repository[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/github/repositories')
      .then(res => res.json())
      .then(data => {
        if (!data.error) {
          // Filter for featured projects only
          const featured = data.filter((repo: Repository) =>
            featuredProjects.some(p => p.name.toLowerCase() === repo.name.toLowerCase())
          )
          setRepos(featured)
        }
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  const getProjectInfo = (repoName: string) => {
    return featuredProjects.find(p => p.name.toLowerCase() === repoName.toLowerCase())
  }
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

      {loading ? (
        <div className="text-center py-12">
          <p className="text-gray-400">Loading projects...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {repos.map((repo) => {
            const projectInfo = getProjectInfo(repo.name)
            return (
              <a
                key={repo.name}
                href={repo.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group block overflow-hidden rounded-xl border border-gray-700/50 bg-gray-900/30 shadow-lg transition-all duration-300 hover:border-[#e5a54b]/50 hover:shadow-xl"
              >
                {/* Terminal Window - GitHub Repo Preview */}
                <div className="bg-gray-300 rounded-t-xl overflow-hidden">
                  <div className="bg-[#2d3748] px-4 py-3 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
                      <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
                      <div className="w-3 h-3 rounded-full bg-[#27c93f]"></div>
                    </div>
                    <div className="flex items-center gap-3 text-white">
                      <div className="flex items-center gap-1.5">
                        <span className="text-sm">{repo.stars}</span>
                        <Star className="w-4 h-4 fill-white" />
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-sm">{repo.forks}</span>
                        <GitFork className="w-4 h-4" />
                      </div>
                    </div>
                  </div>

                  <div className="bg-[#1a202c] p-6 min-h-[200px] flex flex-col">
                    <h3 className="font-mono text-base mb-4">
                      <span className="text-pink-400">{repo.owner}</span>
                      <span className="text-gray-500"> / </span>
                      <span className="text-green-400 font-semibold">{repo.name}</span>
                    </h3>

                    <p className="text-gray-300 text-sm mb-auto line-clamp-2">
                      {projectInfo?.repoDescription || repo.description}
                    </p>

                    <div className="flex items-center justify-between mt-6">
                      <div className="flex items-center -space-x-2">
                        {repo.contributors.map((contributor, i) => (
                          <Image
                            key={i}
                            src={contributor.avatar_url}
                            alt={contributor.login}
                            width={32}
                            height={32}
                            className="w-8 h-8 rounded-full border-2 border-[#1a202c]"
                          />
                        ))}
                      </div>
                      {repo.contributorCount > 0 && (
                        <span className="text-xs text-gray-500">
                          {repo.contributorCount} Contributor{repo.contributorCount !== 1 ? 's' : ''}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Project Description */}
                <div className="space-y-3 p-5 bg-gray-900/50">
                  <h3 className="text-white text-xl font-semibold group-hover:text-[#e5a54b] transition-colors">
                    {projectInfo?.title || repo.name}
                  </h3>
                  <p className="text-gray-400 line-clamp-2 text-sm">
                    {projectInfo?.longDescription || repo.description}
                  </p>

                  <div className="flex items-center gap-2 pt-1 flex-wrap">
                    {repo.languages.length > 0 ? (
                      repo.languages.slice(0, 6).map((lang) => (
                        <span
                          key={lang}
                          className="px-2 py-0.5 text-xs bg-blue-900/30 border border-blue-700/50 rounded text-blue-300"
                        >
                          {lang}
                        </span>
                      ))
                    ) : repo.language && (
                      <span className="px-2 py-0.5 text-xs bg-blue-900/30 border border-blue-700/50 rounded text-blue-300">
                        {repo.language}
                      </span>
                    )}
                    {repo.topics.slice(0, 5).map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 text-xs bg-gray-800/50 border border-gray-700/50 rounded text-gray-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </a>
            )
          })}
        </div>
      )}

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
