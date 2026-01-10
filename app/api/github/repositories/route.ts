// GitHub API route to fetch all public repositories with metadata
export const dynamic = 'force-dynamic';

const GITHUB_USERNAME = process.env.GITHUB_USERNAME || 'ionutcnu';
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

interface GitHubRepo {
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  topics: string[];
  created_at: string;
  updated_at: string;
  pushed_at: string;
  fork: boolean;
}

interface Contributor {
  login: string;
  avatar_url: string;
  html_url: string;
  contributions: number;
}

interface EnrichedRepo {
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
  createdAt: string;
  updatedAt: string;
  pushedAt: string;
  contributors: Contributor[];
  contributorCount: number;
}

function getHeaders() {
  const headers: HeadersInit = {
    'Accept': 'application/vnd.github.v3+json',
    'User-Agent': 'Portfolio-App',
  };

  if (GITHUB_TOKEN) {
    headers['Authorization'] = `Bearer ${GITHUB_TOKEN}`;
  }

  return headers;
}

export async function GET() {
  try {
    console.log('[GitHub API] Fetching repositories for:', GITHUB_USERNAME);

    // Fetch all public repositories
    const reposResponse = await fetch(
      `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&type=owner`,
      {
        headers: getHeaders(),
        next: { revalidate: 3600 } // Cache for 1 hour
      }
    );

    if (!reposResponse.ok) {
      throw new Error(`Failed to fetch repositories: ${reposResponse.status}`);
    }

    const repos: GitHubRepo[] = await reposResponse.json();

    // Filter out forks and sort by most recent push
    const publicRepos = repos
      .filter(repo => !repo.fork)
      .sort((a, b) => new Date(b.pushed_at).getTime() - new Date(a.pushed_at).getTime())
      .slice(0, 10);

    console.log(`[GitHub API] Found ${publicRepos.length} public repos`);

    // Fetch contributors and languages for each repo
    const enrichedRepos: EnrichedRepo[] = await Promise.all(
      publicRepos.map(async (repo) => {
        try {
          // Fetch contributors
          const contributorsResponse = await fetch(
            `https://api.github.com/repos/${repo.full_name}/contributors?per_page=5`,
            {
              headers: getHeaders(),
              next: { revalidate: 3600 }
            }
          );

          let contributors: Contributor[] = [];
          let contributorCount = 0;

          if (contributorsResponse.ok) {
            contributors = await contributorsResponse.json();

            // Get total contributor count from Link header if available
            const linkHeader = contributorsResponse.headers.get('Link');
            if (linkHeader) {
              const match = linkHeader.match(/page=(\d+)>; rel="last"/);
              contributorCount = match ? parseInt(match[1]) * 30 : contributors.length;
            } else {
              contributorCount = contributors.length;
            }
          }

          // Fetch languages
          const languagesResponse = await fetch(
            `https://api.github.com/repos/${repo.full_name}/languages`,
            {
              headers: getHeaders(),
              next: { revalidate: 3600 }
            }
          );

          let languages: string[] = [];
          if (languagesResponse.ok) {
            const languagesData = await languagesResponse.json() as Record<string, number>;
            languages = Object.keys(languagesData);
          }

          return {
            name: repo.name,
            owner: GITHUB_USERNAME,
            description: repo.description || 'No description provided',
            stars: repo.stargazers_count,
            forks: repo.forks_count,
            language: repo.language,
            languages: languages,
            topics: repo.topics || [],
            url: repo.html_url,
            homepage: repo.homepage,
            createdAt: repo.created_at,
            updatedAt: repo.updated_at,
            pushedAt: repo.pushed_at,
            contributors: contributors.slice(0, 5),
            contributorCount,
          };
        } catch (error) {
          console.error(`Error fetching data for ${repo.name}:`, error);
          return {
            name: repo.name,
            owner: GITHUB_USERNAME,
            description: repo.description || 'No description provided',
            stars: repo.stargazers_count,
            forks: repo.forks_count,
            language: repo.language,
            languages: repo.language ? [repo.language] : [],
            topics: repo.topics || [],
            url: repo.html_url,
            homepage: repo.homepage,
            createdAt: repo.created_at,
            updatedAt: repo.updated_at,
            pushedAt: repo.pushed_at,
            contributors: [],
            contributorCount: 0,
          };
        }
      })
    );

    return Response.json(enrichedRepos);
  } catch (error) {
    console.error('GitHub API error:', error);

    return Response.json(
      {
        error: 'Failed to fetch GitHub repositories',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 503 }
    );
  }
}
