# Lighthouse Audit Guide

## Overview
Lighthouse is a tool integrated into Chrome DevTools that audits web pages for performance, accessibility, SEO, and best practices.

## How to Run Lighthouse

### Method 1: Chrome DevTools (Recommended)

1. **Open your site** in Chrome:
   - Development: `http://localhost:3000`
   - Production: `https://mileswaite.net`

2. **Open DevTools**:
   - Press `F12` or `Ctrl+Shift+I` (Windows/Linux)
   - Press `Cmd+Option+I` (Mac)
   - Or right-click → "Inspect"

3. **Navigate to Lighthouse tab**:
   - Click the "Lighthouse" tab in DevTools
   - If you don't see it, click the `>>` icon to show more tabs

4. **Configure the audit**:
   - Select categories: Performance, Accessibility, Best Practices, SEO
   - Choose device: Mobile or Desktop
   - Click "Analyze page load"

5. **Review results**:
   - Scores: 0-100 (green = 90+, yellow = 50-89, red = 0-49)
   - Click on each category to see detailed recommendations
   - Expand sections to see specific issues

### Method 2: Chrome Lighthouse Extension

1. Install the [Lighthouse Chrome Extension](https://chrome.google.com/webstore/detail/lighthouse/blipmdconlkpinefehnmjammfjpmpbjk)
2. Click the extension icon while on your page
3. Select categories and run audit

### Method 3: Command Line (CI/CD)

```bash
npm install -g lighthouse
lighthouse http://localhost:3000 --view
```

Or with specific options:
```bash
lighthouse http://localhost:3000 \
  --only-categories=performance,accessibility,seo,best-practices \
  --output=html \
  --output-path=./lighthouse-report.html \
  --chrome-flags="--headless"
```

## Expected Scores After Optimization

### Performance
- **Before**: 60-70 (due to large images)
- **After**: 85-95 (with optimized images)
- **Target**: 90+

### Accessibility
- **Expected**: 90-100
- **Target**: 95+

### Best Practices
- **Expected**: 90-100
- **Target**: 95+

### SEO
- **Expected**: 90-100
- **Target**: 95+

## Common Issues & Fixes

### Performance Issues

#### Large Images
- ✅ **Fixed**: Optimized 4 large images (60MB → 4MB)
- **Impact**: 93% file size reduction

#### Render-Blocking Resources
- Check: CSS files, JavaScript bundles
- Fix: Use `next/font` for fonts, code splitting for JS

#### Unused JavaScript
- Check: Bundle analyzer (`npm run build:analyze`)
- Fix: Dynamic imports, remove unused dependencies

#### Cumulative Layout Shift (CLS)
- Check: Images without dimensions, dynamic content
- Fix: Set `width` and `height` on images, reserve space

### Accessibility Issues

#### Missing Alt Text
- Check: All images have descriptive `alt` attributes
- Fix: Update Image components with meaningful alt text

#### Color Contrast
- Check: Text contrast ratios (WCAG AA: 4.5:1)
- Fix: Adjust text colors in Tailwind config

#### Keyboard Navigation
- Check: All interactive elements are keyboard accessible
- Fix: Add focus states, ensure tab order

### SEO Issues

#### Missing Meta Tags
- ✅ **Fixed**: Metadata added to all pages
- Check: OpenGraph, Twitter cards, descriptions

#### Missing Structured Data
- ✅ **Fixed**: JSON-LD schemas added
- Check: Person, Organization, Website schemas

#### Sitemap
- ✅ **Fixed**: Dynamic sitemap at `/sitemap.xml`
- Check: All pages included, proper priorities

## Monitoring Performance

### Core Web Vitals

1. **Largest Contentful Paint (LCP)**
   - Target: < 2.5 seconds
   - Measure: Time to largest content element (hero image)
   - Optimize: Image optimization, CDN, preloading

2. **First Input Delay (FID)**
   - Target: < 100 milliseconds
   - Measure: Time until user can interact
   - Optimize: Reduce JavaScript execution time

3. **Cumulative Layout Shift (CLS)**
   - Target: < 0.1
   - Measure: Visual stability during load
   - Optimize: Set image dimensions, avoid dynamic content shifts

### How to View Core Web Vitals

1. **Chrome DevTools**:
   - Performance tab → Record → Reload page
   - Look for Web Vitals metrics

2. **Vercel Analytics**:
   - Automatically tracks Web Vitals
   - View in Vercel dashboard

3. **Google Search Console**:
   - Core Web Vitals report
   - Shows real user metrics

## Next Steps After Audit

1. **Fix Critical Issues** (red scores)
   - Focus on Performance first
   - Then Accessibility and SEO

2. **Monitor Regularly**:
   - Run Lighthouse weekly
   - Track scores over time
   - Set up alerts for score drops

3. **Optimize Continuously**:
   - Bundle size analysis (`npm run build:analyze`)
   - Image optimization
   - Code splitting
   - Caching strategies

## Resources

- [Lighthouse Documentation](https://developers.google.com/web/tools/lighthouse)
- [Web Vitals](https://web.dev/vitals/)
- [Next.js Performance](https://nextjs.org/docs/app/building-your-application/optimizing)
- [Image Optimization Guide](https://nextjs.org/docs/app/building-your-application/optimizing/images)





