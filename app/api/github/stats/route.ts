// GitHub stats API endpoint
export const dynamic = 'force-dynamic';

const GITHUB_USERNAME = process.env.GITHUB_USERNAME || 'ionutcnu';
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

// Rate limit tracking
function logRateLimitStatus(headers: Headers, endpoint: string) {
  const limit = headers.get('X-RateLimit-Limit');
  const remaining = headers.get('X-RateLimit-Remaining');
  const reset = headers.get('X-RateLimit-Reset');

  if (limit && remaining) {
    const resetTime = reset ? new Date(parseInt(reset) * 1000).toLocaleTimeString() : 'unknown';
    console.log(`[GitHub API] ${endpoint} - Rate Limit: ${remaining}/${limit} (resets at ${resetTime})`);

    const remainingNum = parseInt(remaining);
    if (remainingNum < 10) {
      console.warn(`[GitHub API] WARNING: Only ${remaining} requests remaining! Resets at ${resetTime}`);
    }
  }
}

interface GitHubRepo {
  name: string;
  language: string | null;
  stargazers_count: number;
  fork: boolean;
}

interface GitHubUser {
  public_repos: number;
  followers: number;
  following: number;
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
    // Fetch user info
    const userResponse = await fetch(
      `https://api.github.com/users/${GITHUB_USERNAME}`,
      {
        headers: getHeaders(),
        next: { revalidate: 3600 } // Cache for 1 hour
      }
    );

    logRateLimitStatus(userResponse.headers, 'user');

    if (!userResponse.ok) {
      throw new Error(`Failed to fetch user data: ${userResponse.status}`);
    }

    const user: GitHubUser = await userResponse.json();

    // Fetch repositories with pagination support
    let allRepos: GitHubRepo[] = [];
    let page = 1;
    const perPage = 100;

    while (true) {
      const reposResponse = await fetch(
        `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=${perPage}&type=owner&page=${page}`,
        {
          headers: getHeaders(),
          next: { revalidate: 3600 }
        }
      );

      logRateLimitStatus(reposResponse.headers, `repos (page ${page})`);

      if (!reposResponse.ok) {
        throw new Error(`Failed to fetch repositories: ${reposResponse.status}`);
      }

      const repos: GitHubRepo[] = await reposResponse.json();

      if (repos.length === 0) break;

      allRepos = [...allRepos, ...repos];

      // If we got fewer than perPage, we've reached the end
      if (repos.length < perPage) break;

      page++;
    }

    const repos = allRepos;

    // Filter out forks and calculate stats
    const ownRepos = repos.filter(repo => !repo.fork);

    const totalStars = ownRepos.reduce((sum, repo) => sum + repo.stargazers_count, 0);

    // Calculate commits in last 7 days
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    const since = sevenDaysAgo.toISOString();

    // Fetch commits from all own repos with pagination
    const commitPromises = ownRepos.map(async (repo) => {
      try {
        let totalCommits = 0;
        let page = 1;

        while (true) {
          const commitsResponse = await fetch(
            `https://api.github.com/repos/${GITHUB_USERNAME}/${repo.name}/commits?since=${since}&per_page=100&page=${page}`,
            {
              headers: getHeaders(),
              next: { revalidate: 3600 }
            }
          );

          logRateLimitStatus(commitsResponse.headers, `commits:${repo.name}`);

          if (!commitsResponse.ok) {
            return totalCommits;
          }

          const commits = await commitsResponse.json();
          const commitCount = Array.isArray(commits) ? commits.length : 0;

          totalCommits += commitCount;

          // If fewer than 100 commits, we've reached the end
          if (commitCount < 100) break;

          page++;
        }

        return totalCommits;
      } catch (error) {
        return 0;
      }
    });

    const commitCounts = await Promise.all(commitPromises);
    const totalCommitsLast7Days = commitCounts.reduce((sum, count) => sum + count, 0);

    return Response.json({
      repositories: ownRepos.length,
      stars: totalStars,
      commitsLast7Days: totalCommitsLast7Days,
      followers: user.followers,
    });
  } catch (error) {
    console.error('GitHub stats API error:', error);

    // Return proper error status
    return Response.json(
      {
        error: 'Failed to fetch GitHub stats',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
