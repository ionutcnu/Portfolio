"use client"

import { motion } from "framer-motion"
import { Calendar, Code, Briefcase, GraduationCap } from "lucide-react"

const Timeline = () => {
  const timelineData = [
    {
      icon: Code,
      year: "2017 - Present",
      title: "Full Stack Development Journey",
      description: "Building innovative solutions across multiple technologies and platforms",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: Briefcase,
      year: "2020 - 2024",
      title: "AI & Automation Specialist",
      description: "Developed AI-powered browser automation tools and intelligent systems",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: GraduationCap,
      year: "2019 - 2022",
      title: "Gaming Analytics",
      description: "Created World of Tanks clan aggregator and analytics platforms",
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: Calendar,
      year: "2017",
      title: "Started GitHub Journey",
      description: "Began contributing to open source and building personal projects",
      color: "from-orange-500 to-yellow-500",
    },
  ]

  return (
    <section className="py-20 relative overflow-hidden">
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
            My <span className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">Journey</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            A timeline of my professional development and key milestones
          </p>
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-blue-500 to-transparent" />

          <div className="space-y-12">
            {timelineData.map((item, index) => {
              const Icon = item.icon
              const isEven = index % 2 === 0

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`relative flex items-center ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} gap-8`}
                >
                  {/* Content */}
                  <div className={`flex-1 ${isEven ? 'md:text-right' : 'md:text-left'}`}>
                    <motion.div
                      whileHover={{ scale: 1.02, y: -5 }}
                      className="inline-block"
                    >
                      <div className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-xl">
                        <div className="flex items-center gap-3 mb-3">
                          {isEven && <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center ml-auto`}>
                            <Icon className="h-6 w-6 text-white" />
                          </div>}
                          <div className={isEven ? 'text-right' : 'text-left'}>
                            <div className="text-sm text-muted-foreground">{item.year}</div>
                            <h3 className="text-xl font-bold">{item.title}</h3>
                          </div>
                          {!isEven && <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center`}>
                            <Icon className="h-6 w-6 text-white" />
                          </div>}
                        </div>
                        <p className="text-muted-foreground">{item.description}</p>
                      </div>
                    </motion.div>
                  </div>

                  {/* Center dot */}
                  <div className="absolute left-8 md:left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-primary border-4 border-background shadow-lg" />

                  {/* Spacer for alignment */}
                  <div className="hidden md:block flex-1" />
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Timeline
