"use client"

import { useState, useEffect } from "react"
import { Star, ArrowRight } from "lucide-react"
import Link from "next/link"
import ProjectCard from "@/components/shared/ProjectCard"

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
  homepage: string | null
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
      .then((data: unknown) => {
        if (Array.isArray(data) && !('error' in data ? data.error : false)) {
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
              <ProjectCard
                key={repo.name}
                name={repo.name}
                owner={repo.owner}
                description={repo.description}
                stars={repo.stars}
                forks={repo.forks}
                language={repo.language}
                languages={repo.languages}
                topics={repo.topics}
                url={repo.url}
                homepage={repo.homepage}
                contributors={repo.contributors}
                contributorCount={repo.contributorCount}
                title={projectInfo?.title}
                longDescription={projectInfo?.longDescription}
              />
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
