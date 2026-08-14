"use client"

import { motion } from "framer-motion"
import { Github, Linkedin, Mail } from "lucide-react"
import Image from "next/image"

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
            <div className="w-full max-w-[350px] h-[400px] rounded-2xl overflow-hidden">
              <Image
                src="/avatar.png"
                alt="Ionut Cioncu - Professional Avatar"
                width={350}
                height={400}
                className="w-full h-full object-cover"
                priority
              />
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
              Hey! I&apos;m <span className="text-foreground font-semibold">Ionut Cioncu</span> — a <span className="text-foreground font-semibold">QA Engineer</span> with 4+ years of experience across <span className="text-accent-dynamic font-semibold underline decoration-accent-dynamic">Maritime Logistics</span> and <span className="text-accent-dynamic font-semibold underline decoration-accent-dynamic">Payments</span>, based in <span className="text-foreground font-semibold">Romania</span>. I test with <span className="text-accent-dynamic font-semibold underline decoration-accent-dynamic">context</span> — understanding the business flow, how systems interact, and why we&apos;re building something, not just checking if it works.
            </p>

            <p className="text-muted-foreground">
              At <span className="text-foreground font-medium">Endava</span>, I&apos;ve worked heavily with <span className="text-foreground font-medium">REST APIs</span>, <span className="text-foreground font-medium">PostgreSQL</span>, <span className="text-foreground font-medium">microservices</span>, and third-party integrations, becoming a <span className="text-foreground font-medium">QA Subject Matter Expert</span> along the way. On the Payments side, I&apos;ve worked with <span className="text-foreground font-medium">Kafka</span>, <span className="text-foreground font-medium">Cosmos DB</span>, <span className="text-foreground font-medium">Azure tools</span>, <span className="text-foreground font-medium">Kubernetes</span>, and <span className="text-foreground font-medium">PowerShell</span> to validate transaction data and investigate issues across distributed services.
            </p>

            <p className="text-muted-foreground">
              I&apos;ve also built <a href="/projects" className="text-accent-dynamic font-semibold underline decoration-accent-dynamic hover:text-accent-dynamic/80 transition-colors">personal projects</a> to grow my automation and engineering skills. I&apos;m hands-on with <span className="text-foreground font-medium">Playwright</span>, <span className="text-foreground font-medium">Selenium</span>, and <span className="text-foreground font-medium">Cypress</span>, and I also explore AI-assisted engineering areas such as <span className="text-foreground font-medium">prompt/context engineering</span>, <span className="text-foreground font-medium">LLM testing</span>, and <span className="text-foreground font-medium">MCP</span>.
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
                href="mailto:contact@lonut.dev"
                aria-label="Send me an email"
                className="flex items-center gap-2 text-muted-foreground hover:text-accent-dynamic transition-colors"
              >
                <Mail className="h-5 w-5" aria-hidden="true" />
                <span className="text-sm">Email</span>
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default About
