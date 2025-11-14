"use client"

import { motion } from "framer-motion"
import { Mail, MapPin, Github, Send, MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"

const Contact = () => {
  const contactMethods = [
    {
      icon: Mail,
      title: "Email",
      value: "contact@ionut.dev",
      action: "mailto:contact@ionut.dev",
      gradient: "from-blue-600 to-cyan-600",
    },
    {
      icon: Github,
      title: "GitHub",
      value: "@ionutcnu",
      action: "https://github.com/ionutcnu",
      gradient: "from-purple-600 to-pink-600",
    },
    {
      icon: MapPin,
      title: "Location",
      value: "Romania",
      gradient: "from-green-600 to-emerald-600",
    },
  ]

  return (
    <section id="contact" className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-primary/10" />
      <div className="absolute inset-0 bg-grid-white/5 bg-[size:50px_50px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Let&apos;s <span className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">Connect</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Have a project in mind or want to collaborate? I&apos;d love to hear from you!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Contact Methods */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            {contactMethods.map((method, index) => {
              const Icon = method.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ scale: 1.02, y: -5 }}
                  className="group relative"
                >
                  <div className={`absolute -inset-0.5 bg-gradient-to-r ${method.gradient} rounded-2xl opacity-0 group-hover:opacity-20 blur-xl transition-all duration-500`} />

                  <div className="relative bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-xl">
                    <div className="flex items-center gap-4">
                      <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${method.gradient} flex items-center justify-center shadow-lg`}>
                        <Icon className="h-7 w-7 text-white" />
                      </div>
                      <div className="flex-grow">
                        <div className="text-sm text-muted-foreground mb-1">{method.title}</div>
                        {method.action ? (
                          <a
                            href={method.action}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-lg font-semibold hover:text-primary transition-colors"
                          >
                            {method.value}
                          </a>
                        ) : (
                          <div className="text-lg font-semibold">{method.value}</div>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </motion.div>

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative group"
          >
            <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-purple-600 rounded-2xl opacity-20 blur-xl group-hover:opacity-30 transition-all duration-500" />

            <div className="relative h-full bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-xl flex flex-col justify-center items-center text-center">
              <motion.div
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="mb-6"
              >
                <MessageSquare className="h-20 w-20 text-primary" />
              </motion.div>

              <h3 className="text-2xl font-bold mb-4">Ready to Start a Project?</h3>
              <p className="text-muted-foreground mb-8 max-w-md">
                Whether it&apos;s a new venture, collaboration, or just a chat about tech,
                I&apos;m always excited to connect with fellow developers and innovators.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="group/btn shadow-lg shadow-primary/20">
                  <a href="mailto:contact@ionut.dev">
                    <Send className="mr-2 h-5 w-5 group-hover/btn:translate-x-1 transition-transform" />
                    Send Email
                  </a>
                </Button>
                <Button asChild variant="outline" size="lg" className="group/btn backdrop-blur-sm">
                  <a href="https://github.com/ionutcnu" target="_blank" rel="noopener noreferrer">
                    <Github className="mr-2 h-5 w-5 group-hover/btn:rotate-12 transition-transform" />
                    GitHub Profile
                  </a>
                </Button>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Social Proof / Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center"
        >
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-white/5 to-white/10 backdrop-blur-xl border border-white/10 shadow-xl">
            <div className="flex -space-x-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-600 to-cyan-600 border-2 border-background" />
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 border-2 border-background" />
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-600 to-emerald-600 border-2 border-background" />
            </div>
            <span className="text-sm text-muted-foreground">
              Open to <span className="text-primary font-semibold">collaboration</span> and <span className="text-primary font-semibold">new opportunities</span>
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Contact
