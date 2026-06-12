// GitHub stats API endpoint
import { getCached } from '@/lib/cache';

export const revalidate = 3600; // ISR: 1 hour cache

const GITHUB_USERNAME = process.env.GITHUB_USERNAME || 'ionutcnu';
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

// Rate limit tracking
function logRateLimitStatus(headers: Headers, endpoint: string): boolean {
  const limit = headers.get('X-RateLimit-Limit');
  const remaining = headers.get('X-RateLimit-Remaining');
  const reset = headers.get('X-RateLimit-Reset');

  if (limit && remaining) {
    const resetTime = reset ? new Date(parseInt(reset) * 1000).toLocaleTimeString() : 'unknown';
    console.log(`[GitHub API] ${endpoint} - Rate Limit: ${remaining}/${limit} (resets at ${resetTime})`);

    const remainingNum = parseInt(remaining);
    if (remainingNum < 10) {
      console.warn(`[GitHub API] WARNING: Only ${remaining} requests remaining! Resets at ${resetTime}`);
      return false; // Signal to stop making requests
    }
  }
  return true; // Safe to continue
}

interface GitHubRepo {
  name: string;
  language: string | null;
  stargazers_count: number;
  fork: boolean;
  updated_at: string;
  pushed_at: string;
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

// Extract stats fetching logic for caching
async function fetchGitHubStats() {
  console.log('[GitHub API] Starting stats fetch...');
  console.log('[GitHub API] Username:', GITHUB_USERNAME);

  // Fetch user info
    const userResponse = await fetch(
      `https://api.github.com/users/${GITHUB_USERNAME}`,
      {
        headers: getHeaders(),
        next: { revalidate: 3600 } // Align with 1-hour KV TTL
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
        `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=${perPage}&type=owner&page=${page}`,
        {
          headers: getHeaders(),
          next: { revalidate: 3600 } // Align with 1-hour KV TTL
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

    console.log('[GitHub API] Total repos fetched:', allRepos.length);

    // Filter out forks and calculate stats
    const ownRepos = allRepos.filter(repo => !repo.fork);
    console.log('[GitHub API] Own repos (non-forks):', ownRepos.length);

    const totalStars = ownRepos.reduce((sum, repo) => sum + repo.stargazers_count, 0);

    // Calculate commits in last 7 days
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    const since = sevenDaysAgo.toISOString();

    console.log('[GitHub API] Fetching commits since:', since);
    console.log('[GitHub API] Checking repos owned by:', GITHUB_USERNAME);

    // Limit repos based on token availability to avoid rate limit issues
    const maxRepos = GITHUB_TOKEN ? 20 : 5; // Fewer repos without token
    const recentRepos = ownRepos.slice(0, maxRepos);
    console.log('[GitHub API] Checking these repos for commits:', recentRepos.map(r => r.name));
    const abortController = new AbortController();

    const commitPromises = recentRepos.map(async (repo) => {
      try {
        if (abortController.signal.aborted) return 0;

        // Fetch branches for this repo (limit to 5 most recently updated)
        const branchesResponse = await fetch(
          `https://api.github.com/repos/${GITHUB_USERNAME}/${repo.name}/branches?per_page=5`,
          {
            headers: getHeaders(),
            next: { revalidate: 3600 }, // Align with 1-hour KV TTL
            signal: abortController.signal
          }
        );

        if (!branchesResponse.ok) {
          console.log(`[GitHub API] Failed to fetch branches for ${repo.name}`);
          return 0;
        }

        const branches = await branchesResponse.json();
        const branchNames = Array.isArray(branches) ? branches.map((b: any) => b.name) : [];

        console.log(`[GitHub API] ${repo.name} branches:`, branchNames);

        let totalCommits = 0;

        // Check commits from all branches (max 5 branches to avoid too many requests)
        for (const branchName of branchNames.slice(0, 5)) {
          try {
            if (abortController.signal.aborted) break;

            const url = `https://api.github.com/repos/${GITHUB_USERNAME}/${repo.name}/commits?sha=${branchName}&since=${since}&per_page=100`;

            const commitsResponse = await fetch(url, {
              headers: getHeaders(),
              next: { revalidate: 3600 }, // Align with 1-hour KV TTL
              signal: abortController.signal
            });

            const canContinue = logRateLimitStatus(commitsResponse.headers, `commits:${repo.name}/${branchName}`);

            if (!canContinue) {
              abortController.abort(); // Abort all pending requests
              break;
            }

            if (!commitsResponse.ok) {
              continue;
            }

            const commits = await commitsResponse.json();
            const commitCount = Array.isArray(commits) ? commits.length : 0;

            if (commitCount > 0) {
              console.log(`[GitHub API] ${repo.name}/${branchName}: ${commitCount} commits`);
              totalCommits += commitCount;
            }
          } catch (error) {
            console.log(`[GitHub API] Error fetching commits from ${repo.name}/${branchName}:`, error);
          }
        }

        return totalCommits;
      } catch (error) {
        return 0;
      }
    });

    const commitCounts = await Promise.all(commitPromises);
    const totalCommitsLast7Days = commitCounts.reduce((sum, count) => sum + count, 0);

    console.log('[GitHub API] Total commits in last 7 days:', totalCommitsLast7Days);
    console.log('[GitHub API] Per-repo breakdown:', commitCounts);

    return {
      repositories: ownRepos.length,
      stars: totalStars,
      commitsLast7Days: totalCommitsLast7Days,
      followers: user.followers,
    };
}

export async function GET() {
  try {
    // Use KV cache with 1-hour TTL and 2-hour stale-while-revalidate
    const stats = await getCached(
      {
        key: 'github:stats:v1',
        ttl: 3600, // 1 hour
        staleWhileRevalidate: 7200, // Serve stale for up to 2 hours total
      },
      fetchGitHubStats
    );

    return Response.json(stats, {
      headers: {
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=7200',
      },
    });
  } catch (error) {
    console.error('GitHub stats API error:', error);
    console.error('Error stack:', error instanceof Error ? error.stack : 'No stack trace');

    // Try to serve stale data from cache on error
    try {
      const { getCache } = await import('@/lib/cache');
      const staleData = await getCache<any>('github:stats:v1');
      if (staleData) {
        console.log('[GitHub API] Serving stale data due to error');
        return Response.json(staleData, {
          headers: {
            'X-Cache': 'STALE',
          },
        });
      }
    } catch {
      // Ignore cache errors
    }

    // Return proper error status (stack trace only in development)
    return Response.json(
      {
        error: 'Failed to fetch GitHub stats',
        message: error instanceof Error ? error.message : 'Unknown error',
        ...(process.env.NODE_ENV === 'development' && {
          stack: error instanceof Error ? error.stack : undefined
        })
      },
      { status: 500 }
    );
  }
}
