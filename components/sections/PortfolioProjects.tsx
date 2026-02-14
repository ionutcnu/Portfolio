"use client"

import { useState, useEffect } from "react"
import { Star, ArrowRight } from "lucide-react"
import Link from "next/link"
import ProjectCard from "@/components/shared/ProjectCard"
import type { Repository } from "@/types/github"

const FEATURED_COUNT = 2

function ProjectCardSkeleton() {
  return (
    <div className="flex flex-col h-full overflow-hidden border border-gray-700/50 bg-gray-900/30 rounded-lg p-6 animate-pulse">
      <div className="mb-3 space-y-2">
        <div className="h-5 w-2/5 bg-muted rounded" />
        <div className="h-3 w-full bg-muted/60 rounded" />
        <div className="h-3 w-3/4 bg-muted/60 rounded" />
      </div>
      <div className="flex gap-2 mb-4">
        <div className="h-5 w-12 bg-muted rounded-full" />
        <div className="h-5 w-12 bg-muted rounded-full" />
      </div>
      <div className="flex gap-2 flex-wrap mb-4">
        <div className="h-5 w-16 bg-muted/50 rounded-full" />
        <div className="h-5 w-20 bg-muted/50 rounded-full" />
        <div className="h-5 w-14 bg-muted/50 rounded-full" />
      </div>
      <div className="mt-auto flex gap-2 pt-4">
        <div className="h-9 flex-1 bg-muted rounded" />
      </div>
    </div>
  )
}

export default function PortfolioProjects() {
  const [repos, setRepos] = useState<Repository[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/github/repositories')
      .then(res => res.json())
      .then((data: unknown) => {
        if (Array.isArray(data) && !('error' in data ? (data as { error: unknown }).error : false)) {
          const sorted = [...(data as Repository[])]
            .sort((a, b) => b.stars - a.stars)
            .slice(0, FEATURED_COUNT)
          setRepos(sorted)
        }
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])
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
