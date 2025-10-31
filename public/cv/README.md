# CV / Resume Directory

Place your CV/Resume PDF file here with the filename: **Miles-Waite-CV.pdf**

## Instructions:

1. Export your CV as a PDF
2. Name it: `Miles-Waite-CV.pdf`
3. Place it in this directory: `public/cv/`
4. The download button on your About page will automatically work!

## Current Setup:

The About page (`app/about/about.tsx`) has a download button that links to:
- `/cv/Miles-Waite-CV.pdf`

When users click "Download CV / Resume", it will download your PDF file.

## Alternative Filenames:

If you want to use a different filename, update line 148 in `app/about/about.tsx`:
```tsx
href="/cv/YOUR-FILENAME.pdf"
```




















