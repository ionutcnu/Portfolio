"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Star, GitFork, Link as LinkIcon, Folder } from "lucide-react"
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
  createdAt: string
  updatedAt: string
  pushedAt: string
  contributors: Contributor[]
  contributorCount: number
}

const Projects = () => {
  const [repos, setRepos] = useState<Repository[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetch('/api/github/repositories')
      .then(res => res.json())
      .then(data => {
        if (data.error) {
          setError(data.error)
        } else {
          setRepos(data)
        }
        setLoading(false)
      })
      .catch(err => {
        setError('Failed to load repositories')
        setLoading(false)
      })
  }, [])

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    })
  }

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
          <div className="text-center">
            <p className="text-muted-foreground">Loading projects...</p>
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
          {repos.map((repo, index) => (
            <motion.div key={index} variants={itemVariants}>
              <a
                href={repo.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group block overflow-hidden rounded-xl border border-gray-700/50 bg-gray-900/30 shadow-lg transition-all duration-300 hover:border-accent-dynamic/50 hover:shadow-xl"
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
                      {repo.description}
                    </p>

                    <div className="flex items-center justify-between mt-6">
                      <div className="flex items-center -space-x-2">
                        {repo.contributors.slice(0, 5).map((contributor, i) => (
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

                {/* Project Info */}
                <div className="space-y-3 p-5 bg-gray-900/50">
                  <div className="flex items-start justify-between">
                    <h3 className="text-white text-xl font-semibold group-hover:text-accent-dynamic transition-colors">
                      {repo.name}
                    </h3>
                    <span className="text-xs text-gray-500 whitespace-nowrap ml-4">
                      {formatDate(repo.pushedAt)}
                    </span>
                  </div>

                  {/* Tags */}
                  <div className="flex items-center gap-2 flex-wrap">
                    {repo.languages.length > 0 ? (
                      repo.languages.map((lang) => (
                        <span
                          key={lang}
                          className="px-2 py-1 text-xs bg-blue-900/30 border border-blue-700/50 rounded text-blue-300"
                        >
                          {lang}
                        </span>
                      ))
                    ) : repo.language && (
                      <span className="px-2 py-1 text-xs bg-blue-900/30 border border-blue-700/50 rounded text-blue-300">
                        {repo.language}
                      </span>
                    )}
                    {repo.topics.map((topic) => (
                      <span
                        key={topic}
                        className="px-2 py-1 text-xs bg-gray-800/50 border border-gray-700/50 rounded text-gray-300"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>
              </a>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default Projects
