"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Folder } from "lucide-react"
import ProjectCard from "@/components/shared/ProjectCard"
import type { Repository } from "@/types/github"

const Projects = () => {
  const [repos, setRepos] = useState<Repository[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetch('/api/github/repositories')
      .then(res => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`)
        }
        return res.json() as Promise<Repository[] | { error: string }>
      })
      .then((data) => {
        if ('error' in data) {
          setError(data.error)
        } else if (Array.isArray(data)) {
          setRepos(data)
        } else {
          setError('Invalid response format')
        }
        setLoading(false)
      })
      .catch((err: Error) => {
        console.error('Failed to load repositories:', err)
        setError(err.message || 'Failed to load repositories')
        setLoading(false)
      })
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  }

  if (loading) {
    return (
      <section id="projects" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <div className="h-10 w-48 bg-muted rounded animate-pulse" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="flex flex-col h-full overflow-hidden border border-gray-700/50 bg-gray-900/30 rounded-lg p-6 animate-pulse"
              >
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
            ))}
          </div>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section id="projects" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-red-500">{error}</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="projects" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <h2 className="flex items-center gap-3 text-4xl md:text-5xl font-bold mb-4">
            <Folder className="text-accent-dynamic" />
            <span>Projects</span>
          </h2>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {repos.map((repo) => (
            <motion.div key={`${repo.owner}/${repo.name}`} variants={itemVariants}>
              <ProjectCard
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
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default Projects
