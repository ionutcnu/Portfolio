"use client"

import { motion } from "framer-motion"
import { Brain, Eye, Target, Users } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const About = () => {
  const features = [
    {
      icon: Eye,
      title: "User Perspective",
      description: "Always starting with 'What does the user actually need?' before diving into features.",
    },
    {
      icon: Target,
      title: "Business Goals",
      description: "Understanding the why behind every requirement. Context matters more than tickets.",
    },
    {
      icon: Brain,
      title: "Technical Constraints",
      description: "Speaking dev, architect, QA, FE, BE - wearing every hat to see the full picture.",
    },
    {
      icon: Users,
      title: "Team Dynamics",
      description: "Building bridges between roles. Leo energy meets collaborative problem-solving.",
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

  return (
    <section id="about" className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            The <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">Story</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-12 text-center"
        >
          <Card className="max-w-4xl mx-auto border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
            <CardContent className="text-muted-foreground space-y-4 pt-6 text-lg">
              <p className="text-foreground">
                I&apos;m the person who asks <span className="text-primary font-semibold">&apos;why&apos;</span> before{" "}
                <span className="text-primary font-semibold">&apos;how&apos;</span>.
              </p>
              <p className="text-foreground/80">
                Currently in QA, but I&apos;ve been told more than once that I should be a Product Owner or Business Analyst.
                Maybe they&apos;re right. That&apos;s because I don&apos;t just test tickets—I understand the <span className="text-foreground font-medium">business context</span>,
                question if we&apos;re solving the <span className="text-foreground font-medium">right problem</span>, and think from the{" "}
                <span className="text-foreground font-medium">user&apos;s perspective first</span>.
              </p>
              <p>
                I can wear different hats: developer, architect, QA, frontend, backend. Call it holistic thinking.
                Call it being a Leo. I call it <span className="text-foreground font-medium">understanding the full story</span> before
                making decisions.
              </p>
              <p>
                And yes, I use AI tools. Not to pretend I&apos;m something I&apos;m not, but because the goal isn&apos;t just to write code—it&apos;s to{" "}
                <span className="text-foreground font-medium">solve problems that matter</span>. I&apos;m transparent about my process:
                I learn, I experiment, I build things that work.
              </p>
              <div className="pt-6 border-t border-primary/20">
                <p className="text-foreground font-medium text-xl">
                  I see the complete picture: user needs, business goals, and technical constraints.
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center"
        >
          <h3 className="text-2xl md:text-3xl font-bold mb-8">How I Think</h3>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <motion.div key={index} variants={itemVariants}>
                  <Card className="h-full hover:shadow-lg transition-shadow duration-300 border-muted">
                    <CardHeader>
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      <CardTitle>{feature.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-base">
                        {feature.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default About
