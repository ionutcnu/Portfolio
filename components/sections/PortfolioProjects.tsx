"use client"

import { useState, useEffect } from "react"
import { Star, ArrowRight } from "lucide-react"
import Link from "next/link"
import ProjectCard from "@/components/shared/ProjectCard"
import ProjectCardSkeleton from "@/components/shared/ProjectCardSkeleton"
import type { Repository } from "@/types/github"

const FEATURED_COUNT = 2

export default function PortfolioProjects() {
  const [repos, setRepos] = useState<Repository[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetch('/api/github/repositories')
      .then(res => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`)
        return res.json()
      })
      .then((data: unknown) => {
        if (Array.isArray(data) && !('error' in data)) {
          const sorted = [...(data as Repository[])]
            .sort((a, b) => b.stars - a.stars)
            .slice(0, FEATURED_COUNT)
          setRepos(sorted)
        }
        setLoading(false)
      })
      .catch((err: Error) => {
        console.error('Failed to load featured projects:', err)
        setError(err.message || 'Failed to load featured projects')
        setLoading(false)
      })
  }, [])
  if (!loading && error && repos.length === 0) return null

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
        {loading
          ? Array.from({ length: FEATURED_COUNT }).map((_, i) => (
              <ProjectCardSkeleton key={i} />
            ))
          : repos.map((repo) => (
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
              />
            ))
        }
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
