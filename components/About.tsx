"use client"

import { motion } from "framer-motion"
import { Github, Linkedin, Mail } from "lucide-react"

const About = () => {
  return (
    <section id="about" className="py-16 mb-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-4xl md:text-5xl font-bold mb-12"
        >
          About Me
        </motion.h2>

        <div className="grid grid-cols-1 lg:grid-cols-[350px_1fr] gap-8 lg:gap-16">
          {/* Avatar Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex justify-center lg:justify-start"
          >
            <div className="w-full max-w-[350px] h-[400px] bg-gradient-to-br from-cyan-400 to-cyan-500 rounded-2xl flex items-center justify-center">
              <div className="text-center text-cyan-50">
                <div className="w-32 h-32 mx-auto mb-4 bg-cyan-300/30 rounded-full flex items-center justify-center">
                  <span className="text-4xl" role="img" aria-label="Developer working on laptop">👨‍💻</span>
                </div>
                <p className="text-sm opacity-90">Professional Avatar</p>
              </div>
            </div>
          </motion.div>

          {/* Content Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-6 text-base leading-relaxed"
          >
            <p className="text-muted-foreground">
              Hey! I'm <span className="text-foreground font-semibold">Ionut Cioncu</span> — a <span className="text-foreground font-semibold">QA Tester</span> with 4 years of multi-domain experience based in <span className="text-foreground font-semibold">Pitesti, Romania</span>. I test with <span className="text-accent-dynamic font-semibold underline decoration-accent-dynamic">context</span> — understanding why we're building something, not just checking if it works.
            </p>

            <p className="text-muted-foreground">
              At <span className="text-foreground font-medium">Endava PLC</span>, I work across <span className="text-accent-dynamic font-semibold underline decoration-accent-dynamic">Naval Shipping</span> and <span className="text-accent-dynamic font-semibold underline decoration-accent-dynamic">Payments</span> domains. In Naval Shipping, I conducted <span className="text-foreground font-medium">REST API testing</span> with Postman, validated <span className="text-foreground font-medium">payment flows</span>, wrote <span className="text-foreground font-medium">SQL scripts</span> for PostgreSQL, and became the <span className="text-foreground font-medium">QA SME</span>. In Payments, I maintained <span className="text-foreground font-medium">Kubernetes scripts</span>, used <span className="text-foreground font-medium">Azure tools</span>, and validated data across <span className="text-foreground font-medium">microservices</span> and <span className="text-foreground font-medium">Kafka</span>.
            </p>

            <p className="text-muted-foreground">
              I've also built some <a href="/projects" className="text-accent-dynamic font-semibold underline decoration-accent-dynamic hover:text-accent-dynamic/80 transition-colors">personal projects</a>. Besides projects, I like to explore <span className="text-foreground font-medium">AI tools</span> (MCP, Claude/GPT), <span className="text-foreground font-medium">automation</span> (Selenium, Cypress), and continuous learning.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-6 pt-6">
              <a
                href="https://github.com/ionutcnu"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit my GitHub profile"
                className="flex items-center gap-2 text-muted-foreground hover:text-accent-dynamic transition-colors"
              >
                <Github className="h-5 w-5" aria-hidden="true" />
                <span className="text-sm">GitHub</span>
              </a>
              <a
                href="https://linkedin.com/in/cioncu"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit my LinkedIn profile"
                className="flex items-center gap-2 text-muted-foreground hover:text-accent-dynamic transition-colors"
              >
                <Linkedin className="h-5 w-5" aria-hidden="true" />
                <span className="text-sm">LinkedIn</span>
              </a>
              <a
                href="mailto:cioncu_ionut@yahoo.com"
                aria-label="Send me an email"
                className="flex items-center gap-2 text-muted-foreground hover:text-accent-dynamic transition-colors"
              >
                <Mail className="h-5 w-5" aria-hidden="true" />
                <span className="text-sm">cioncu_ionut@yahoo.com</span>
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default About
