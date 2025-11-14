# Cloudflare Pages Deployment Guide

## Quick Deploy to Cloudflare Pages

### Option 1: Deploy via Dashboard (Easiest)

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
   Framework preset: Next.js
   Build command: npm run build
   Build output directory: .next
   Root directory: (leave empty)
   ```

5. **Environment Variables** (Optional)
   - Add any environment variables if needed
   - For this portfolio, none are required

6. **Deploy!**
   - Click "Save and Deploy"
   - Your site will be live in ~2-3 minutes
   - You'll get a URL like: `portfolio-xxx.pages.dev`

### Option 2: Deploy via Wrangler CLI

1. **Install Wrangler**
   ```bash
   npm install -g wrangler
   ```

2. **Login to Cloudflare**
   ```bash
   wrangler login
   ```

3. **Deploy**
   ```bash
   npm run build
   npx wrangler pages deploy .next --project-name=portfolio
   ```

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

- **Framework**: Next.js 15
- **Build Command**: `npm run build`
- **Output Directory**: `.next`
- **Node Version**: 18.17.0

## Troubleshooting

### Build fails?
- Make sure all dependencies are in package.json
- Check that the build command works locally: `npm run build`

### Images not loading?
- Verify the image domains in next.config.ts
- Check the image URLs in your components

### Theme not working?
- Clear browser cache
- Check browser console for errors

## Performance

Your Cloudflare Pages site will have:
- **First Load**: < 1s globally
- **Time to Interactive**: < 2s
- **Lighthouse Score**: 95+ (Performance)

## Support

- Cloudflare Pages Docs: https://developers.cloudflare.com/pages/
- Next.js on Pages: https://developers.cloudflare.com/pages/framework-guides/nextjs/

---

**Pro Tip**: Cloudflare Pages is perfect for this portfolio - it's fast, free, and handles the dark theme switching beautifully!
