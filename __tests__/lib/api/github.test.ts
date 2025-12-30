import { fetchGitHubCommits, getLanguageColor } from '@/lib/api/github'

// Mock fetch globally
global.fetch = jest.fn()

describe('GitHub API', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    ;(global.fetch as jest.Mock).mockClear()
  })

  describe('fetchGitHubCommits', () => {
    const mockEventsData = [
      {
        type: 'PushEvent',
        repo: { name: 'user/test-repo' },
        created_at: '2024-01-15T10:00:00Z',
        payload: {
          commits: [
            {
              sha: '1234567890abcdef',
              message: 'feat: add new feature',
            },
          ],
        },
      },
      {
        type: 'PushEvent',
        repo: { name: 'user/another-repo' },
        created_at: '2024-01-14T10:00:00Z',
        payload: {
          commits: [
            {
              sha: 'abcdef1234567890',
              message: 'fix: resolve bug\n\nDetailed description here',
            },
          ],
        },
      },
    ]

    const mockReposData = [
      {
        name: 'test-repo',
        languages_url: 'https://api.github.com/repos/user/test-repo/languages',
      },
      {
        name: 'another-repo',
        languages_url: 'https://api.github.com/repos/user/another-repo/languages',
      },
    ]

    const mockLanguagesData = {
      TypeScript: 50000,
      JavaScript: 30000,
      CSS: 10000,
    }

    describe('Successful API calls', () => {
      it('should fetch and parse GitHub commits successfully', async () => {
        ;(global.fetch as jest.Mock)
          .mockResolvedValueOnce({
            ok: true,
            json: async () => mockEventsData,
          })
          .mockResolvedValueOnce({
            ok: true,
            json: async () => mockReposData,
          })
          .mockResolvedValueOnce({
            ok: true,
            json: async () => mockLanguagesData,
          })
          .mockResolvedValueOnce({
            ok: true,
            json: async () => ({}),
          })

        const result = await fetchGitHubCommits('testuser')

        expect(result.commits).toHaveLength(2)
        expect(result.commits[0].repo).toBe('test-repo')
        expect(result.commits[0].sha).toBe('1234567')
        expect(result.commits[0].message).toBe('feat: add new feature')
      })

      it('should include commit href with correct URL', async () => {
        ;(global.fetch as jest.Mock)
          .mockResolvedValueOnce({
            ok: true,
            json: async () => mockEventsData,
          })
          .mockResolvedValueOnce({
            ok: true,
            json: async () => mockReposData,
          })
          .mockResolvedValueOnce({
            ok: true,
            json: async () => mockLanguagesData,
          })
          .mockResolvedValueOnce({
            ok: true,
            json: async () => ({}),
          })

        const result = await fetchGitHubCommits('testuser')

        expect(result.commits[0].href).toBe(
          'https://github.com/user/test-repo/commit/1234567890abcdef'
        )
      })

      it('should only include first line of commit message', async () => {
        ;(global.fetch as jest.Mock)
          .mockResolvedValueOnce({
            ok: true,
            json: async () => mockEventsData,
          })
          .mockResolvedValueOnce({
            ok: true,
            json: async () => mockReposData,
          })
          .mockResolvedValueOnce({
            ok: true,
            json: async () => mockLanguagesData,
          })
          .mockResolvedValueOnce({
            ok: true,
            json: async () => ({}),
          })

        const result = await fetchGitHubCommits('testuser')

        expect(result.commits[1].message).toBe('fix: resolve bug')
        expect(result.commits[1].message).not.toContain('Detailed description')
      })

      it('should limit commits to 5', async () => {
        const manyEvents = Array.from({ length: 20 }, (_, i) => ({
          type: 'PushEvent',
          repo: { name: `user/repo-${i}` },
          created_at: `2024-01-${String(i + 1).padStart(2, '0')}T10:00:00Z`,
          payload: {
            commits: [
              {
                sha: `sha${i}`.padEnd(40, '0'),
                message: `commit ${i}`,
              },
            ],
          },
        }))

        ;(global.fetch as jest.Mock)
          .mockResolvedValueOnce({
            ok: true,
            json: async () => manyEvents,
          })
          .mockResolvedValueOnce({
            ok: true,
            json: async () => [],
          })

        const result = await fetchGitHubCommits('testuser')

        expect(result.commits.length).toBeLessThanOrEqual(5)
      })

      it('should fetch and aggregate language statistics', async () => {
        ;(global.fetch as jest.Mock)
          .mockResolvedValueOnce({
            ok: true,
            json: async () => mockEventsData,
          })
          .mockResolvedValueOnce({
            ok: true,
            json: async () => mockReposData,
          })
          .mockResolvedValueOnce({
            ok: true,
            json: async () => ({ TypeScript: 50000 }),
          })
          .mockResolvedValueOnce({
            ok: true,
            json: async () => ({ JavaScript: 30000 }),
          })

        const result = await fetchGitHubCommits('testuser')

        expect(result.languages).toBeDefined()
        expect(result.languages.length).toBeGreaterThan(0)
      })

      it('should sort languages by size', async () => {
        ;(global.fetch as jest.Mock)
          .mockResolvedValueOnce({
            ok: true,
            json: async () => mockEventsData,
          })
          .mockResolvedValueOnce({
            ok: true,
            json: async () => mockReposData,
          })
          .mockResolvedValueOnce({
            ok: true,
            json: async () => ({
              CSS: 10000,
              TypeScript: 50000,
              JavaScript: 30000,
            }),
          })
          .mockResolvedValueOnce({
            ok: true,
            json: async () => ({}),
          })

        const result = await fetchGitHubCommits('testuser')

        if (result.languages.length >= 2) {
          expect(result.languages[0].size).toBeGreaterThanOrEqual(
            result.languages[1].size
          )
        }
      })

      it('should limit languages to 8', async () => {
        const manyLanguages = Object.fromEntries(
          Array.from({ length: 15 }, (_, i) => [`Lang${i}`, (15 - i) * 1000])
        )

        ;(global.fetch as jest.Mock)
          .mockResolvedValueOnce({
            ok: true,
            json: async () => mockEventsData,
          })
          .mockResolvedValueOnce({
            ok: true,
            json: async () => [mockReposData[0]],
          })
          .mockResolvedValueOnce({
            ok: true,
            json: async () => manyLanguages,
          })

        const result = await fetchGitHubCommits('testuser')

        expect(result.languages.length).toBeLessThanOrEqual(8)
      })
    })

    describe('Authorization', () => {
      it('should include authorization header when token is provided', async () => {
        process.env.GITHUB_TOKEN = 'test-token'

        ;(global.fetch as jest.Mock).mockResolvedValue({
          ok: true,
          json: async () => [],
        })

        await fetchGitHubCommits('testuser')

        expect(global.fetch).toHaveBeenCalledWith(
          expect.any(String),
          expect.objectContaining({
            headers: expect.objectContaining({
              Authorization: 'Bearer test-token',
            }),
          })
        )

        delete process.env.GITHUB_TOKEN
      })

      it('should work without authorization token', async () => {
        delete process.env.GITHUB_TOKEN
        delete process.env.NEXT_PUBLIC_GITHUB_TOKEN

        ;(global.fetch as jest.Mock).mockResolvedValue({
          ok: true,
          json: async () => [],
        })

        await fetchGitHubCommits('testuser')

        expect(global.fetch).toHaveBeenCalledWith(
          expect.any(String),
          expect.objectContaining({
            headers: expect.not.objectContaining({
              Authorization: expect.any(String),
            }),
          })
        )
      })

      it('should prefer GITHUB_TOKEN over NEXT_PUBLIC_GITHUB_TOKEN', async () => {
        process.env.GITHUB_TOKEN = 'primary-token'
        process.env.NEXT_PUBLIC_GITHUB_TOKEN = 'public-token'

        ;(global.fetch as jest.Mock).mockResolvedValue({
          ok: true,
          json: async () => [],
        })

        await fetchGitHubCommits('testuser')

        expect(global.fetch).toHaveBeenCalledWith(
          expect.any(String),
          expect.objectContaining({
            headers: expect.objectContaining({
              Authorization: 'Bearer primary-token',
            }),
          })
        )

        delete process.env.GITHUB_TOKEN
        delete process.env.NEXT_PUBLIC_GITHUB_TOKEN
      })
    })

    describe('Error Handling', () => {
      it('should return fallback data on API error', async () => {
        ;(global.fetch as jest.Mock).mockResolvedValue({
          ok: false,
          status: 404,
        })

        const result = await fetchGitHubCommits('testuser')

        expect(result.commits).toBeDefined()
        expect(result.languages).toBeDefined()
        expect(result.commits[0].repo).toBe('Portfolio')
      })

      it('should handle network errors gracefully', async () => {
        ;(global.fetch as jest.Mock).mockRejectedValue(
          new Error('Network error')
        )

        const result = await fetchGitHubCommits('testuser')

        expect(result.commits).toBeDefined()
        expect(result.languages).toBeDefined()
      })

      it('should handle malformed JSON', async () => {
        ;(global.fetch as jest.Mock).mockResolvedValue({
          ok: true,
          json: async () => {
            throw new Error('Invalid JSON')
          },
        })

        const result = await fetchGitHubCommits('testuser')

        expect(result.commits).toBeDefined()
        expect(result.languages).toBeDefined()
      })

      it('should handle empty events array', async () => {
        ;(global.fetch as jest.Mock)
          .mockResolvedValueOnce({
            ok: true,
            json: async () => [],
          })
          .mockResolvedValueOnce({
            ok: true,
            json: async () => [],
          })

        const result = await fetchGitHubCommits('testuser')

        expect(result.commits).toBeDefined()
        expect(result.commits.length).toBeGreaterThan(0) // Falls back to FALLBACK_DATA
      })

      it('should handle events without commits', async () => {
        const eventsWithoutCommits = [
          {
            type: 'PushEvent',
            repo: { name: 'user/repo' },
            created_at: '2024-01-15T10:00:00Z',
            payload: { commits: [] },
          },
        ]

        ;(global.fetch as jest.Mock)
          .mockResolvedValueOnce({
            ok: true,
            json: async () => eventsWithoutCommits,
          })
          .mockResolvedValueOnce({
            ok: true,
            json: async () => [],
          })

        const result = await fetchGitHubCommits('testuser')

        expect(result.commits).toBeDefined()
      })
    })

    describe('Caching', () => {
      it('should set revalidate option for caching', async () => {
        ;(global.fetch as jest.Mock).mockResolvedValue({
          ok: true,
          json: async () => [],
        })

        await fetchGitHubCommits('testuser')

        expect(global.fetch).toHaveBeenCalledWith(
          expect.any(String),
          expect.objectContaining({
            next: { revalidate: 3600 },
          })
        )
      })
    })

    describe('Data Transformation', () => {
      it('should extract repo name from full path', async () => {
        const events = [
          {
            type: 'PushEvent',
            repo: { name: 'username/repository-name' },
            created_at: '2024-01-15T10:00:00Z',
            payload: {
              commits: [{ sha: '1234567890', message: 'test commit' }],
            },
          },
        ]

        ;(global.fetch as jest.Mock)
          .mockResolvedValueOnce({
            ok: true,
            json: async () => events,
          })
          .mockResolvedValueOnce({
            ok: true,
            json: async () => [],
          })

        const result = await fetchGitHubCommits('testuser')

        expect(result.commits[0].repo).toBe('repository-name')
      })

      it('should truncate SHA to 7 characters', async () => {
        const events = [
          {
            type: 'PushEvent',
            repo: { name: 'user/repo' },
            created_at: '2024-01-15T10:00:00Z',
            payload: {
              commits: [
                { sha: '1234567890abcdef1234567890abcdef12345678', message: 'test' },
              ],
            },
          },
        ]

        ;(global.fetch as jest.Mock)
          .mockResolvedValueOnce({
            ok: true,
            json: async () => events,
          })
          .mockResolvedValueOnce({
            ok: true,
            json: async () => [],
          })

        const result = await fetchGitHubCommits('testuser')

        expect(result.commits[0].sha).toBe('1234567')
        expect(result.commits[0].sha.length).toBe(7)
      })

      it('should preserve commit date', async () => {
        const testDate = '2024-01-15T10:30:45Z'
        const events = [
          {
            type: 'PushEvent',
            repo: { name: 'user/repo' },
            created_at: testDate,
            payload: {
              commits: [{ sha: '1234567890', message: 'test' }],
            },
          },
        ]

        ;(global.fetch as jest.Mock)
          .mockResolvedValueOnce({
            ok: true,
            json: async () => events,
          })
          .mockResolvedValueOnce({
            ok: true,
            json: async () => [],
          })

        const result = await fetchGitHubCommits('testuser')

        expect(result.commits[0].date).toBe(testDate)
      })
    })

    describe('Event Filtering', () => {
      it('should only process PushEvent types', async () => {
        const mixedEvents = [
          {
            type: 'CreateEvent',
            repo: { name: 'user/repo1' },
            created_at: '2024-01-15T10:00:00Z',
            payload: {},
          },
          {
            type: 'PushEvent',
            repo: { name: 'user/repo2' },
            created_at: '2024-01-14T10:00:00Z',
            payload: {
              commits: [{ sha: '1234567890', message: 'test' }],
            },
          },
        ]

        ;(global.fetch as jest.Mock)
          .mockResolvedValueOnce({
            ok: true,
            json: async () => mixedEvents,
          })
          .mockResolvedValueOnce({
            ok: true,
            json: async () => [],
          })

        const result = await fetchGitHubCommits('testuser')

        expect(result.commits[0].repo).toBe('repo2')
      })
    })
  })

  describe('getLanguageColor', () => {
    it('should return correct color for TypeScript', () => {
      expect(getLanguageColor('TypeScript')).toBe('#3178c6')
    })

    it('should return correct color for JavaScript', () => {
      expect(getLanguageColor('JavaScript')).toBe('#f1e05a')
    })

    it('should return correct color for Python', () => {
      expect(getLanguageColor('Python')).toBe('#3572A5')
    })

    it('should return correct color for common languages', () => {
      const languages = [
        { name: 'TypeScript', color: '#3178c6' },
        { name: 'JavaScript', color: '#f1e05a' },
        { name: 'Python', color: '#3572A5' },
        { name: 'Java', color: '#b07219' },
        { name: 'Go', color: '#00ADD8' },
        { name: 'Rust', color: '#dea584' },
        { name: 'HTML', color: '#e34c26' },
        { name: 'CSS', color: '#563d7c' },
      ]

      languages.forEach(({ name, color }) => {
        expect(getLanguageColor(name)).toBe(color)
      })
    })

    it('should return default color for unknown language', () => {
      expect(getLanguageColor('UnknownLanguage')).toBe('#858585')
    })

    it('should return default color for empty string', () => {
      expect(getLanguageColor('')).toBe('#858585')
    })

    it('should be case-sensitive', () => {
      expect(getLanguageColor('typescript')).toBe('#858585')
      expect(getLanguageColor('TYPESCRIPT')).toBe('#858585')
    })

    it('should handle all defined languages', () => {
      const definedLanguages = [
        'TypeScript',
        'JavaScript',
        'Python',
        'Java',
        'Go',
        'Rust',
        'C++',
        'C',
        'Ruby',
        'PHP',
        'Swift',
        'Kotlin',
        'Dart',
        'HTML',
        'CSS',
        'Shell',
        'Vue',
        'Svelte',
      ]

      definedLanguages.forEach(lang => {
        const color = getLanguageColor(lang)
        expect(color).toMatch(/^#[0-9A-Fa-f]{6}$/)
        expect(color).not.toBe('#858585') // Should not be default
      })
    })
  })
})