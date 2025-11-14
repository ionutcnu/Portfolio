"use client"

import { motion } from "framer-motion"
import { ExternalLink, Github, Star, GitFork } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const Projects = () => {
  const projects = [
    {
      name: "Watcher",
      description: "World of Tanks Clans Aggregator - A comprehensive platform for tracking and analyzing clan statistics in World of Tanks",
      language: "TypeScript",
      stars: 0,
      forks: 0,
      url: "https://github.com/ionutcnu/Watcher",
      topics: ["gaming", "analytics", "aggregator"],
    },
    {
      name: "BATS",
      description: "Bypass Application Tracking System - An intelligent tool designed to help optimize resumes and applications",
      language: "C#",
      stars: 0,
      forks: 0,
      url: "https://github.com/ionutcnu/BATS",
      topics: ["automation", "career", "tools"],
    },
    {
      name: "browser-use",
      description: "Make websites accessible for AI agents - Automate complex web tasks with AI-powered browser automation",
      language: "Python",
      stars: 0,
      forks: 0,
      url: "https://github.com/ionutcnu/browser-use",
      topics: ["ai", "automation", "web-scraping"],
    },
    {
      name: "MiniMax-M1",
      description: "The world's first open-weight, large-scale hybrid-attention reasoning model for advanced AI capabilities",
      language: "Python",
      stars: 0,
      forks: 0,
      url: "https://github.com/ionutcnu/MiniMax-M1",
      topics: ["ai", "machine-learning", "research"],
    },
    {
      name: "rcc",
      description: "Red Cat Quasar - A modern web application built with cutting-edge technologies",
      language: "TypeScript",
      stars: 0,
      forks: 0,
      url: "https://github.com/ionutcnu/rcc",
      topics: ["web", "typescript", "quasar"],
    },
  ]

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

  const getLanguageColor = (language: string) => {
    const colors: { [key: string]: string } = {
      TypeScript: "bg-blue-500",
      Python: "bg-yellow-500",
      "C#": "bg-purple-500",
      JavaScript: "bg-yellow-300",
    }
    return colors[language] || "bg-gray-500"
  }

  return (
    <section id="projects" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Featured <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">Projects</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Here are some of my recent projects showcasing my work in AI, automation, and web development.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {projects.map((project, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Card className="h-full flex flex-col hover:shadow-xl transition-all duration-300 border-muted group hover:border-primary/50">
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      {project.language && (
                        <div className="flex items-center gap-1">
                          <div className={`w-3 h-3 rounded-full ${getLanguageColor(project.language)}`} />
                          <span className="text-xs text-muted-foreground">{project.language}</span>
                        </div>
                      )}
                    </div>
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      <Github className="h-5 w-5" />
                    </a>
                  </div>
                  <CardTitle className="group-hover:text-primary transition-colors">
                    {project.name}
                  </CardTitle>
                  <CardDescription className="line-clamp-3">
                    {project.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <div className="flex flex-wrap gap-2">
                    {project.topics.map((topic, i) => (
                      <Badge key={i} variant="secondary" className="text-xs">
                        {topic}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <div className="flex gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4" />
                      <span>{project.stars}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <GitFork className="h-4 w-4" />
                      <span>{project.forks}</span>
                    </div>
                  </div>
                  <Button asChild variant="ghost" size="sm">
                    <a href={project.url} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center mt-12"
        >
          <Button asChild size="lg" variant="outline">
            <a href="https://github.com/ionutcnu?tab=repositories" target="_blank" rel="noopener noreferrer">
              <Github className="mr-2 h-4 w-4" />
              View All Projects
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}

export default Projects
