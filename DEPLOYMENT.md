# Deployment Guide - HRMS + IEMS System

## 🚀 Quick Deployment to Vercel

### Prerequisites
- Node.js 16+ installed
- Git repository (optional but recommended)
- Vercel account (free at vercel.com)

### Step 1: Prepare Your Project

```bash
# Navigate to your project directory
cd hrms-iems-frontend

# Install dependencies
pnpm install

# Test build locally
pnpm run build

# Test production build
pnpm run preview
```

### Step 2: Deploy to Vercel

#### Option A: Using Vercel CLI
```bash
# Install Vercel CLI globally (if not already installed)
npm i -g vercel

# Deploy from project directory
vercel

# Follow prompts:
# - Connect Git repository (optional)
# - Confirm project settings
# - Deploy

# View deployment
vercel --prod
```

#### Option B: Using GitHub
```bash
# 1. Push code to GitHub
git add .
git commit -m "Initial commit: HRMS + IEMS frontend"
git push origin main

# 2. Go to vercel.com and click "New Project"
# 3. Select your GitHub repository
# 4. Vercel auto-detects Next.js
# 5. Click Deploy

# Automatic deployments on every push
```

#### Option C: Using Vercel Dashboard
1. Go to https://vercel.com/dashboard
2. Click "New Project"
3. Select "Clone Template" or "Import Git Repository"
4. Choose your repository
5. Configure environment variables (if needed)
6. Click "Deploy"

### Step 3: Configure Environment Variables (if needed)

```bash
# Create .env.local file
DATABASE_URL=your_database_url
API_KEY=your_api_key
NEXT_PUBLIC_API_URL=https://your-api.com

# In Vercel Dashboard:
# Go to Settings → Environment Variables
# Add each variable for different environments
```

### Step 4: Custom Domain

1. Go to your Vercel project Settings
2. Click "Domains"
3. Add custom domain
4. Follow DNS configuration instructions
5. Wait for SSL certificate (usually instant)

---

## 📦 Deployment Options

### 1. Vercel (Recommended)
- **Cost**: Free tier available
- **Setup Time**: 2 minutes
- **Best For**: Next.js projects
- **Features**: 
  - Automatic deployments
  - Preview URLs
  - Analytics
  - Edge functions
  - Serverless functions

```bash
vercel deploy
```

### 2. Netlify
- **Cost**: Free tier available
- **Setup Time**: 3 minutes
- **Build Command**: `pnpm run build`
- **Publish Directory**: `.next`

### 3. AWS
- **Cost**: Pay per use
- **Setup Time**: 15-30 minutes
- **Services**: S3 + CloudFront + EC2

### 4. Docker Deployment

```dockerfile
FROM node:18-alpine
WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY .next ./.next
COPY public ./public

EXPOSE 3000
CMD ["npm", "start"]
```

```bash
# Build Docker image
docker build -t hrms-iems:latest .

# Run container
docker run -p 3000:3000 hrms-iems:latest
```

### 5. Self-Hosted
```bash
# Build for production
npm run build

# Start server
npm start

# Or use PM2 for process management
pm2 start npm --name "hrms" -- start
```

---

## 🔧 Build Configuration

### package.json Scripts
```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "preview": "next build && next start"
  }
}
```

### next.config.mjs
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    unoptimized: false,
    domains: [],
  },
};

export default nextConfig;
```

---

## 🔐 Security Checklist

Before deploying to production:

- [ ] Remove all console.log() debug statements
- [ ] Replace mock data with real API calls
- [ ] Implement proper authentication (OAuth/JWT)
- [ ] Add HTTPS only
- [ ] Configure CORS properly
- [ ] Implement rate limiting
- [ ] Add security headers:
  ```javascript
  // next.config.mjs
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'X-XSS-Protection', value: '1; mode=block' },
        ],
      },
    ];
  }
  ```
- [ ] Validate all user inputs
- [ ] Sanitize outputs
- [ ] Implement CSP headers
- [ ] Use environment variables for secrets
- [ ] Enable 2FA for accounts
- [ ] Set up monitoring and alerts

---

## 📊 Performance Optimization

### Before Deployment

```bash
# Audit performance
npm run build

# Check bundle size
npm run analyze  # (requires @next/bundle-analyzer)
```

### nextConfig Optimizations
```javascript
// next.config.mjs
export default {
  compress: true,
  swcMinify: true,
  poweredByHeader: false,
  productionBrowserSourceMaps: false,
  
  images: {
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96],
  },
};
```

### Code Splitting
- Already handled by Next.js
- Routes are automatically code-split
- Components lazy loaded when needed

### Image Optimization
```tsx
import Image from 'next/image';

<Image
  src="/image.jpg"
  alt="Description"
  width={1200}
  height={600}
  priority={false}
