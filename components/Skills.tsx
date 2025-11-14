"use client"

import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"

const Skills = () => {
  const skillCategories = [
    {
      category: "Frontend",
      skills: [
        { name: "TypeScript", level: 90 },
        { name: "React", level: 95 },
        { name: "Next.js", level: 90 },
        { name: "Tailwind CSS", level: 95 },
        { name: "Framer Motion", level: 85 },
      ],
      gradient: "from-blue-600 to-cyan-600",
    },
    {
      category: "Backend",
      skills: [
        { name: "Node.js", level: 85 },
        { name: "Python", level: 90 },
        { name: "C#", level: 80 },
        { name: ".NET", level: 75 },
        { name: "GraphQL", level: 70 },
      ],
      gradient: "from-green-600 to-emerald-600",
    },
    {
      category: "AI & Automation",
      skills: [
        { name: "Machine Learning", level: 75 },
        { name: "AI Agents", level: 80 },
        { name: "Browser Automation", level: 90 },
        { name: "Web Scraping", level: 95 },
        { name: "NLP", level: 70 },
      ],
      gradient: "from-purple-600 to-pink-600",
    },
    {
      category: "Database & Tools",
      skills: [
        { name: "MongoDB", level: 85 },
        { name: "PostgreSQL", level: 80 },
        { name: "Redis", level: 75 },
        { name: "Docker", level: 80 },
        { name: "Git", level: 95 },
      ],
      gradient: "from-orange-600 to-yellow-600",
    },
  ]

  return (
    <section id="skills" className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Skills & <span className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">Expertise</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            A comprehensive overview of my technical proficiency across various domains
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={categoryIndex}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
              className="group relative"
            >
              {/* Glow effect */}
              <div className={`absolute -inset-0.5 bg-gradient-to-r ${category.gradient} rounded-2xl opacity-0 group-hover:opacity-20 blur-xl transition-all duration-500`} />

              {/* Card */}
              <div className="relative bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-xl">
                <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  <span className={`w-2 h-8 rounded-full bg-gradient-to-b ${category.gradient}`} />
                  {category.category}
                </h3>

                <div className="space-y-6">
                  {category.skills.map((skill, skillIndex) => (
                    <div key={skillIndex} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">{skill.name}</span>
                        <span className="text-xs text-muted-foreground">{skill.level}%</span>
                      </div>

                      <div className="relative h-2 bg-white/5 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: categoryIndex * 0.1 + skillIndex * 0.1 }}
                          className={`absolute top-0 left-0 h-full bg-gradient-to-r ${category.gradient} rounded-full`}
                        >
                          <div className="absolute inset-0 bg-white/20 animate-pulse" />
                        </motion.div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Skills Tags */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-12 relative"
        >
          <div className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-xl">
            <h3 className="text-xl font-bold mb-6 text-center">Also Experienced With</h3>
            <div className="flex flex-wrap gap-3 justify-center">
              {["AWS", "Vercel", "CI/CD", "Testing", "Agile", "Scrum", "REST APIs", "Responsive Design", "SEO", "Performance Optimization", "Webpack", "Vite", "Linux"].map((skill, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  whileHover={{ scale: 1.1, y: -2 }}
                >
                  <Badge variant="secondary" className="text-sm py-2 px-4 hover:bg-white/20 transition-colors cursor-default">
                    {skill}
                  </Badge>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Skills
