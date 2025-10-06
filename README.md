# Miles Portfolio

A modern, responsive portfolio website built with Next.js 14+ App Router and Tailwind CSS, featuring smooth animations, 3D graphics, and a clean, professional design inspired by modern web standards.

## 🚀 Features

- **Next.js 14+ App Router**: Latest Next.js features with App Router architecture
- **Tailwind CSS**: Utility-first CSS framework with custom design system
- **Framer Motion**: Smooth animations and micro-interactions
- **Three.js Integration**: Interactive 3D graphics with React Three Fiber
- **Responsive Design**: Mobile-first approach with perfect scaling
- **SEO Optimized**: Proper metadata, Open Graph, and Twitter cards
- **TypeScript**: Full type safety throughout the application
- **Modern UI/UX**: Clean, minimal design with professional polish

## 🎨 Design System

The design is inspired by modern, clean aesthetics with:

- **Color Palette**: Professional blue and purple gradients
- **Typography**: Inter font with careful hierarchy
- **Spacing**: Generous whitespace and consistent spacing
- **Animations**: Subtle, purposeful micro-interactions
- **Components**: Reusable, modular component architecture

## 🛠️ Tech Stack

- **Framework**: Next.js 14+ with App Router
- **Styling**: Tailwind CSS 4.x
- **Animations**: Framer Motion
- **3D Graphics**: Three.js + React Three Fiber
- **Language**: TypeScript
- **Deployment**: Vercel (recommended)

## 📁 Project Structure

```
├── app/                    # Next.js App Router
│   ├── about/             # About page
│   ├── code/              # Code projects page
│   ├── music/             # Music projects page
│   ├── projects/          # General projects page
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   ├── loading.tsx        # Loading component
│   ├── error.tsx          # Error boundary
│   └── not-found.tsx      # 404 page
├── components/            # Reusable components
│   ├── Navigation.tsx     # Main navigation
│   ├── Footer.tsx         # Site footer
│   ├── ProjectCard.tsx    # Project card component
│   └── CubeScene.tsx      # 3D cube component
├── data/                  # Static data
│   └── projects.ts        # Project data
└── public/                # Static assets
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd shadows
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

## 🎯 Key Features

### Navigation
- Smooth scroll behavior
- Active page indicators
- Mobile-responsive hamburger menu
- Backdrop blur effects

### Project Cards
- Hover animations with image scaling
- Overlay effects on interaction
- Responsive grid layout
- Optimized images with Next.js Image

### 3D Graphics
- Interactive rotating cube
- Smooth animations
- Responsive sizing
- Performance optimized

### Animations
- Page transitions
- Scroll-triggered animations
- Hover effects
- Loading states

## 🎨 Customization

### Colors
Edit the color palette in `tailwind.config.js`:

```javascript
colors: {
  primary: {
    // Your primary colors
  },
  neutral: {
    // Your neutral colors
  },
  accent: {
    // Your accent colors
  }
}
```

### Content
Update project data in `data/projects.ts`:

```typescript
export const projectsData = {
  Projects: [
    {
      title: 'Your Project',
      description: 'Project description',
      image: '/path/to/image.jpg',
      link: '/project-url'
    }
  ]
  // ... other categories
};
```

### Styling
Customize components by modifying the Tailwind classes or adding new utility classes in `app/globals.css`.

## 📱 Responsive Design

The site is fully responsive with breakpoints:
- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically

### Other Platforms

The app can be deployed to any platform that supports Next.js:
- Netlify
- AWS Amplify
- Railway
- DigitalOcean App Platform

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript checks

### Code Style

- Use TypeScript for all components
- Follow Next.js best practices
- Use Tailwind utility classes
- Implement proper error handling
- Add loading states for better UX

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Contact

Miles - [@your-twitter](https://twitter.com/your-twitter) - miles@example.com

Project Link: [https://github.com/your-username/shadows](https://github.com/your-username/shadows)
