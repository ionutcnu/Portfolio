export interface Contributor {
  login: string
  avatar_url: string
  html_url: string
  contributions: number
}

export interface Repository {
  name: string
  owner: string
  description: string
  stars: number
  forks: number
  language: string | null
  languages: string[]
  topics: string[]
  url: string
  homepage: string | null
  createdAt: string
  updatedAt: string
  pushedAt: string
  contributors: Contributor[]
  contributorCount: number
}
