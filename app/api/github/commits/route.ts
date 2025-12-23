// GitHub API proxy for fetching recent commits
export const dynamic = 'force-dynamic';

const GITHUB_USERNAME = process.env.GITHUB_USERNAME || 'ionutcnu';
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

interface GitHubRepo {
  name: string;
  language: string | null;
  updated_at: string;
}

interface GitHubCommit {
  sha: string;
  commit: {
    message: string;
    author: {
      date: string;
    };
  };
}

interface CommitData {
  repo: string;
  language: string | null;
  commits: {
    sha: string;
    message: string;
    date: string;
  }[];
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
    console.log('[GitHub API] Token exists:', !!GITHUB_TOKEN);
    console.log('[GitHub API] Token length:', GITHUB_TOKEN?.length || 0);

    // Fetch user's repositories
    const reposResponse = await fetch(
      `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=10&type=owner`,
      {
        headers: getHeaders(),
        next: { revalidate: 3600 } // Cache for 1 hour
      }
    );

    console.log('[GitHub API] Repos response status:', reposResponse.status);

    if (!reposResponse.ok) {
      const errorText = await reposResponse.text();
      console.error('[GitHub API] Error response:', errorText);
      throw new Error(`Failed to fetch repositories: ${reposResponse.status}`);
    }

    const repos: GitHubRepo[] = await reposResponse.json();

    // Get commits from top 5 most recently updated repos
    const commitPromises = repos.slice(0, 5).map(async (repo) => {
      try {
        const commitsResponse = await fetch(
          `https://api.github.com/repos/${GITHUB_USERNAME}/${repo.name}/commits?per_page=10`,
          {
            headers: getHeaders(),
            next: { revalidate: 3600 }
          }
        );

        if (!commitsResponse.ok) {
          return null;
        }

        const commits: GitHubCommit[] = await commitsResponse.json();

        return {
          repo: repo.name,
          language: repo.language,
          commits: commits.slice(0, 10).map((c) => ({
            sha: c.sha.slice(0, 7),
            message: c.commit.message.split('\n')[0], // First line only
            date: c.commit.author.date,
          })),
        };
      } catch (error) {
        console.error(`Error fetching commits for ${repo.name}:`, error);
        return null;
      }
    });

    const commitData = (await Promise.all(commitPromises)).filter(
      (data): data is CommitData => data !== null
    );

    return Response.json(commitData);
  } catch (error) {
    console.error('GitHub API error:', error);

    // Return error status to distinguish from successful data
    return Response.json(
      {
        error: 'Failed to fetch GitHub data',
        fallback: [
          {
            repo: 'Portfolio',
            language: 'TypeScript',
            commits: [
              {
                sha: 'abc1234',
                message: 'Add Nyx-inspired widgets and multi-page structure',
                date: new Date().toISOString(),
              },
            ],
          },
        ],
      },
      { status: 503 }
    );
  }
}