/>
```

---

## 🔍 Monitoring & Analytics

### Vercel Analytics
- Automatically enabled on Vercel
- View at: Project → Analytics

### Sentry (Error Tracking)
```javascript
// pages/_app.tsx
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  environment: process.env.NODE_ENV,
});
```

### Google Analytics
```tsx
// app/layout.tsx
import Script from 'next/script';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=GA_ID"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'GA_ID');`}
        </Script>
      </body>
    </html>
  );
}
```

---

## 🚨 Troubleshooting Deployment

### Build Fails
```bash
# Clear build cache
rm -rf .next

# Clear node modules
rm -rf node_modules
pnpm install

# Rebuild
pnpm run build
```

### Slow Performance
- Check bundle size: `npm run analyze`
- Enable compression: Set in next.config
- Use CDN for static assets
- Enable image optimization
- Code split lazy-load heavy components

### Port Already in Use
```bash
# Find and kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Or use different port
PORT=3001 npm run dev
```

### Environment Variables Not Loading
```bash
# Check .env.local exists
cat .env.local

# Make sure variables are prefixed with NEXT_PUBLIC_ for client
NEXT_PUBLIC_API_URL=...

# Restart dev server after .env changes
```

---

## 📋 Pre-Launch Checklist

### Code Quality
- [ ] No linting errors: `npm run lint`
- [ ] No TypeScript errors
- [ ] No console errors in browser
- [ ] All pages responsive
- [ ] All links working
- [ ] Forms working
- [ ] No broken images

### Functionality
- [ ] Login/logout working
- [ ] Role-based access working
- [ ] All CRUD operations working
- [ ] Filters and search working
- [ ] Drag-and-drop working
- [ ] Multi-step forms working
- [ ] Export/download working

### Performance
- [ ] Lighthouse score > 90
- [ ] Bundle size optimized
- [ ] Images optimized
- [ ] No memory leaks
- [ ] API calls efficient

### SEO
- [ ] Meta tags set correctly
- [ ] Open Graph tags added
- [ ] sitemap.xml created
- [ ] robots.txt configured
- [ ] Canonical URLs set

### Security
- [ ] No secrets in code
- [ ] HTTPS enabled
- [ ] CORS configured
- [ ] CSP headers set
- [ ] Input validation working

### Analytics
- [ ] Google Analytics working
- [ ] Error tracking configured
- [ ] Performance monitoring enabled
- [ ] User tracking configured

---

## 📊 Post-Deployment Monitoring

### Daily Checks
- [ ] Application loading
- [ ] No errors in logs
- [ ] Performance metrics normal
- [ ] User traffic patterns normal
- [ ] Database connections healthy

### Weekly Reviews
- [ ] Error rates trending down
- [ ] Performance stable
- [ ] No security alerts
- [ ] User feedback review
- [ ] Backup status

### Monthly Analysis
- [ ] Usage patterns analysis
- [ ] Performance reports
- [ ] User engagement metrics
- [ ] Cost analysis
- [ ] Security audit

---

## 🔄 Update & Rollback Procedures

### Deploying Updates
```bash
# Test locally
pnpm run build
pnpm run preview

# Commit and push
git add .
git commit -m "Update: [description]"
git push origin main

# Vercel automatically deploys
```

### Rollback to Previous Version
```bash
# In Vercel Dashboard
# Go to Deployments
# Click on previous deployment
# Click "Redeploy"

# Or via CLI
vercel rollback
```

---

## 💰 Cost Optimization

### Vercel Pricing
- **Free**: $0 (perfect for POC)
- **Pro**: $20/month per user
- **Enterprise**: Custom pricing

### Cost-Saving Tips
1. Use free tier for development
2. Optimize API calls
3. Enable caching
4. Compress images
5. Monitor bandwidth usage
6. Clean up old deployments

---

## 🎓 Production Deployment Best Practices

1. **Always test in staging** before production
2. **Use environment variables** for configuration
3. **Enable logging** for debugging
4. **Set up monitoring** for alerts
5. **Implement backups** for data
6. **Use CDN** for static assets
7. **Enable GZIP compression**
8. **Set cache headers** appropriately
9. **Monitor error rates**
10. **Plan for scale** from day one

---

## 📞 Support & Resources

### Vercel Documentation
- https://vercel.com/docs

### Next.js Documentation
- https://nextjs.org/docs

### Deployment Guides
- Vercel: https://vercel.com/guides
- Netlify: https://docs.netlify.com
- AWS: https://aws.amazon.com/getting-started/

### Performance Tools
- Google PageSpeed: https://pagespeed.web.dev
- GTmetrix: https://gtmetrix.com
- WebPageTest: https://www.webpagetest.org

---

## ✅ Summary

1. **Prepare**: Test locally, check security
2. **Deploy**: Use Vercel (recommended)
3. **Configure**: Set environment variables, domain
4. **Monitor**: Set up analytics and error tracking
5. **Maintain**: Regular backups and security audits

Your HRMS + IEMS system is now ready for production! 🎉
