import { BookMarked, ExternalLink, GitFork, Github, Star } from "lucide-react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { Contributor } from "@/types/github";
import ProjectTechnologies from "./ProjectTechnologies";
import TiltSurface from "./TiltSurface";

interface ProjectCardProps {
  name: string;
  owner: string;
  description: string;
  stars: number;
  forks: number;
  language: string | null;
  languages: string[];
  topics: string[];
  url: string;
  homepage: string | null;
  contributors: Contributor[];
  contributorCount: number;
  compact?: boolean;
  title?: string;
  longDescription?: string;
}

function isValidUrl(urlString: string | null): boolean {
  if (!urlString) return false;
  try {
    const url = new URL(urlString);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
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
  compact = false,
  title,
  longDescription,
}: ProjectCardProps) {
  const validUrl = isValidUrl(url) ? url : "#";
  const validHomepage = isValidUrl(homepage) ? homepage : null;
  if (compact)
    return (
      <TiltSurface className="portfolio-project-card project-brief project-from-github">
        <div className="project-repo-header">
          <span className="project-repo-owner">
            <BookMarked size={18} aria-hidden="true" />
            {owner}
          </span>
          <span className="project-repo-stats">
            <span title="Stars">
              <Star size={14} aria-hidden="true" />
              {stars}
            </span>
            <span title="Forks">
              <GitFork size={14} aria-hidden="true" />
              {forks}
            </span>
          </span>
        </div>
        <div className="project-brief-body">
          <h3>{title || name}</h3>
          <p className="project-brief-description">
            {longDescription || description || "Explore the source code and project details."}
          </p>
          <div className="project-card-meta">
            <div className="project-card-technologies">
              <span className="project-meta-label">Technologies</span>
              <ProjectTechnologies
                languages={languages.length ? languages : language ? [language] : []}
                topics={topics}
              />
            </div>
            <div className="project-card-destinations">
              <span className="project-meta-label">Links</span>
              <div className="project-icon-links">
                <a
                  href={validUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`View ${name} on GitHub`}
                  title="View code on GitHub"
                >
                  <Github size={22} aria-hidden="true" />
                </a>
                {validHomepage && (
                  <a
                    href={validHomepage}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Visit ${name} website`}
                    title="Visit website"
                  >
                    <ExternalLink size={21} aria-hidden="true" />
                  </a>
                )}
              </div>
            </div>
          </div>
          <div className="project-brief-bottom">
            <details className="project-brief-details">
              <summary>Details</summary>
              <div>
                <p>
                  {stars} stars / {forks} forks / {contributorCount} contributors
                </p>
                {languages.length > 0 && <p>{languages.join(" / ")}</p>}
                {topics.length > 0 && <p>{topics.join(" / ")}</p>}
                {contributors.length > 0 && (
                  <p>Contributors: {contributors.map((person) => person.login).join(", ")}</p>
                )}
              </div>
            </details>
          </div>
        </div>
      </TiltSurface>
    );
  return (
    <Card className="portfolio-project-card group flex flex-col h-full overflow-hidden border-gray-700/50 bg-gray-900/30 hover:border-[#e5a54b]/50 hover:shadow-xl transition-colors duration-300">
      <CardHeader className="pb-3">
        <CardTitle className="text-xl font-semibold text-white group-hover:text-[#e5a54b] transition-colors">
          {title || name}
        </CardTitle>
        <CardDescription className="text-gray-400 leading-relaxed">
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
              {contributors.slice(0, 3).map((contributor) => (
                <Image
                  key={contributor.login}
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
          {languages.length > 0
            ? languages.slice(0, 6).map((lang) => (
                <Badge key={lang} className="bg-blue-900/30 border-blue-700/50 text-blue-300">
                  {lang}
                </Badge>
              ))
            : language && (
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
          <a href={validUrl} target="_blank" rel="noopener noreferrer">
            <Github className="w-4 h-4 mr-2" />
            View Code
          </a>
        </Button>
        {validHomepage && (
          <Button className="flex-1 bg-[#e5a54b] hover:bg-[#e5a54b]/90 text-[#1e293b]" asChild>
            <a href={validHomepage} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="w-4 h-4 mr-2" />
              Visit Site
            </a>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
