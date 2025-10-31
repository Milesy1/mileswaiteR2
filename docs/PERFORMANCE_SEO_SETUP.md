# Performance & SEO Setup Guide

This document outlines the performance optimizations, SEO enhancements, and monitoring tools configured for mileswaite.net.

## ✅ Implemented Features

### 🚀 Performance Optimizations

#### 1. **Caching Strategies**
- **Static Assets**: Aggressive caching (1 year) for `/_next/static/`, `/images/`, `/fonts/`
- **API Routes**: Smart caching with revalidation for `/api/stats` (90s cache, 180s stale-while-revalidate)
- **Study Data**: Caching headers on Lorenz/chaos study endpoints (60s-3600s depending on data type)

#### 2. **Image Optimization**
- Next.js Image component with automatic AVIF/WebP conversion
- Responsive image sizes: 640, 750, 828, 1080, 1200, 1920, 2048px
- Optimized image sizes: 16, 32, 48, 64, 96, 128, 256, 384px

#### 3. **Bundle Optimization**
- Code splitting via Next.js App Router
- Dynamic imports for heavy libraries (p5.js, Three.js)
- Package import optimization for `framer-motion`, `@react-three/fiber`, `three`
- Bundle analyzer available: `npm run build:analyze`

### 🔍 SEO Enhancements

#### 1. **Meta Tags**
- ✅ Comprehensive metadata in `app/layout.tsx`
- ✅ Dynamic metadata for project pages
- ✅ Blog post metadata with Open Graph
- ✅ Twitter Card support
- ✅ Blog page metadata in `app/blog/layout.tsx`

#### 2. **Structured Data (JSON-LD)**
- ✅ PersonSchema (skills, education, credentials)
- ✅ OrganizationSchema (portfolio organization)
- ✅ WebsiteSchema (search action support)
- ✅ ArticleSchema (for blog posts)
- ✅ ProjectSchema (for project pages)

#### 3. **Sitemap**
- ✅ Dynamic sitemap generation (`app/sitemap.ts`)
- ✅ Includes all static pages, projects, and blog posts
- ✅ Proper priorities and change frequencies
- ✅ Accurate lastModified dates

#### 4. **Robots.txt**
- ✅ Automatic generation (`app/robots.ts`)
- ✅ Allows search engines, blocks admin/debug routes
- ✅ Points to sitemap.xml

### 📊 Monitoring & Analytics

#### 1. **Core Web Vitals**
- ✅ Web Vitals tracking component (`components/WebVitals.tsx`)
- ✅ Integrates with Vercel Analytics
- ✅ Google Analytics 4 event tracking
- ✅ Metrics tracked: CLS, FID, FCP, LCP, TTFB, INP

#### 2. **Error Tracking**
- ✅ Error tracking setup (`lib/error-tracking.ts`)
- ✅ Sentry support (configured but optional)
- ✅ LogRocket support (configured but optional)
- ✅ Global error handlers

#### 3. **Analytics**
- ✅ Vercel Analytics (automatic)
- ✅ Google Analytics 4 (if `NEXT_PUBLIC_GA_MEASUREMENT_ID` set)
- ✅ PostHog support (if configured)

## 🔧 Configuration

### Environment Variables

Add these to your `.env.local` for full functionality:

```bash
# Google Analytics
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX

# Google Search Console Verification
GOOGLE_SITE_VERIFICATION=your-verification-code

# Error Tracking (Optional)
NEXT_PUBLIC_SENTRY_DSN=https://your-sentry-dsn@sentry.io/project-id
NEXT_PUBLIC_LOGROCKET_APP_ID=your-logrocket-app-id
```

### Bundle Analysis

To analyze your bundle size:

```bash
npm run build:analyze
```

This will generate interactive bundle analysis reports in `.next/analyze/`.

## 📈 Performance Checklist

### Lighthouse Audit

Run Lighthouse in Chrome DevTools:
1. Open Chrome DevTools (F12)
2. Go to "Lighthouse" tab
3. Select categories: Performance, Accessibility, Best Practices, SEO
4. Click "Analyze page load"

**Target Scores:**
- Performance: 90+
- Accessibility: 95+
- Best Practices: 95+
- SEO: 95+

### Core Web Vitals Targets

- **LCP (Largest Contentful Paint)**: < 2.5s (Good)
- **FID (First Input Delay)**: < 100ms (Good)
- **CLS (Cumulative Layout Shift)**: < 0.1 (Good)
- **FCP (First Contentful Paint)**: < 1.8s (Good)
- **TTFB (Time to First Byte)**: < 800ms (Good)
- **INP (Interaction to Next Paint)**: < 200ms (Good)

## 🧪 Testing Social Media Previews

### Tools:
1. **Facebook Debugger**: https://developers.facebook.com/tools/debug/
2. **Twitter Card Validator**: https://cards-dev.twitter.com/validator
3. **LinkedIn Post Inspector**: https://www.linkedin.com/post-inspector/
4. **Open Graph Preview**: https://www.opengraph.xyz/

### Steps:
1. Enter your URL (e.g., `https://mileswaite.net/blog/complex-systems-platform`)
2. Check preview image, title, description
3. If changes don't appear, use "Scrape Again" to clear cache

## 🔄 Cache Invalidation

### For Vercel:
- Static pages: Automatically rebuilt on deployment
- API routes: Respect `revalidate` and cache headers
- Images: Cleared on rebuild

### Manual Cache Clear:
- Vercel Dashboard → Your Project → Settings → Clear Cache
- Or redeploy to clear all caches

## 📝 Next Steps

### Immediate:
1. ✅ Set up Google Search Console verification code
2. ✅ Test social media previews
3. ✅ Run Lighthouse audit
4. ✅ Set up Sentry (optional but recommended)

### Future Improvements:
- [ ] Add RSS feed for blog
- [ ] Implement sitemap indexing in Search Console
- [ ] Add more granular caching for API routes
- [ ] Implement service worker for offline support
- [ ] Add progressive web app (PWA) manifest

## 🐛 Troubleshooting

### Bundle Size Too Large?
- Run `npm run build:analyze` to identify large dependencies
- Consider code splitting or dynamic imports
- Remove unused dependencies

### Images Not Optimizing?
- Ensure using Next.js `<Image>` component
- Check `next.config.js` image configuration
- Verify image formats (AVIF/WebP) are supported

### Meta Tags Not Showing?
- Check `metadataBase` is set correctly
- Verify Open Graph images exist at specified paths
- Use social media debuggers to test

### Web Vitals Not Tracking?
- Verify `web-vitals` package is installed
- Check browser console for errors
- Ensure Vercel Analytics is enabled

## 📚 Resources

- [Next.js Image Optimization](https://nextjs.org/docs/app/building-your-application/optimizing/images)
- [Next.js Metadata API](https://nextjs.org/docs/app/api-reference/functions/generate-metadata)
- [Web Vitals](https://web.dev/vitals/)
- [Core Web Vitals Guide](https://web.dev/vitals/)
- [Google Search Console](https://search.google.com/search-console)

