"use client"

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GitCommit, Loader2, ExternalLink } from "lucide-react";
import { BentoBox } from "./BentoGrid";

interface Commit {
  sha: string;
  message: string;
  date: string;
}

interface RepoCommits {
  repo: string;
  language: string | null;
  commits: Commit[];
}

const GITHUB_USERNAME = process.env.NEXT_PUBLIC_GITHUB_USERNAME || 'ionutcnu';

const languageColors: Record<string, string> = {
  TypeScript: 'bg-blue-500',
  JavaScript: 'bg-yellow-400',
  Python: 'bg-yellow-600',
  'C#': 'bg-purple-500',
  Java: 'bg-orange-600',
  Go: 'bg-cyan-500',
  Rust: 'bg-orange-700',
  Ruby: 'bg-red-500',
  PHP: 'bg-indigo-500',
};

export default function GitHubCommitsWidget() {
  const [data, setData] = useState<RepoCommits[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedRepo, setSelectedRepo] = useState(0);

  useEffect(() => {
    // Use mock data for now - API route needs server deployment
    const mockData: RepoCommits[] = [
      {
        repo: 'Portfolio',
        language: 'TypeScript',
        commits: [
          { sha: 'a1b2c3d', message: 'Add Nyx-inspired widgets and multi-page structure', date: '2025-12-19T00:00:00Z' },
          { sha: 'e4f5g6h', message: 'Implement real-time click counter with SSE', date: '2025-12-18T00:00:00Z' },
          { sha: 'i7j8k9l', message: 'Create location map widget with timezone', date: '2025-12-17T00:00:00Z' },
          { sha: 'm0n1o2p', message: 'Add GitHub commits visualization', date: '2025-12-16T00:00:00Z' },
        ],
      },
      {
        repo: 'BATS',
        language: 'C#',
        commits: [
          { sha: 'q3r4s5t', message: 'Optimize ATS resume parsing algorithm', date: '2025-12-15T00:00:00Z' },
          { sha: 'u6v7w8x', message: 'Add keyword extraction feature', date: '2025-12-14T00:00:00Z' },
        ],
      },
      {
        repo: 'Watcher',
        language: 'TypeScript',
        commits: [
          { sha: 'y9z0a1b', message: 'Update clan statistics dashboard', date: '2025-12-13T00:00:00Z' },
          { sha: 'c2d3e4f', message: 'Fix data aggregation bug', date: '2025-12-12T00:00:00Z' },
        ],
      },
    ];

    // Simulate loading delay
    setTimeout(() => {
      setData(mockData);
      setLoading(false);
    }, 500);
  }, []);

  if (loading) {
    return (
      <BentoBox span={2}>
        <div className="flex items-center justify-center h-40">
          <Loader2 className="h-6 w-6 animate-spin text-[hsl(var(--accent))]" />
        </div>
      </BentoBox>
    );
  }

  if (data.length === 0) {
    return (
      <BentoBox span={2}>
        <div className="flex items-center justify-center h-40">
          <p className="text-sm text-muted-foreground">No commits found</p>
        </div>
      </BentoBox>
    );
  }

  const currentRepo = data[selectedRepo];

  return (
    <BentoBox span={2}>
      <div className="flex items-center justify-between mb-3">
        <h3 className="flex items-center gap-2 text-sm font-semibold">
          <GitCommit size={16} className="text-[hsl(var(--accent))]" />
          Recent Commits
        </h3>
        <a
          href={`https://github.com/${GITHUB_USERNAME}/${currentRepo.repo}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-muted-foreground hover:text-[hsl(var(--accent))] transition-colors"
        >
          <ExternalLink size={14} />
        </a>
      </div>

      {/* Repo selector */}
      <div className="mb-3 flex gap-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-muted scrollbar-track-transparent">
        {data.map((repo, idx) => (
          <button
            key={repo.repo}
            type="button"
            onClick={() => setSelectedRepo(idx)}
            className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs whitespace-nowrap transition-all ${
              selectedRepo === idx
                ? 'bg-[hsl(var(--accent))]/20 text-[hsl(var(--accent))] ring-1 ring-[hsl(var(--accent))]/30'
                : 'bg-muted text-muted-foreground hover:bg-muted/80'
            }`}
          >
            {repo.language && (
              <div className={`h-2 w-2 rounded-full ${languageColors[repo.language] || 'bg-gray-500'}`} />
            )}
            <span className="font-medium">{repo.repo}</span>
          </button>
        ))}
      </div>

      {/* Commits list */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedRepo}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 10 }}
          transition={{ duration: 0.2 }}
          className="space-y-2 max-h-48 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-muted scrollbar-track-transparent"
        >
          {currentRepo.commits.slice(0, 6).map((commit, idx) => (
            <motion.div
              key={commit.sha}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="group flex items-start gap-2 rounded-lg bg-muted/50 p-2.5 text-xs hover:bg-muted transition-colors"
            >
              <code className="text-[hsl(var(--accent))] font-mono text-[10px] mt-0.5 shrink-0">
                {commit.sha}
              </code>
              <p className="flex-1 text-foreground/80 leading-relaxed line-clamp-2 group-hover:text-foreground transition-colors">
                {commit.message}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>

      <div className="mt-3 pt-2 border-t border-border/50 flex items-center justify-between text-[10px] text-muted-foreground">
        <span>{currentRepo.commits.length} commits</span>
        <span>{currentRepo.language || 'Unknown'}</span>
      </div>
    </BentoBox>
  );
}
