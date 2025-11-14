# Cloudflare Pages Deployment Guide

## Quick Deploy to Cloudflare Pages

### Option 1: Deploy via Wrangler CLI (Recommended)

1. **Build the static site**
   ```bash
   npm run build
   ```

2. **Login to Cloudflare** (first time only)
   ```bash
   npx wrangler login
   ```

3. **Deploy to Cloudflare Pages**
   ```bash
   npx wrangler pages deploy ./out --project-name=portfolio
   ```

   Or use the shortcut script:
   ```bash
   npm run pages:deploy
   ```

4. **Done!** Your site will be live at: `https://portfolio.pages.dev`

### Option 2: Deploy via Dashboard (Alternative)

1. **Push your code to GitHub** (already done!)

2. **Go to Cloudflare Pages**
   - Visit https://pages.cloudflare.com/
   - Sign in with your Cloudflare account (or create one)

3. **Create a new project**
   - Click "Create a project"
   - Connect to your GitHub account
   - Select the `Portfolio` repository

4. **Configure build settings**
   ```
   Framework preset: Next.js (Static HTML Export)
   Build command: npm run build
   Build output directory: out
   Root directory: (leave empty)
   Node version: 18
   ```

5. **Deploy!**
   - Click "Save and Deploy"
   - Your site will be live in ~2-3 minutes
   - You'll get a URL like: `portfolio-xxx.pages.dev`

## Custom Domain Setup

After deployment, you can add a custom domain:

1. Go to your Cloudflare Pages project
2. Click "Custom domains"
3. Add your domain (e.g., ionut.dev)
4. Follow the DNS setup instructions

## Automatic Deployments

Once connected to GitHub, Cloudflare Pages will:
- ✅ Auto-deploy on every push to main branch
- ✅ Create preview deployments for pull requests
- ✅ Provide unique URLs for each deployment

## Features Available

Your portfolio on Cloudflare Pages includes:
- ✅ Global CDN (super fast worldwide)
- ✅ Automatic HTTPS
- ✅ Unlimited bandwidth
- ✅ DDoS protection
- ✅ Web Analytics (optional)
- ✅ Free hosting!

## Build Information

- **Framework**: Next.js 15 (Static Export)
- **Build Command**: `npm run build`
- **Output Directory**: `out`
- **Node Version**: 18.17.0
- **Export Type**: Static HTML/CSS/JS

## Local Development

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run pages:dev
```

## Troubleshooting

### Build fails?
- Make sure all dependencies are in package.json
- Check that the build command works locally: `npm run build`
- Verify the `out` directory is created after build

### Images not loading?
- Static export uses unoptimized images
- All images are served as-is from the build

### Theme not working?
- Clear browser cache
- Check browser console for errors
- Theme state is saved in localStorage

### Wrangler errors?
- Make sure you're logged in: `npx wrangler login`
- Check project name doesn't conflict
- Use `npx wrangler pages deploy ./out` manually

## Performance

Your Cloudflare Pages site will have:
- **First Load**: < 1s globally
- **Time to Interactive**: < 2s
- **Lighthouse Score**: 95+ (Performance)
- **Static Assets**: All pre-rendered at build time

## Support

- Cloudflare Pages Docs: https://developers.cloudflare.com/pages/
- Next.js Static Export: https://nextjs.org/docs/app/building-your-application/deploying/static-exports
- Wrangler CLI: https://developers.cloudflare.com/workers/wrangler/

---

**Pro Tip**: Your portfolio is now a fully static site optimized for Cloudflare's global CDN. It will load instantly anywhere in the world!
