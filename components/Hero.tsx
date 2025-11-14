"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { ArrowDown, Github, Mail, MapPin, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { useRef } from "react"
import ParticleBackground from "./ParticleBackground"

const Hero = () => {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0])

  return (
    <section
      ref={ref}
      id="home"
      className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-b from-background via-background to-primary/5"
    >
      <ParticleBackground />

      {/* Animated mesh gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-blue-500/20 via-transparent to-transparent" />

      <motion.div style={{ y, opacity }} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Text content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-sm"
            >
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">Available for opportunities</span>
            </motion.div>

            <div>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-6xl md:text-8xl font-bold mb-6 leading-tight"
              >
                <span className="block">Hi, I&apos;m</span>
                <span className="block bg-gradient-to-r from-primary via-blue-500 to-purple-600 bg-clip-text text-transparent animate-gradient bg-[length:200%_auto]">
                  Ionut
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-2xl md:text-3xl font-semibold text-foreground/80 mb-4"
              >
                Full Stack Developer
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="flex items-center gap-2 text-muted-foreground mb-6"
              >
                <MapPin className="h-5 w-5" />
                <span className="text-lg">Romania</span>
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="text-lg text-muted-foreground leading-relaxed"
              >
                Crafting innovative digital experiences with{" "}
                <span className="text-primary font-semibold">TypeScript</span>,{" "}
                <span className="text-blue-500 font-semibold">Python</span>, and{" "}
                <span className="text-purple-500 font-semibold">C#</span>.
                Passionate about AI automation and building solutions that matter.
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="flex flex-wrap gap-4"
            >
              <Button asChild size="lg" className="group shadow-lg shadow-primary/20">
                <a href="#contact">
                  <Mail className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                  Let&apos;s Talk
                </a>
              </Button>
              <Button asChild variant="outline" size="lg" className="group backdrop-blur-sm">
                <a href="https://github.com/ionutcnu" target="_blank" rel="noopener noreferrer">
                  <Github className="mr-2 h-5 w-5 group-hover:rotate-12 transition-transform" />
                  GitHub
                </a>
              </Button>
            </motion.div>
          </motion.div>

          {/* Right side - 3D Avatar Card */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative hidden lg:flex items-center justify-center"
          >
            <motion.div
              whileHover={{ scale: 1.02, rotateY: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="relative group"
              style={{ perspective: "1000px" }}
            >
              {/* Glowing background */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/40 to-purple-500/40 rounded-3xl blur-3xl group-hover:blur-2xl transition-all duration-500" />

              {/* Glass card */}
              <div className="relative w-80 h-80 rounded-3xl overflow-hidden border border-white/10 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl shadow-2xl">
                <Image
                  src="https://avatars.githubusercontent.com/u/25122138?v=4"
                  alt="Ionut"
                  fill
                  className="object-cover mix-blend-luminosity group-hover:mix-blend-normal transition-all duration-500"
                />

                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />

                {/* Floating elements */}
                <motion.div
                  animate={{
                    y: [0, -10, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute top-4 right-4 w-16 h-16 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 opacity-20 blur-xl"
                />
                <motion.div
                  animate={{
                    y: [0, 10, 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute bottom-8 left-4 w-20 h-20 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 opacity-20 blur-xl"
                />
              </div>

              {/* Floating stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
                className="absolute -bottom-4 -right-4 px-6 py-3 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/10 shadow-xl"
              >
                <div className="text-center">
                  <div className="text-2xl font-bold bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent">22</div>
                  <div className="text-xs text-muted-foreground">Projects</div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 }}
                className="absolute -top-4 -left-4 px-6 py-3 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/10 shadow-xl"
              >
                <div className="text-center">
                  <div className="text-2xl font-bold bg-gradient-to-r from-green-400 to-emerald-600 bg-clip-text text-transparent">8+</div>
                  <div className="text-xs text-muted-foreground">Years Exp</div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.a
            href="#about"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="flex flex-col items-center gap-2 text-muted-foreground hover:text-primary transition-colors group"
          >
            <span className="text-sm">Scroll to explore</span>
            <ArrowDown className="h-6 w-6 group-hover:translate-y-1 transition-transform" />
          </motion.a>
        </motion.div>
      </motion.div>
    </section>
  )
}

export default Hero
