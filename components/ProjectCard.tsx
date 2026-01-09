import { Star, GitFork, Github, ExternalLink } from "lucide-react"
import Image from "next/image"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

interface Contributor {
  login: string
  avatar_url: string
  html_url: string
  contributions: number
}

interface ProjectCardProps {
  name: string
  owner: string
  description: string
  stars: number
  forks: number
  language: string | null
  languages: string[]
  topics: string[]
  url: string
  homepage: string | null
  contributors: Contributor[]
  contributorCount: number
  title?: string
  longDescription?: string
}

export default function ProjectCard({
  name,
  owner,
  description,
  stars,
  forks,
  language,
  languages,
  topics,
  url,
  homepage,
  contributors,
  contributorCount,
  title,
  longDescription,
}: ProjectCardProps) {
  return (
    <Card className="group flex flex-col h-full overflow-hidden border-gray-700/50 bg-gray-900/30 hover:border-[#e5a54b]/50 hover:shadow-xl transition-all duration-300">
      <CardHeader className="pb-3">
        <CardTitle className="text-xl font-semibold text-white group-hover:text-[#e5a54b] transition-colors">
          {title || name}
        </CardTitle>
        <CardDescription className="text-gray-400 line-clamp-2">
          {longDescription || description}
        </CardDescription>
      </CardHeader>

      <CardContent className="flex-1 space-y-4">
        {/* Stats Row */}
        <div className="flex items-center gap-3">
          <Badge variant="outline" className="gap-1.5 border-gray-700 text-gray-300">
            <Star className="w-3 h-3" />
            {stars}
          </Badge>
          <Badge variant="outline" className="gap-1.5 border-gray-700 text-gray-300">
            <GitFork className="w-3 h-3" />
            {forks}
          </Badge>
          {contributors.length > 0 && (
            <div className="flex items-center -space-x-2 ml-auto">
              {contributors.slice(0, 3).map((contributor, i) => (
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
          )}
        </div>

        {/* Tech Stack */}
        <div className="flex gap-2 flex-wrap">
          {languages.length > 0 ? (
            languages.slice(0, 6).map((lang) => (
              <Badge key={lang} className="bg-blue-900/30 border-blue-700/50 text-blue-300">
                {lang}
              </Badge>
            ))
          ) : language && (
            <Badge className="bg-blue-900/30 border-blue-700/50 text-blue-300">
              {language}
            </Badge>
          )}
          {topics.slice(0, 5).map((tag) => (
            <Badge key={tag} variant="outline" className="border-gray-700 text-gray-400">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>

      <CardFooter className="gap-2 pt-4">
        <Button
          variant="outline"
          className="flex-1 border-gray-700 text-gray-300 hover:bg-gray-800"
          asChild
        >
          <a href={url} target="_blank" rel="noopener noreferrer">
            <Github className="w-4 h-4 mr-2" />
            View Code
          </a>
        </Button>
        {homepage && (
          <Button
            className="flex-1 bg-[#e5a54b] hover:bg-[#e5a54b]/90 text-[#1e293b]"
            asChild
          >
            <a href={homepage} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="w-4 h-4 mr-2" />
              Visit Site
            </a>
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}
