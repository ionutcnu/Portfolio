"use client"

import { Star, GitFork, Github, ExternalLink } from "lucide-react"
import Image from "next/image"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

// Mock data
const mockRepo = {
  name: "BATS",
  owner: "ionutcnu",
  description: "Built a tool to understand how ATS systems work and optimize job applications",
  longDescription: "BATS is a tool designed to analyze and optimize job applications for Applicant Tracking Systems (ATS).",
  stars: 42,
  forks: 8,
  languages: ["TypeScript", "React", "Next.js"],
  topics: ["ats", "job-search", "resume"],
  url: "https://github.com/ionutcnu/BATS",
  websiteUrl: "https://bats.ionut.dev",
  contributors: [
    {
      login: "ionutcnu",
      avatar_url: "https://avatars.githubusercontent.com/u/12345678?v=4",
      contributions: 45
    },
    {
      login: "contributor2",
      avatar_url: "https://avatars.githubusercontent.com/u/9919?v=4",
      contributions: 12
    }
  ],
  contributorCount: 2
}

export default function CardsDraftPage() {
  return (
    <main className="min-h-screen bg-[#1e1e2e] py-12 px-4">
      <div className="max-w-7xl mx-auto space-y-16">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-white">Project Card Design Options</h1>
          <p className="text-gray-400">Compare the three design variants below</p>
        </div>

        {/* Option 1: Clean Elevated Card */}
        <section className="space-y-6">
          <div>
            <h2 className="text-2xl font-semibold text-[#e5a54b] mb-2">Option 1: Clean Elevated Card</h2>
            <p className="text-gray-400 text-sm">Simple, clean, flat card with subtle hover effects. Professional look.</p>
          </div>
          <div className="max-w-2xl">
            <Card className="group overflow-hidden border-gray-700/50 bg-gray-900/30 hover:border-[#e5a54b]/50 hover:shadow-xl transition-all duration-300">
              <CardHeader className="pb-3">
                <CardTitle className="text-xl font-semibold text-white group-hover:text-[#e5a54b] transition-colors">
                  {mockRepo.name}
                </CardTitle>
                <CardDescription className="text-gray-400 line-clamp-2">
                  {mockRepo.longDescription}
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Stats Row */}
                <div className="flex items-center gap-3">
                  <Badge variant="outline" className="gap-1.5 border-gray-700 text-gray-300">
                    <Star className="w-3 h-3" />
                    {mockRepo.stars}
                  </Badge>
                  <Badge variant="outline" className="gap-1.5 border-gray-700 text-gray-300">
                    <GitFork className="w-3 h-3" />
                    {mockRepo.forks}
                  </Badge>
                  <div className="flex items-center -space-x-2 ml-auto">
                    {mockRepo.contributors.map((contributor, i) => (
                      <Image
                        key={i}
                        src={contributor.avatar_url}
                        alt={contributor.login}
                        width={32}
                        height={32}
                        className="w-8 h-8 rounded-full border-2 border-gray-900"
                      />
                    ))}
                  </div>
                </div>

                {/* Tech Stack */}
                <div className="flex gap-2 flex-wrap">
                  {mockRepo.languages.map(lang => (
                    <Badge key={lang} className="bg-blue-900/30 border-blue-700/50 text-blue-300">
                      {lang}
                    </Badge>
                  ))}
                  {mockRepo.topics.map(tag => (
                    <Badge key={tag} variant="outline" className="border-gray-700 text-gray-400">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>

              <CardFooter className="gap-2 pt-4">
                <Button variant="outline" className="flex-1 border-gray-700 text-gray-300 hover:bg-gray-800" asChild>
                  <a href={mockRepo.url} target="_blank" rel="noopener noreferrer">
                    <Github className="w-4 h-4 mr-2" />
                    View Code
                  </a>
                </Button>
                <Button className="flex-1 bg-[#e5a54b] hover:bg-[#e5a54b]/90 text-[#1e293b]" asChild>
                  <a href={mockRepo.websiteUrl} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Visit Site
                  </a>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </section>

        {/* Option 2: Split Horizontal Layout */}
        <section className="space-y-6">
          <div>
            <h2 className="text-2xl font-semibold text-[#e5a54b] mb-2">Option 2: Split Horizontal Layout</h2>
            <p className="text-gray-400 text-sm">Wider card with left colored panel for visual interest, better content hierarchy.</p>
          </div>
          <div className="max-w-4xl">
            <Card className="group grid md:grid-cols-[240px_1fr] overflow-hidden border-gray-700/50 bg-gray-900/30 hover:border-[#e5a54b]/50 transition-all">
              {/* Left Visual Section */}
              <div className="relative bg-gradient-to-br from-[#e5a54b]/20 via-purple-500/10 to-cyan-500/20 p-6 flex flex-col justify-between border-r border-gray-700/30">
                <div className="space-y-2">
                  <Badge variant="secondary" className="gap-1.5 bg-gray-900/50 border-gray-700">
                    <Star className="w-3 h-3 fill-current" />
                    {mockRepo.stars}
                  </Badge>
                  <Badge variant="secondary" className="gap-1.5 bg-gray-900/50 border-gray-700">
                    <GitFork className="w-3 h-3" />
                    {mockRepo.forks}
                  </Badge>
                </div>

                {/* Large Project Icon */}
                <div className="text-7xl opacity-20 text-center my-4">
                  📦
                </div>

                {/* Contributors */}
                <div className="flex -space-x-2">
                  {mockRepo.contributors.map((contributor, i) => (
                    <Image
                      key={i}
                      src={contributor.avatar_url}
                      alt={contributor.login}
                      width={32}
                      height={32}
                      className="w-8 h-8 rounded-full border-2 border-gray-900"
                    />
                  ))}
                </div>
              </div>

              {/* Right Content Section */}
              <div className="flex flex-col p-6">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-2 text-white group-hover:text-[#e5a54b] transition-colors">
                    {mockRepo.name}
                  </h3>
                  <p className="text-gray-400 text-sm mb-4 line-clamp-3">
                    {mockRepo.longDescription}
                  </p>

                  <div className="flex gap-2 flex-wrap">
                    {mockRepo.languages.map(lang => (
                      <Badge key={lang} className="bg-blue-900/30 border-blue-700/50 text-blue-300">
                        {lang}
                      </Badge>
                    ))}
                    {mockRepo.topics.map(tag => (
                      <Badge key={tag} variant="outline" className="border-gray-700 text-gray-400">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Buttons at bottom */}
                <div className="flex gap-2 mt-4 pt-4 border-t border-gray-700/30">
                  <Button variant="outline" size="sm" className="flex-1 border-gray-700 text-gray-300 hover:bg-gray-800" asChild>
                    <a href={mockRepo.url} target="_blank" rel="noopener noreferrer">
                      <Github className="w-4 h-4 mr-2" />
                      View Code
                    </a>
                  </Button>
                  <Button size="sm" className="flex-1 bg-[#e5a54b] hover:bg-[#e5a54b]/90 text-[#1e293b]" asChild>
                    <a href={mockRepo.websiteUrl} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Visit Site
                    </a>
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </section>

        {/* Option 3: Modern Terminal Glassmorphism */}
        <section className="space-y-6">
          <div>
            <h2 className="text-2xl font-semibold text-[#e5a54b] mb-2">Option 3: Modern Terminal (Glassmorphism)</h2>
            <p className="text-gray-400 text-sm">Retains terminal aesthetic but with modern glass effects, gradients, floating badges.</p>
          </div>
          <div className="max-w-2xl">
            <Card className="group overflow-hidden border-gray-700/30 bg-gray-900/20 backdrop-blur-sm hover:border-[#e5a54b]/50 hover:bg-gray-900/40 transition-all">
              {/* Modern Terminal Header */}
              <div className="bg-gradient-to-r from-gray-800/50 to-gray-800/30 px-4 py-3 backdrop-blur-md border-b border-gray-700/30">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/70 ring-1 ring-red-400/30 shadow-lg shadow-red-500/20"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500/70 ring-1 ring-yellow-400/30 shadow-lg shadow-yellow-500/20"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500/70 ring-1 ring-green-400/30 shadow-lg shadow-green-500/20"></div>
                  </div>

                  {/* Floating Stats */}
                  <div className="flex gap-3">
                    <Badge variant="secondary" className="backdrop-blur-sm bg-gray-900/50 border-gray-700">
                      <Star className="w-3 h-3 mr-1 fill-current" />
                      {mockRepo.stars}
                    </Badge>
                    <Badge variant="secondary" className="backdrop-blur-sm bg-gray-900/50 border-gray-700">
                      <GitFork className="w-3 h-3 mr-1" />
                      {mockRepo.forks}
                    </Badge>
                  </div>
                </div>
              </div>

              <CardContent className="p-6 space-y-4">
                <div>
                  <h3 className="font-mono text-lg mb-2">
                    <span className="text-pink-400">{mockRepo.owner}</span>
                    <span className="text-gray-500"> / </span>
                    <span className="text-green-400 font-semibold">{mockRepo.name}</span>
                  </h3>
                  <p className="text-gray-300 text-sm">
                    {mockRepo.longDescription}
                  </p>
                </div>

                {/* Tech Pills with Glass Effect */}
                <div className="flex gap-2 flex-wrap">
                  {mockRepo.languages.map(lang => (
                    <Badge key={lang} className="bg-blue-500/10 border-blue-500/30 backdrop-blur-sm text-blue-300">
                      {lang}
                    </Badge>
                  ))}
                  {mockRepo.topics.map(tag => (
                    <Badge key={tag} className="bg-gray-500/10 border-gray-500/30 backdrop-blur-sm text-gray-400">
                      {tag}
                    </Badge>
                  ))}
                </div>

                {/* Contributors Row */}
                <div className="flex items-center justify-between pt-2">
                  <div className="flex -space-x-2">
                    {mockRepo.contributors.map((contributor, i) => (
                      <Image
                        key={i}
                        src={contributor.avatar_url}
                        alt={contributor.login}
                        width={32}
                        height={32}
                        className="w-8 h-8 rounded-full border-2 border-gray-800 ring-1 ring-gray-700/50"
                      />
                    ))}
                  </div>
                  <span className="text-xs text-gray-500">
                    {mockRepo.contributorCount} contributors
                  </span>
                </div>
              </CardContent>

              <CardFooter className="gap-2 bg-gray-900/30 backdrop-blur-sm border-t border-gray-700/30">
                <Button variant="ghost" className="flex-1 text-gray-300 hover:bg-gray-800/50" asChild>
                  <a href={mockRepo.url} target="_blank" rel="noopener noreferrer">
                    <Github className="w-4 h-4 mr-2" />
                    Code
                  </a>
                </Button>
                <Button className="flex-1 bg-[#e5a54b] hover:bg-[#e5a54b]/90 text-[#1e293b]" asChild>
                  <a href={mockRepo.websiteUrl} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Live
                  </a>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </section>

        <div className="text-center py-8">
          <p className="text-gray-500 text-sm">Navigate to /drafts/cards to view this page</p>
        </div>
      </div>
    </main>
  )
}
