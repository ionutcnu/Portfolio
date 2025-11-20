"use client"

import { motion } from "framer-motion"
import { Github } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const Projects = () => {
  const projects = [
    {
      name: "BATS",
      problem: "Job hunting is exhausting. ATS systems reject good candidates for arbitrary reasons.",
      solution: "Built a tool to understand how these systems work and optimize my applications. Because if the game has rules, I want to know them.",
      impact: "Learned about parsing, keyword optimization, and what actually matters in a resume.",
      language: "C#",
      url: "https://github.com/ionutcnu/BATS",
      topics: ["problem-solving", "automation", "career"],
    },
    {
      name: "Watcher",
      problem: "I play World of Tanks. Wanted to track clan performance and see patterns over time.",
      solution: "Created an aggregator that pulls stats and shows trends. Started as curiosity, became useful for clan recruitment decisions.",
      impact: "Turns out data visualization helps make better team decisions. Who knew?",
      language: "TypeScript",
      url: "https://github.com/ionutcnu/Watcher",
      topics: ["data", "analytics", "user-needs"],
    },
    {
      name: "browser-use",
      problem: "AI agents are fascinating. But can they actually navigate websites like humans?",
      solution: "Experimenting with AI-powered browser automation. Exploring what's possible when you combine AI reasoning with web interaction.",
      impact: "Learning about AI capabilities, limitations, and practical applications.",
      language: "Python",
      url: "https://github.com/ionutcnu/browser-use",
      topics: ["ai-exploration", "automation", "learning"],
    },
    {
      name: "Portfolio",
      problem: "Tired of pretending to be something I'm not. Needed a space that's actually me.",
      solution: "You're looking at it. Built with AI tools (yes, I'm transparent about that) to show who I actually am: a curious problem-solver transitioning from QA to Product Owner roles.",
      impact: "Authenticity over fake credentials. If this doesn't resonate with you, we probably wouldn't work well together anyway.",
      language: "TypeScript",
      url: "https://github.com/ionutcnu/Portfolio",
      topics: ["authenticity", "personal-brand", "next.js"],
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
            Things I <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">Built</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Personal projects that solve real problems. Built with curiosity and AI tools. No fake credentials.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
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
                </CardHeader>
                <CardContent className="flex-grow space-y-3 text-sm">
                  <div>
                    <p className="text-primary/80 font-semibold mb-1">Problem</p>
                    <CardDescription className="text-sm">{project.problem}</CardDescription>
                  </div>
                  <div>
                    <p className="text-primary/80 font-semibold mb-1">Solution</p>
                    <CardDescription className="text-sm">{project.solution}</CardDescription>
                  </div>
                  <div>
                    <p className="text-primary/80 font-semibold mb-1">Impact</p>
                    <CardDescription className="text-sm">{project.impact}</CardDescription>
                  </div>
                  <div className="flex flex-wrap gap-2 pt-2">
                    {project.topics.map((topic, i) => (
                      <Badge key={i} variant="secondary" className="text-xs">
                        {topic}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button asChild variant="ghost" size="sm">
                    <a href={project.url} target="_blank" rel="noopener noreferrer">
                      <Github className="mr-2 h-4 w-4" />
                      View Project
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
