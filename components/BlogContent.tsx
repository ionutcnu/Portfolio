"use client"

import { motion } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function BlogContent() {
  return (
    <main className="min-h-screen pt-20">
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-accent-dynamic/10 border border-accent-dynamic/20">
              <Sparkles className="h-4 w-4 text-accent-dynamic" />
              <span className="text-sm font-medium text-accent-dynamic">Coming Soon</span>
            </div>

            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Blog & <span className="bg-gradient-to-r from-accent-dynamic to-blue-600 bg-clip-text text-transparent">Thoughts</span>
            </h1>

            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              I&apos;m working on sharing insights about product thinking, QA methodologies,
              and tech explorations. Stay tuned!
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="max-w-2xl mx-auto"
          >
            <Card className="border-accent-dynamic/20 bg-gradient-to-br from-accent-dynamic/5 to-transparent shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl">What to Expect</CardTitle>
                <CardDescription className="text-base">
                  Future content will cover:
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-accent-dynamic mt-2" />
                    <div>
                      <p className="font-medium text-foreground">Product Thinking</p>
                      <p className="text-sm text-muted-foreground">
                        How to ask &apos;why&apos; before &apos;how&apos; and build products users actually need
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-accent-dynamic mt-2" />
                    <div>
                      <p className="font-medium text-foreground">QA Methodologies</p>
                      <p className="text-sm text-muted-foreground">
                        Testing strategies, automation, and quality assurance best practices
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-accent-dynamic mt-2" />
                    <div>
                      <p className="font-medium text-foreground">Tech Explorations</p>
                      <p className="text-sm text-muted-foreground">
                        AI tools, modern frameworks, and building with transparency
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-accent-dynamic mt-2" />
                    <div>
                      <p className="font-medium text-foreground">Career Insights</p>
                      <p className="text-sm text-muted-foreground">
                        Transitioning from QA to Product Owner roles
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-accent-dynamic/20">
                  <p className="text-sm text-muted-foreground text-center">
                    In the meantime, check out my projects and skills to see what I&apos;ve been building.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 mt-4 justify-center">
                    <Button asChild variant="outline">
                      <Link href="/projects">
                        View Projects
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                    <Button asChild variant="outline">
                      <Link href="/skills">
                        See Skills
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
