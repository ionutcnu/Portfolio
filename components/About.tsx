"use client"

import { motion } from "framer-motion"
import { Code2, Rocket, Zap, Brain, Coffee, Terminal } from "lucide-react"

const About = () => {
  const features = [
    {
      icon: Code2,
      title: "Clean Code",
      description: "Writing maintainable, scalable, and efficient code",
      delay: 0.1,
      size: "col-span-1",
      gradient: "from-blue-600 to-cyan-600",
    },
    {
      icon: Brain,
      title: "AI & ML Enthusiast",
      description: "Exploring the frontiers of artificial intelligence and machine learning to build intelligent solutions",
      delay: 0.2,
      size: "col-span-1 md:col-span-2",
      gradient: "from-purple-600 to-pink-600",
    },
    {
      icon: Rocket,
      title: "Fast Delivery",
      description: "Rapid prototyping and agile development",
      delay: 0.3,
      size: "col-span-1",
      gradient: "from-green-600 to-emerald-600",
    },
    {
      icon: Terminal,
      title: "Full Stack Mastery",
      description: "From database to deployment, handling every layer of modern applications",
      delay: 0.4,
      size: "col-span-1 md:col-span-2",
      gradient: "from-orange-600 to-yellow-600",
    },
    {
      icon: Zap,
      title: "Performance",
      description: "Optimized for speed and efficiency",
      delay: 0.5,
      size: "col-span-1",
      gradient: "from-red-600 to-rose-600",
    },
    {
      icon: Coffee,
      title: "Problem Solver",
      description: "Turning complex challenges into elegant solutions",
      delay: 0.6,
      size: "col-span-1",
      gradient: "from-indigo-600 to-purple-600",
    },
  ]

  return (
    <section id="about" className="py-20 relative overflow-hidden bg-gradient-to-b from-transparent via-muted/30 to-transparent">
      <div className="absolute inset-0 bg-grid-white/5 bg-[size:50px_50px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            About <span className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">Me</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            A passionate developer from Romania with <span className="text-primary font-semibold">8+ years</span> of experience
            building innovative solutions. I specialize in creating robust applications with cutting-edge technologies,
            always focusing on user experience and code quality.
          </p>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: feature.delay }}
                whileHover={{ scale: 1.02, y: -5 }}
                className={`${feature.size} group relative overflow-hidden`}
              >
                {/* Glow effect */}
                <div className={`absolute -inset-0.5 bg-gradient-to-r ${feature.gradient} rounded-2xl opacity-0 group-hover:opacity-20 blur-xl transition-all duration-500`} />

                {/* Card */}
                <div className="relative h-full bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-xl">
                  <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${feature.gradient} opacity-10 rounded-full blur-2xl`} />

                  <div className="relative">
                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-4 shadow-lg`}>
                      <Icon className="h-7 w-7 text-white" />
                    </div>
                    <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {[
            { label: "Years Experience", value: "8+", gradient: "from-blue-600 to-cyan-600" },
            { label: "Projects Completed", value: "22+", gradient: "from-green-600 to-emerald-600" },
            { label: "Technologies", value: "15+", gradient: "from-purple-600 to-pink-600" },
            { label: "GitHub Repos", value: "22", gradient: "from-orange-600 to-yellow-600" },
          ].map((stat, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05, y: -5 }}
              className="relative group"
            >
              <div className={`absolute -inset-0.5 bg-gradient-to-r ${stat.gradient} rounded-xl opacity-0 group-hover:opacity-20 blur-lg transition-all duration-500`} />
              <div className="relative bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl border border-white/10 rounded-xl p-6 text-center shadow-lg">
                <div className={`text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent`}>
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default About
