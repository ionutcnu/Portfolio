export interface CommitLanguage {
  size: number;
  name: string;
  color: string;
}

export interface GitHubCommit {
  repo: string;
  message: string;
  href: string;
  sha: string;
  date: string;
  additions?: number;
  deletions?: number;
}

export interface CommitData {
  commits: GitHubCommit[];
  languages: CommitLanguage[];
  totalCommits: number;
}

// Fallback data for when API fails
const FALLBACK_DATA: CommitData = {
  commits: [
    {
      repo: 'Portfolio',
      message: 'feat: implement XXH3 hashing and incremental …',
      href: '#',
      sha: '1234567',
      date: new Date().toISOString()
    },
    {
      repo: 'Portfolio',
      message: 'feat: add macOS directories to ignore list and D…',
      href: '#',
      sha: '2345678',
      date: new Date().toISOString()
    },
    {
      repo: 'Portfolio',
      message: 'feat: update installation instructions in README…',
      href: '#',
      sha: '3456789',
      date: new Date().toISOString()
    },
    {
      repo: 'Portfolio',
      message: 'feat: enhance file hashing with incremental …',
      href: '#',
      sha: '4567890',
      date: new Date().toISOString()
    }
  ],
  languages: [
    { size: 281021, name: 'TypeScript', color: '#3178c6' },
    { size: 148482, name: 'JavaScript', color: '#f1e05a' },
    { size: 99269, name: 'CSS', color: '#563d7c' },
    { size: 49218, name: 'HTML', color: '#e34c26' }
  ],
  totalCommits: 4
};

export async function fetchGitHubCommits(username: string): Promise<CommitData> {
  try {
    const token = process.env.GITHUB_TOKEN || process.env.NEXT_PUBLIC_GITHUB_TOKEN;

    // Fetch recent events to get commits
    const eventsResponse = await fetch(
      `https://api.github.com/users/${username}/events/public?per_page=100`,
      {
        headers: token ? {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/vnd.github.v3+json',
        } : {
          'Accept': 'application/vnd.github.v3+json',
        },
        next: { revalidate: 3600 }, // Cache for 1 hour
      }
    );

    if (!eventsResponse.ok) {
      console.error('GitHub API error:', eventsResponse.status);
      return FALLBACK_DATA;
    }

    const events = await eventsResponse.json() as any[];

    // Filter push events and extract commits
    const commits: GitHubCommit[] = [];
    const repoLanguages: Map<string, { size: number; name: string; color: string }> = new Map();

    for (const event of events) {
      if (event.type === 'PushEvent' && commits.length < 5) {
        const payload = event.payload;
        const repo = event.repo.name;

        // Get the first commit from this push
        if (payload.commits && payload.commits.length > 0) {
          const commit = payload.commits[0];

          commits.push({
            repo: repo.split('/')[1] || repo,
            message: commit.message.split('\n')[0], // First line only
            href: `https://github.com/${repo}/commit/${commit.sha}`,
            sha: commit.sha.substring(0, 7),
            date: event.created_at,
          });
        }
      }
    }

    // Fetch language stats for the user's repos
    const reposResponse = await fetch(
      `https://api.github.com/users/${username}/repos?sort=updated&per_page=10`,
      {
        headers: token ? {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/vnd.github.v3+json',
        } : {
          'Accept': 'application/vnd.github.v3+json',
        },
        next: { revalidate: 3600 },
      }
    );

    if (reposResponse.ok) {
      const repos = await reposResponse.json() as any[];

      for (const repo of repos.slice(0, 5)) {
        const langResponse = await fetch(repo.languages_url, {
          headers: token ? {
            'Authorization': `Bearer ${token}`,
          } : {},
          next: { revalidate: 3600 },
        });

        if (langResponse.ok) {
          const languages = await langResponse.json() as any;

          for (const [lang, bytes] of Object.entries(languages)) {
            const existing = repoLanguages.get(lang);
            const size = bytes as number;

            if (existing) {
              existing.size += size;
            } else {
              repoLanguages.set(lang, {
                size,
                name: lang,
                color: getLanguageColor(lang),
              });
            }
          }
        }
      }
    }

    const languages = Array.from(repoLanguages.values())
      .sort((a, b) => b.size - a.size)
      .slice(0, 8);

    return {
      commits: commits.length > 0 ? commits : FALLBACK_DATA.commits,
      languages: languages.length > 0 ? languages : FALLBACK_DATA.languages,
      totalCommits: commits.length,
    };
  } catch (error) {
    console.error('Failed to fetch GitHub commits:', error);
    return FALLBACK_DATA;
  }
}

// Language colors from GitHub
export function getLanguageColor(lang: string): string {
  const colors: Record<string, string> = {
    'TypeScript': '#3178c6',
    'JavaScript': '#f1e05a',
    'Python': '#3572A5',
    'Java': '#b07219',
    'Go': '#00ADD8',
    'Rust': '#dea584',
    'C++': '#f34b7d',
    'C': '#555555',
    'Ruby': '#701516',
    'PHP': '#4F5D95',
    'Swift': '#F05138',
    'Kotlin': '#A97BFF',
    'Dart': '#00B4AB',
    'HTML': '#e34c26',
    'CSS': '#563d7c',
    'Shell': '#89e051',
    'Vue': '#41b883',
    'Svelte': '#ff3e00',
  };
  return colors[lang] || '#858585';
}
