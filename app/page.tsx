"use client"

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Briefcase, Code, Wrench, BookOpen } from "lucide-react";
import Navigation from "@/components/Navigation";
import BentoGrid from "@/components/bento/BentoGrid";
import IntroWidget from "@/components/bento/IntroWidget";
import ContactWidget from "@/components/bento/ContactWidget";
import StatsWidget from "@/components/bento/StatsWidget";
import ThemeSwitcher from "@/components/bento/ThemeSwitcher";
import AccentColorPicker from "@/components/bento/AccentColorPicker";
import ClickCounterWidget from "@/components/bento/ClickCounterWidget";
import GitHubCommitsWidget from "@/components/bento/GitHubCommitsWidget";
import LocationMapWidget from "@/components/bento/LocationMapWidget";
import Experience from "@/components/Experience";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function Home() {
  const quickLinks = [
    {
      title: "About Me",
      description: "Learn how I think: user perspective, business goals, technical constraints",
      icon: Briefcase,
      href: "/about",
      color: "from-blue-500/20 to-purple-500/20",
    },
    {
      title: "Projects",
      description: "Real problems solved with BATS, Watcher, browser-use, and more",
      icon: Code,
      href: "/projects",
      color: "from-purple-500/20 to-pink-500/20",
    },
    {
      title: "Skills",
      description: "Full-stack expertise: Frontend, Backend, AI, and modern technologies",
      icon: Wrench,
      href: "/skills",
      color: "from-pink-500/20 to-orange-500/20",
    },
    {
      title: "Blog",
      description: "Insights on product thinking, QA methodologies, and tech explorations",
      icon: BookOpen,
      href: "/blog",
      color: "from-orange-500/20 to-yellow-500/20",
    },
  ];

  return (
    <main className="min-h-screen">
      <Navigation />

      {/* Hero BentoGrid Section */}
      <div className="mx-auto max-w-6xl space-y-12 px-0 py-8 md:space-y-16 md:px-4 md:py-12">
        <BentoGrid>
          <IntroWidget />
          <ThemeSwitcher />
          <StatsWidget />
          <AccentColorPicker />
          <ContactWidget />
          <ClickCounterWidget />
          <GitHubCommitsWidget />
          <LocationMapWidget />
        </BentoGrid>

        {/* Experience Section */}
        <Experience />

        {/* Quick Links Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="py-12"
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Explore <span className="bg-gradient-to-r from-accent-dynamic to-blue-600 bg-clip-text text-transparent">More</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Dive deeper into my work, skills, and thinking process
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {quickLinks.map((link, index) => {
              const Icon = link.icon;
              return (
                <motion.div
                  key={link.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Link href={link.href}>
                    <Card className={`h-full shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer group hover:border-accent-dynamic/50 bg-gradient-to-br ${link.color}`}>
                      <CardHeader>
                        <div className="w-12 h-12 bg-accent-dynamic/10 rounded-lg flex items-center justify-center mb-3 group-hover:bg-accent-dynamic/20 transition-colors">
                          <Icon className="h-6 w-6 text-accent-dynamic" />
                        </div>
                        <CardTitle className="group-hover:text-accent-dynamic transition-colors">
                          {link.title}
                        </CardTitle>
                        <CardDescription className="text-base">
                          {link.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center text-accent-dynamic text-sm font-medium group-hover:translate-x-1 transition-transform">
                          Learn more <ArrowRight className="ml-1 h-4 w-4" />
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </motion.section>
      </div>

      <Footer />
    </main>
  );
}
