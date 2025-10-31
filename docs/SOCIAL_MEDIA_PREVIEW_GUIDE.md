# Social Media Preview Testing Guide

This guide helps you test and verify how your site appears when shared on social media platforms.

## 🎯 Testing Tools

### 1. **Facebook/Meta Debugger**
**URL**: https://developers.facebook.com/tools/debug/

**How to use:**
1. Enter your page URL (e.g., `https://mileswaite.net/blog/complex-systems-platform`)
2. Click "Debug"
3. Review the preview image, title, and description
4. If changes don't appear, click "Scrape Again" to clear Facebook's cache

**What to check:**
- ✅ Image displays correctly (1200x630px recommended)
- ✅ Title is under 60 characters
- ✅ Description is under 200 characters
- ✅ URL is correct

### 2. **Twitter Card Validator**
**URL**: https://cards-dev.twitter.com/validator

**How to use:**
1. Enter your page URL
2. View the card preview
3. Check for any warnings or errors

**What to check:**
- ✅ Large image card displays (summary_large_image)
- ✅ Title is concise
- ✅ Description is clear
- ✅ Image meets Twitter's requirements

### 3. **LinkedIn Post Inspector**
**URL**: https://www.linkedin.com/post-inspector/

**How to use:**
1. Sign in to LinkedIn
2. Enter your page URL
3. Click "Inspect"
4. View the preview

**What to check:**
- ✅ Image appears correctly
- ✅ Title and description are appropriate for professional audience
- ✅ No broken links

### 4. **Open Graph Preview**
**URL**: https://www.opengraph.xyz/

**How to use:**
1. Enter your URL
2. View preview for multiple platforms
3. Check Open Graph tags

**What to check:**
- ✅ All Open Graph tags are present
- ✅ Images load correctly
- ✅ Metadata is accurate

## 📋 Checklist for Each Page

### Homepage (`/`)
- [ ] Title: "mileswaite.net"
- [ ] Description includes key topics
- [ ] Image: `/op-image.jpg` (1200x630px)
- [ ] Works on Facebook, Twitter, LinkedIn

### Blog Posts (`/blog/[slug]`)
- [ ] Unique title per post
- [ ] Relevant description/excerpt
- [ ] Appropriate image (can be post-specific)
- [ ] Published date in Open Graph
- [ ] Author information

### Project Pages (`/projects/[slug]`)
- [ ] Project-specific title
- [ ] Long description as meta description
- [ ] Project image as Open Graph image
- [ ] Technology tags included

## 🔧 Fixing Common Issues

### Image Not Showing?
1. **Check image exists**: Verify `/op-image.jpg` exists in `public/` folder
2. **Check absolute URL**: Open Graph images must use absolute URLs
3. **Check dimensions**: Recommended 1200x630px (1.91:1 ratio)
4. **Clear cache**: Use "Scrape Again" in Facebook Debugger

### Title/Description Wrong?
1. **Check metadata**: Verify `metadata` export in page/layout file
2. **Check template**: Ensure `metadataBase` is set correctly
3. **Rebuild**: Run `npm run build` to regenerate static pages
4. **Clear cache**: Scrape again in social media debuggers

### Preview Not Updating?
1. **Clear platform cache**: Use "Scrape Again" / "Refresh" buttons
2. **Wait**: Some platforms cache for 24-48 hours
3. **Force refresh**: Add `?v=2` to URL temporarily
4. **Redeploy**: Trigger a new deployment to force refresh

## 📐 Image Requirements

### Optimal Sizes:
- **Facebook/LinkedIn**: 1200x630px (1.91:1)
- **Twitter**: 1200x675px (16:9) for large image cards
- **Generic**: 1200x630px works for all platforms

### File Format:
- **Format**: JPEG or PNG
- **Size**: Under 5MB (1MB recommended)
- **Quality**: High quality, optimized

### Best Practices:
- Include text overlay for context
- Use high contrast
- Include your branding
- Avoid important content in edges (may be cropped)

## 🧪 Testing Checklist

Before sharing important content:

- [ ] Test homepage preview
- [ ] Test blog post previews
- [ ] Test project page previews
- [ ] Verify images load on all platforms
- [ ] Check mobile preview (use mobile emulator)
- [ ] Verify titles aren't truncated
- [ ] Ensure descriptions are complete
- [ ] Test with shortened URLs (if using)

## 🚀 Quick Test URLs

Test these pages:
- Homepage: `https://mileswaite.net`
- Blog: `https://mileswaite.net/blog`
- Complex Systems Post: `https://mileswaite.net/blog/complex-systems-platform`
- Sample Project: `https://mileswaite.net/projects/emergent-geometry`

## 📝 Notes

- Facebook caches aggressively - use Debugger to force refresh
- Twitter requires "Scrape URL" for first-time testing
- LinkedIn updates within minutes after inspector use
- Some platforms may show different previews on mobile vs desktop

