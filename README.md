# 💼 Portfolio - Ionut Cioncu

Professional portfolio website showcasing QA testing expertise, technical projects, and professional experience. Built with modern web technologies and deployed on Cloudflare's edge network.

[![Live Demo](https://img.shields.io/badge/LIVE_DEMO-lonut.dev-blue?style=for-the-badge)](https://lonut.dev)
[![Cloudflare](https://img.shields.io/badge/CLOUDFLARE-Workers-orange?style=for-the-badge&logo=cloudflare)](https://workers.cloudflare.com/)
[![Next.js](https://img.shields.io/badge/NEXT.JS-15.5-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TYPESCRIPT-5.6-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/REACT-18-61DAFB?style=for-the-badge&logo=react)](https://react.dev/)
[![Tailwind](https://img.shields.io/badge/TAILWIND-3.4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![D1](https://img.shields.io/badge/D1-Database-orange?style=for-the-badge&logo=cloudflare)](https://developers.cloudflare.com/d1/)

**Interactive portfolio • Real-time GitHub integration • Edge-powered analytics**

🚀 [Live Demo](https://lonut.dev) • 📖 [Documentation](#setup-instructions) • 🐛 [Report Issues](https://github.com/ionutcnu/Portfolio/issues)

## ✨ Key Features

<table>
<tr>
<td width="50%" valign="top">

### 👤 Professional Showcase
- **Interactive Hero** - Skills taxonomy with domain expertise
- **Experience Timeline** - 4 years across Naval Shipping & Payments
- **Project Gallery** - Live demos with GitHub integration
- **Professional Avatar** - Custom branding and visual identity
- **SEO Optimized** - Open Graph metadata for social shares

</td>
<td width="50%" valign="top">

### 🎯 Interactive Widgets
- **Bento Grid Layout** - Modern dashboard design
- **Location Map** - Interactive Leaflet integration
- **GitHub Commits** - Real-time activity feed
- **Click Counter** - D1-powered visitor tracking
- **Statistics Widget** - Portfolio analytics
- **Contact Widget** - Direct communication

</td>
</tr>
<tr>
<td width="50%" valign="top">

### ⚡ Performance
- **Edge Computing** - <50ms global response time
- **D1 Database** - SQLite at the edge
- **CDN Distribution** - 300+ global locations
- **Rate Limiting** - IP-based API throttling
- **Optimized Bundle** - Efficient code splitting

</td>
<td width="50%" valign="top">

### 🛠️ Developer Experience
- **TypeScript** - Full type safety
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Smooth animations
- **shadcn/ui** - High-quality components
- **Cloudflare Workers** - Serverless deployment

</td>
</tr>
</table>

## Core Features

### Professional Showcase
- Interactive hero section with skills taxonomy
- Experience timeline with domain expertise (Naval Shipping, Payments)
- Project gallery with live demos and GitHub integration
- Professional avatar and branding

### Interactive Components
- **Bento Grid Layout**: Widget-based dashboard design
- **Location Map**: Interactive Leaflet map integration
- **GitHub Commits**: Real-time activity feed from GitHub API
- **Click Counter**: Visitor engagement tracking with D1 database
- **Statistics Widget**: Portfolio analytics and metrics
- **Contact Widget**: Direct communication channels

### Technical Capabilities
- Edge runtime deployment on Cloudflare Workers
- D1 SQLite database for analytics and rate limiting
- Open Graph metadata for social media previews
- Custom branding (favicon, icons, OG images)
- Responsive design across all devices
- Dark mode optimized with Catppuccin theme

## Technical Architecture

**Frontend Stack:**
- Next.js 15.5 (App Router), React 18, TypeScript 5.6
- Tailwind CSS 3.4 with Catppuccin theming
- shadcn/ui components, Radix UI primitives
- Framer Motion animations, Lucide icons
- Leaflet maps, JetBrains Mono font

**Backend & Infrastructure:**
- Cloudflare Workers (Edge runtime)
- D1 Database (SQLite at the edge)
- OpenNext (@opennextjs/cloudflare)
- Analytics Engine binding
- GitHub API integration

**Build & Deploy:**
- Bun package manager
- Wrangler 4 CLI
- Cloudflare Pages deployment pipeline

## 🏗️ Architecture

### Visual Data Flow

```
┌─────────────┐
│   Browser   │  React 18 + Next.js 15
│  (Client)   │  Tailwind + Framer Motion
└──────┬──────┘
       │ HTTPS
       ▼
┌─────────────────────────────────────────────────────────┐
│           Cloudflare Edge (300+ Global PoPs)            │
│ ┌─────────────────────────────────────────────────────┐ │
│ │         Cloudflare Workers - Edge Runtime           │ │
│ │                                                       │ │
│ │  ┌──────────────┐          ┌───────────────┐       │ │
│ │  │   Next.js    │──────────│  API Routes   │       │ │
│ │  │   Routes     │          │               │       │ │
│ │  │              │          │ /counter      │       │ │
│ │  │ /, /about    │          │ /github/*     │       │ │
│ │  │ /projects    │          └───────┬───────┘       │ │
│ │  └──────┬───────┘                  │               │ │
│ │         │                          │               │ │
│ │         └──────────┬───────────────┘               │ │
│ │                    │                               │ │
│ │         ┌──────────┼──────────┐                   │ │
│ │         │          │          │                   │ │
│ └─────────┼──────────┼──────────┼───────────────────┘ │
│           ▼          ▼          ▼                     │
│    ┌──────────┐ ┌─────────┐ ┌──────────┐            │
│    │    D1    │ │Analytics│ │ Secrets  │            │
│    │ Database │ │ Engine  │ │  (Env)   │            │
│    │ (SQLite) │ │         │ │          │            │
│    └──────────┘ └─────────┘ └──────────┘            │
└─────────────────────────────────────────────────────────┘
                    │ Fetch
                    ▼
        ┌──────────────────────┐
        │   External Services  │
        │  • GitHub API        │
        │  • Leaflet Tiles     │
        └──────────────────────┘
```

### Feature-Specific Data Flows

#### 1. Click Counter Widget
```
User Click → BentoGrid Component → /api/counter/increment
                                           ↓
                                    Rate Limit Check (D1)
                                           ↓
                                    Update Counter (D1)
                                           ↓
                                    Log Visitor (D1)
                                           ↓
                                    Return New Count → Update UI
```

#### 2. GitHub Integration
```
Page Load → RecentCommitsWidget → /api/github/commits
                                         ↓
                                  GitHub API Request
                                  (with GITHUB_TOKEN)
                                         ↓
                                  Parse & Format Data
                                         ↓
                                  Cache at Edge (optional)
                                         ↓
                                  Return to Component → Render
```

#### 3. Location Map
```
About Page Load → LocationMapWidget → Leaflet.js Initialization
                                            ↓
                                     Fetch Tile Layers (CDN)
                                            ↓
                                     Render Interactive Map
                                            ↓
                                     Apply Custom Markers
```

#### 4. Metadata & SEO
```
Page Request → app/layout.tsx → Generate Metadata
                                      ↓
                          ┌───────────┼───────────┐
                          ▼           ▼           ▼
                    og:image    favicon.ico   og:title
                       │            │            │
                       └────────────┴────────────┘
                                   ▼
                          Serve from /app static
                                   ▼
                          Social Media Crawlers
```

#### 5. Analytics & Monitoring
```
User Visit → Middleware → Extract IP/User-Agent
                               ↓
                         Rate Limit Check (D1)
                               ↓
                         Log to visitors table
                               ↓
                         Optional: Analytics Engine binding
                               ↓
                         Continue to requested page
```

### Component Architecture

```
app/
├── layout.tsx (Root)
│   ├── Navigation (Global)
│   ├── [Page Content]
│   └── Footer (Global)
│
├── page.tsx (Home)
│   ├── PortfolioHero
│   │   └── Skills Display (from lib/data/skills.ts)
│   ├── Experience
│   │   └── Timeline Components
│   ├── PortfolioProjects
│   │   └── Project Cards
│   └── BentoGrid
│       ├── ContactWidget
│       ├── LocationMapWidget (Leaflet)
│       ├── ClickCounterWidget (D1)
│       ├── StatsWidget
│       ├── TestimonialsWidget
│       └── RecentCommitsWidget (GitHub API)
│
├── about/page.tsx
│   └── About
│       ├── Avatar Image (/public/avatar.png)
│       └── Social Links
│
└── projects/page.tsx
    └── Projects Showcase
```

### Edge Runtime Constraints

**Allowed:**
- Fetch API, Web Streams, Web Crypto
- D1 Database bindings
- Analytics Engine bindings
- Environment variables via `process.env`

**Not Allowed:**
- Node.js APIs (fs, path, crypto)
- Server-side only packages
- Long-running processes (10s timeout)

### Security & Performance

**Rate Limiting:**
- IP-based tracking in D1 `rate_limits` table
- Configurable windows (e.g., 60 requests/minute)
- Automatic cleanup of expired entries

**Caching Strategy:**
- Static assets: CDN cache (immutable)
- API routes: Conditional based on staleness
- Database queries: Edge-optimized D1

**Authentication:**
- Not required for public portfolio
- Future: Admin panel could use Better Auth pattern

## Database Schema

**counters**: Click tracking (`id`, `count`, `last_updated`)
**rate_limits**: API throttling (`ip`, `endpoint`, `count`, `window_start`)
**visitors**: Analytics (`id`, `ip`, `user_agent`, `visited_at`)

## Setup Instructions

### Requirements
- Bun 1.0+
- Cloudflare account
- GitHub personal access token (optional, for commits widget)

### Installation
```bash
git clone https://github.com/ionutcnu/Portfolio.git
cd Portfolio
bun install
```

### Database Setup
```bash
npx wrangler d1 create portfolio-counter
# Update wrangler.toml with database ID
npx wrangler d1 execute portfolio-counter --file=schema.sql
```

### Environment Variables
Create `.env.local`:
```bash
GITHUB_TOKEN=your_github_token
GITHUB_USERNAME=ionutcnu
```

### Development Workflow
```bash
bun run dev              # Start dev server (localhost:3000)
bun run build            # Production build
bun run deploy           # Deploy to Cloudflare
bun run preview          # Local Cloudflare preview
```

## Project Structure

```
Portfolio/
├── app/                    # Next.js App Router
│   ├── about/             # About page
│   ├── projects/          # Projects showcase
│   ├── api/               # API routes (Edge runtime)
│   ├── layout.tsx         # Root layout + metadata
│   ├── page.tsx           # Home page
│   ├── icon.png           # Site favicon
│   ├── favicon.ico        # Legacy browser icon
│   └── opengraph-image.png # Social preview
├── components/
│   ├── bento/             # Widget components
│   ├── sections/          # Page sections
│   ├── layout/            # Navigation, Footer
│   └── ui/                # shadcn/ui components
├── lib/
│   ├── data/              # Static content
│   └── utils/             # Helper functions
├── public/                # Static assets
│   └── avatar.png         # Professional avatar
├── types/                 # TypeScript definitions
├── wrangler.toml          # Cloudflare config
└── open-next.config.ts    # OpenNext adapter
```

## API Endpoints

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/api/counter/increment` | POST | Increment click counter |
| `/api/github/commits` | GET | Fetch recent commits |
| `/api/github/stats` | GET | GitHub profile stats |

## Configuration

**Cloudflare Bindings:**
- `DB`: D1 database (portfolio-counter)
- `ANALYTICS`: Analytics Engine

**Secrets (Wrangler):**
```bash
wrangler secret put GITHUB_TOKEN
```

**Metadata:**
- Domain: `lonut.dev`
- OG Image: 1920x1080px
- Favicon: Multiple sizes (16-512px)

## Performance Metrics

- **Edge Response**: <50ms global latency
- **Bundle Size**: Optimized chunks
- **Lighthouse Score**: 95+ performance
- **Database**: SQLite at edge (D1)
- **CDN**: 300+ global locations

## Skills Taxonomy

**API Testing**: Postman, REST APIs
**Databases**: PostgreSQL, SQL scripting
**Cloud & DevOps**: AWS S3, Azure, Kubernetes, Kibana
**Messaging**: Apache Kafka
**Automation**: Cypress, Selenium
**AI & Integration**: Prompt Engineering, Claude API, MCP Servers
**Other**: JSON, Microservices, Git

## Deployment

**Cloudflare Pages (Recommended):**
```bash
bun run build
bun run deploy
```

**Manual Wrangler:**
```bash
npx wrangler pages deploy .open-next/worker --project-name=portfolio
```

**GitHub Actions:**
Automated deployment via `.github/workflows/deploy.yml`

## Contributing

Contributions welcome. Follow standard fork-branch-PR workflow. Ensure TypeScript checks pass and test on Cloudflare Workers before submitting.

## License

MIT License - Free to use as template

## Contact

- **Website**: [lonut.dev](https://lonut.dev)
- **GitHub**: [@ionutcnu](https://github.com/ionutcnu)
- **LinkedIn**: [cioncu](https://linkedin.com/in/cioncu)
- **Location**: Pitesti, Romania

---

Built with Next.js, Tailwind CSS, and Cloudflare Workers
