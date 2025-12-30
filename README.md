# Ionut's Portfolio Website

A modern, responsive portfolio website built with Next.js, Tailwind CSS, shadcn/ui, and Framer Motion animations, featuring an interactive Bento Grid layout with customizable widgets.

## Features

- **Bento Grid Layout**: Interactive widget-based layout showcasing different aspects of the portfolio
- **Customizable Theme**: Accent color picker with Catppuccin color scheme support
- **Interactive Widgets**: 
  - Location map integration with Leaflet
  - Real-time GitHub commits display
  - Click counter widget
  - Contact information widget
  - Statistics widget
- **Modern Design**: Clean, professional design with smooth animations
- **Fully Responsive**: Optimized for all device sizes
- **Dark Mode Support**: Built-in dark mode styling with shadcn/ui
- **Animated Components**: Smooth transitions and animations using Framer Motion
- **GitHub Integration**: Automatically showcases projects and recent commits from GitHub
- **TypeScript**: Fully typed for better development experience
- **SEO Optimized**: Meta tags and semantic HTML for better search engine visibility
- **Multi-platform Deployment**: Support for Vercel and Cloudflare Workers

## Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) + [Catppuccin](https://github.com/catppuccin/tailwindcss) theming
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/) + [Radix UI](https://www.radix-ui.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Maps**: [Leaflet](https://leafletjs.com/) + [React Leaflet](https://react-leaflet.js.org/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Fonts**: [JetBrains Mono](https://www.jetbrains.com/lp/mono/)
- **Language**: TypeScript
- **Deployment**: Cloudflare Workers + Vercel support

## Getting Started

### Prerequisites

- [Bun](https://bun.sh/) 1.0+

### Installation

1. Clone the repository:
```bash
git clone https://github.com/ionutcnu/Portfolio.git
cd Portfolio
```

2. Install dependencies:
```bash
bun install
```

3. Run the development server:
```bash
bun run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Available Scripts

- `bun run dev` - Start the development server
- `bun run build` - Build the application for production
- `bun run start` - Start the production server
- `bun run lint` - Run ESLint
- `bun run cloudflare:build` - Build for Cloudflare Workers deployment
- `bun run deploy` - Deploy to Cloudflare Workers
- `bun run preview` - Preview Cloudflare Workers build locally
- `bun run remote` - Run development server with Cloudflare Workers remote

## Project Structure

```
Portfolio/
├── app/                    # Next.js app directory
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout with navigation and footer
│   └── page.tsx           # Home page with Bento Grid
├── components/            # React components
│   ├── ui/               # Reusable UI components (shadcn/ui)
│   ├── bento/           # Bento Grid widgets
│   │   ├── AccentColorPicker.tsx    # Theme color customization
│   │   ├── BentoGrid.tsx           # Grid layout component
│   │   ├── ClickCounterWidget.tsx   # Interactive click counter
│   │   ├── ContactWidget.tsx        # Contact information display
│   │   ├── LocationMapWidget.tsx    # Interactive location map
│   │   ├── RecentCommitsWidget.tsx  # GitHub commits display
│   │   ├── StatsWidget.tsx         # Portfolio statistics
│   │   └── ThemeSwitcher.tsx       # Dark/light mode toggle
│   ├── About.tsx         # About section
│   ├── Contact.tsx       # Contact section
│   ├── Experience.tsx    # Professional experience
│   ├── Footer.tsx        # Footer component
│   ├── Navigation.tsx    # Navigation bar
│   ├── PortfolioHero.tsx # Hero section
│   ├── PortfolioProjects.tsx # Projects showcase
│   └── Skills.tsx        # Skills section
├── lib/                  # Utility functions and API integrations
├── types/               # TypeScript type definitions
├── public/              # Static assets
├── wrangler.toml        # Cloudflare Workers configuration
└── open-next.config.ts  # OpenNext configuration for Cloudflare
```

## Customization

### Updating Personal Information

Edit the components to update your personal information:

- **Hero.tsx**: Update name, location, and introduction
- **About.tsx**: Modify about section content
- **Projects.tsx**: Update project list
- **Skills.tsx**: Add/remove skills
- **Contact.tsx**: Update contact information

### Styling

The project uses Tailwind CSS with a custom theme configuration. You can modify:

- `tailwind.config.ts` - Tailwind configuration
- `app/globals.css` - Global styles and CSS variables

## Deployment

### Cloudflare Workers (Recommended)

1. Install Wrangler CLI: `npm install -g wrangler`
2. Authenticate with Cloudflare: `wrangler login`
3. Configure `wrangler.toml` with your account details
4. Deploy: `bun run deploy`

For local preview: `bun run preview`

### Vercel

1. Push your code to GitHub
2. Import your repository on [Vercel](https://vercel.com)
3. Deploy with one click

### Other Platforms

The portfolio can be deployed to any platform that supports Next.js:

- Netlify
- AWS Amplify
- Cloudflare Pages
- Railway

## License

MIT License - feel free to use this template for your own portfolio!

## Contact

- GitHub: [@ionutcnu](https://github.com/ionutcnu)
- Email: contact@ionut.dev
- Location: Romania

---

Built with ❤️ using Next.js and Tailwind CSS
