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
  showPreview?: boolean;
  title?: string;
  longDescription?: string;
}

const languageColors: Record<string, string> = {
  TypeScript: "#89b4fa",
  JavaScript: "#f9e2af",
  "C#": "#cba6f7",
  Shell: "#a6e3a1",
  HTML: "#fab387",
  CSS: "#89dceb",
  Python: "#f9e2af",
  PHP: "#b4befe",
  Vue: "#a6e3a1",
  Dockerfile: "#89b4fa",
  Batchfile: "#a6e3a1",
};
function languageColor(language: string): string {
  return languageColors[language] ?? "hsl(var(--accent-dynamic))";
}
const languageLogos: Record<string, string> = {
  TypeScript: "typescript",
  JavaScript: "javascript",
  CSS: "css3",
  HTML: "html5",
  "C#": "csharp",
  PHP: "php",
  Vue: "vuejs",
  Dockerfile: "docker",
};
const previews: Record<string, string> = {
  catchy: "/catchy-preview.png",
};

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
  showPreview = true,
  title,
  longDescription,
}: ProjectCardProps) {
  const validUrl = isValidUrl(url) ? url : "#";
  const validHomepage = isValidUrl(homepage) ? homepage : null;
  if (compact) {
    const preview = previews[name.toLowerCase()];
    const logo = language ? languageLogos[language] : undefined;
    return (
      <TiltSurface className="portfolio-project-card project-brief flex h-full min-w-0 flex-col overflow-hidden rounded-xl border border-border bg-[linear-gradient(180deg,rgba(205,214,244,.035),rgba(205,214,244,.015))]">
        {showPreview && preview && (
          <div className="relative aspect-[16/10] flex-none overflow-hidden bg-[#11111b]">
            <Image
              src={preview}
              alt={`${title || name} preview`}
              fill
              sizes="(max-width: 640px) 90vw, (max-width: 1000px) 45vw, 30vw"
              className="object-cover"
            />
            <span className="absolute right-2.5 top-2.5 inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-[#11111b]/60 px-2.5 py-1 text-[10px] tabular-nums backdrop-blur">
              <span className="inline-flex items-center gap-1">
                <Star size={11} aria-hidden="true" />
                {stars}
              </span>
              <span className="inline-flex items-center gap-1">
                <GitFork size={11} aria-hidden="true" />
                {forks}
              </span>
            </span>
          </div>
        )}
        <div
          className={`flex flex-1 flex-col gap-1.5 px-4 pt-3.5 pb-3 ${
            showPreview && preview ? "" : "justify-center"
          }`}
        >
          <div className="flex items-baseline justify-between gap-2.5">
            <h3 className="text-[15px] font-semibold leading-[1.35] tracking-[-0.02em] [overflow-wrap:anywhere]">
              {title || name}
            </h3>
            <span className="flex flex-none items-center gap-2">
              {!(showPreview && preview) && (
                <span className="inline-flex items-center gap-2 text-[10px] tabular-nums text-foreground/60">
                  <span className="inline-flex items-center gap-1">
                    <Star size={11} aria-hidden="true" />
                    {stars}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <GitFork size={11} aria-hidden="true" />
                    {forks}
                  </span>
                </span>
              )}
              {language &&
                (logo ? (
                  <Image
                    src={`/logos/${logo}.svg`}
                    alt={language}
                    title={language}
                    width={15}
                    height={15}
                    className="object-contain"
                  />
                ) : (
                  <span
                    className="h-2 w-2 rounded-full"
                    style={{ background: languageColor(language) }}
                    title={language}
                  />
                ))}
            </span>
          </div>
          <p className="line-clamp-1 text-[11.5px] leading-[1.65] text-foreground/70">
            {longDescription || description || "Explore the source code and project details."}
          </p>
          <ProjectTechnologies
            languages={languages.length ? languages : language ? [language] : []}
            topics={topics}
          />
        </div>
        <div className="mt-auto flex items-center justify-between gap-2.5 border-t border-border/70 px-4 py-2.5">
          <span className="text-[10px] text-foreground/45">{owner}</span>
          <div className="flex items-center gap-1">
            <a
              href={validUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View ${name} on GitHub`}
              title="View code on GitHub"
              className="inline-flex h-7 w-7 items-center justify-center rounded-md text-foreground/80 hover:bg-foreground/[0.08] hover:text-gold-soft"
            >
              <Github size={15} aria-hidden="true" />
            </a>
            {validHomepage && (
              <a
                href={validHomepage}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Visit ${name} website`}
                title="Visit website"
                className="inline-flex h-7 w-7 items-center justify-center rounded-md text-foreground/80 hover:bg-foreground/[0.08] hover:text-gold-soft"
              >
                <ExternalLink size={14} aria-hidden="true" />
              </a>
            )}
          </div>
        </div>
      </TiltSurface>
    );
  }
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
