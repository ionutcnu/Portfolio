# Ionut's Portfolio Website

A modern, responsive portfolio website built with Next.js, Tailwind CSS, shadcn/ui, and Framer Motion animations.

## Features

- **Modern Design**: Clean, professional design with smooth animations
- **Fully Responsive**: Optimized for all device sizes
- **Dark Mode Support**: Built-in dark mode styling with shadcn/ui
- **Animated Components**: Smooth transitions and animations using Framer Motion
- **GitHub Integration**: Automatically showcases projects from GitHub
- **TypeScript**: Fully typed for better development experience
- **SEO Optimized**: Meta tags and semantic HTML for better search engine visibility

## Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Language**: TypeScript

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

1. Clone the repository:
```bash
git clone https://github.com/ionutcnu/Portfolio.git
cd Portfolio
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the application for production
- `npm start` - Start the production server
- `npm run lint` - Run ESLint

## Project Structure

```
Portfolio/
├── app/                    # Next.js app directory
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── ui/               # Reusable UI components
│   ├── About.tsx         # About section
│   ├── Contact.tsx       # Contact section
│   ├── Footer.tsx        # Footer component
│   ├── Hero.tsx          # Hero section
│   ├── Navigation.tsx    # Navigation bar
│   ├── Projects.tsx      # Projects showcase
│   └── Skills.tsx        # Skills section
├── lib/                  # Utility functions
└── public/              # Static assets
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

### Vercel (Recommended)

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
