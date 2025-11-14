"use client"

import { motion } from "framer-motion"
import { ExternalLink, Github, Star, GitFork } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const Projects = () => {
  const projects = [
    {
      name: "Watcher",
      description: "World of Tanks Clans Aggregator - A comprehensive platform for tracking and analyzing clan statistics with real-time data processing",
      language: "TypeScript",
      stars: 0,
      forks: 0,
      url: "https://github.com/ionutcnu/Watcher",
      topics: ["gaming", "analytics", "aggregator"],
      gradient: "from-blue-600 to-cyan-600",
    },
    {
      name: "BATS",
      description: "Bypass Application Tracking System - An intelligent tool designed to help optimize resumes and applications using advanced algorithms",
      language: "C#",
      stars: 0,
      forks: 0,
      url: "https://github.com/ionutcnu/BATS",
      topics: ["automation", "career", "tools"],
      gradient: "from-purple-600 to-pink-600",
    },
    {
      name: "browser-use",
      description: "Make websites accessible for AI agents - Automate complex web tasks with cutting-edge AI-powered browser automation technology",
      language: "Python",
      stars: 0,
      forks: 0,
      url: "https://github.com/ionutcnu/browser-use",
      topics: ["ai", "automation", "web-scraping"],
      gradient: "from-green-600 to-emerald-600",
    },
    {
      name: "MiniMax-M1",
      description: "The world's first open-weight, large-scale hybrid-attention reasoning model for advanced AI capabilities and research",
      language: "Python",
      stars: 0,
      forks: 0,
      url: "https://github.com/ionutcnu/MiniMax-M1",
      topics: ["ai", "machine-learning", "research"],
      gradient: "from-orange-600 to-yellow-600",
    },
    {
      name: "rcc",
      description: "Red Cat Quasar - A modern web application built with cutting-edge technologies and best practices",
      language: "TypeScript",
      stars: 0,
      forks: 0,
      url: "https://github.com/ionutcnu/rcc",
      topics: ["web", "typescript", "quasar"],
      gradient: "from-red-600 to-rose-600",
    },
    {
      name: "Portfolio",
      description: "This modern, animated portfolio website showcasing projects and skills with Next.js and advanced animations",
      language: "TypeScript",
      stars: 0,
      forks: 0,
      url: "https://github.com/ionutcnu/Portfolio",
      topics: ["portfolio", "next.js", "tailwind"],
      gradient: "from-indigo-600 to-purple-600",
    },
  ]

  return (
    <section id="projects" className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Featured <span className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">Projects</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Showcasing my work in AI, automation, and web development
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="group relative"
            >
              {/* Glow effect on hover */}
              <div className={`absolute -inset-0.5 bg-gradient-to-r ${project.gradient} rounded-2xl opacity-0 group-hover:opacity-20 blur-xl transition-all duration-500`} />

              {/* Card */}
              <div className="relative h-full bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-xl overflow-hidden">
                {/* Gradient overlay */}
                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${project.gradient} opacity-10 rounded-full blur-3xl group-hover:opacity-20 transition-opacity duration-500`} />

                <div className="relative flex flex-col h-full">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${project.gradient} flex items-center justify-center shadow-lg`}>
                      <span className="text-xl font-bold text-white">
                        {project.name[0]}
                      </span>
                    </div>
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                    >
                      <Github className="h-5 w-5" />
                    </a>
                  </div>

                  {/* Content */}
                  <div className="flex-grow">
                    <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                      {project.name}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.topics.map((topic, i) => (
                        <Badge key={i} variant="secondary" className="text-xs">
                          {topic}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-4 border-t border-white/10">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <div className={`w-3 h-3 rounded-full bg-gradient-to-br ${project.gradient}`} />
                        <span>{project.language}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4" />
                        <span>{project.stars}</span>
                      </div>
                    </div>
                    <Button asChild variant="ghost" size="sm" className="group/btn">
                      <a href={project.url} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-4 w-4 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-center mt-12"
        >
          <Button asChild size="lg" variant="outline" className="group">
            <a href="https://github.com/ionutcnu?tab=repositories" target="_blank" rel="noopener noreferrer">
              <Github className="mr-2 h-5 w-5 group-hover:rotate-12 transition-transform" />
              View All Projects on GitHub
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}

export default Projects
