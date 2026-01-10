"use client"

import { useState, useEffect } from "react";
import { Activity, ExternalLink } from "lucide-react";
import { BentoBox } from "./BentoGrid";
import { fetchGitHubCommits, getLanguageColor, type CommitData } from "@/lib/api/github";

export default function RecentCommitsWidget() {
  const [commitData, setCommitData] = useState<CommitData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadCommits() {
      try {
        // Use server-side API route to access token
        const response = await fetch('/api/github/commits');

        if (!response.ok) {
          throw new Error('Failed to fetch commits');
        }

        const repoData = await response.json() as any[];

        // Transform to CommitData format
        const allCommits: any[] = [];
        const languageMap = new Map<string, number>();

        repoData.forEach((repo: any) => {
          if (repo.commits && repo.commits.length > 0) {
            // Add commits from this repo
            repo.commits.slice(0, 2).forEach((commit: any) => {
              allCommits.push({
                repo: repo.repo,
                message: commit.message,
                href: `https://github.com/ionutcnu/${repo.repo}/commit/${commit.sha}`,
                sha: commit.sha,
                date: commit.date,
              });
            });

            // Track languages
            if (repo.language) {
              languageMap.set(
                repo.language,
                (languageMap.get(repo.language) || 0) + 1
              );
            }
          }
        });

        // Convert language map to CommitData format
        const languages = Array.from(languageMap.entries()).map(([name, count]) => ({
          name,
          size: count * 10000,
          color: getLanguageColor(name),
        }));

        const data: CommitData = {
          commits: allCommits.slice(0, 8),
          languages: languages.slice(0, 8),
          totalCommits: allCommits.length,
        };

        setCommitData(data);
      } catch (error) {
        console.error("Failed to load commits:", error);
        // Fallback to mock data
        const fallback = await fetchGitHubCommits("ionutcnu");
        setCommitData(fallback);
      } finally {
        setLoading(false);
      }
    }
    loadCommits();
  }, []);

  const langTotal = commitData?.languages.reduce((a, l) => a + l.size, 0) || 0;

  if (loading) {
    return (
      <BentoBox span={2}>
        <div className="flex h-full items-center justify-center">
          <div className="h-8 w-full animate-pulse rounded bg-muted"></div>
        </div>
      </BentoBox>
    );
  }

  return (
    <BentoBox span={2}>
      <div className="flex h-full flex-col">
        <div className="mb-3 flex items-center justify-between gap-2 text-sm">
          <h3 className="flex items-center gap-2 font-semibold">
            <Activity size={16} className="text-accent-dynamic" />
            <span>Recent Commits</span>
          </h3>
          <a
            href="https://github.com/ionutcnu?tab=repositories"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="View all repositories"
            className="text-accent-dynamic/80 hover:text-accent-dynamic text-xs font-medium transition-colors"
          >
            [info]
          </a>
        </div>

        {commitData?.commits && commitData.commits.length > 0 ? (
          <ul className="space-y-1.5 text-sm mb-4">
            {commitData.commits.slice(0, 8).map((commit) => (
              <li key={commit.sha}>
                <a
                  href={commit.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-accent-dynamic flex min-w-0 items-center gap-2 transition-colors"
                  title={`${commit.repo}: ${commit.message}`}
                >
                  <span className="text-foreground flex-shrink-0 font-medium">
                    {commit.repo.split('/').pop() || commit.repo}:
                  </span>
                  <span className="min-w-0 flex-1 truncate">{commit.message}</span>
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-muted-foreground text-sm italic">No recent public commits.</p>
        )}

        <div className="mt-auto pt-3 flex items-center gap-3">
        <a
          href="https://github.com/ionutcnu"
          target="_blank"
          rel="noopener noreferrer"
          className="group text-accent-dynamic inline-flex items-center gap-1 text-sm hover:underline"
        >
          <span>View on GitHub</span>
          <ExternalLink
            size={14}
            className="inline-block transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </a>

        {langTotal > 0 && commitData?.languages && (
          <div
            className="ml-auto max-w-xs flex-1 sm:max-w-sm md:max-w-md"
            role="img"
            aria-label="Language breakdown"
          >
            <div className="bg-muted h-2 w-full rounded-[3px]">
              <div className="flex h-full w-full">
                {commitData.languages.map((lang) => (
                  <div
                    key={lang.name}
                    className="group relative h-full first:rounded-l-[3px] last:rounded-r-[3px]"
                    style={{
                      width: `${(lang.size / langTotal) * 100}%`,
                      backgroundColor: lang.color,
                      minWidth: '8px'
                    }}
                  >
                    {/* Tooltip */}
                    <div className="pointer-events-none absolute -top-8 left-1/2 z-10 -translate-x-1/2 rounded border border-border bg-popover px-2 py-1 text-xs whitespace-nowrap opacity-0 shadow-lg transition-opacity duration-150 group-hover:opacity-100">
                      <span className="inline-flex items-center gap-2">
                        <span
                          className="inline-block h-2 w-2 rounded"
                          style={{ backgroundColor: lang.color }}
                        ></span>
                        <span className="text-foreground">{lang.name}</span>
                        <span className="text-muted-foreground">•</span>
                        <span className="text-muted-foreground">
                          {Math.round((lang.size / langTotal) * 100)}%
                        </span>
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        </div>
      </div>
    </BentoBox>
  );
}
