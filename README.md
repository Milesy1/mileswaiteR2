# Miles Portfolio - Modern Next.js Portfolio

A stunning, modern portfolio website built with Next.js 14+ App Router, Tailwind CSS, and cutting-edge web technologies. Features dynamic project pages, smooth animations, and a professional design inspired by the best contemporary portfolios.

## 🚀 Live Demo

Visit the live portfolio: [https://mileswaiteR2.vercel.app](https://mileswaiteR2.vercel.app)

## ✨ Features

### 🎨 **Modern Design**
- Clean, minimal layout with professional aesthetics
- Responsive design that works perfectly on all devices
- Smooth animations and micro-interactions using Framer Motion
- Beautiful typography with Inter font family

### 🏗️ **Technical Excellence**
- **Next.js 14+ App Router** for optimal performance and SEO
- **TypeScript** for full type safety
- **Tailwind CSS** for utility-first styling
- **Framer Motion** for smooth animations
- **React Three Fiber** for 3D graphics
- **Static Site Generation** for fast loading

### 📱 **Dynamic Project System**
- **12 Project Pages** across 3 categories (Projects, Music, Code)
- **Modular Components** for easy customization
- **Dynamic Routing** with clean URLs (`/projects/project-name`)
- **Image Galleries** with lightbox functionality
- **SEO Optimized** with dynamic metadata

### 🎯 **User Experience**
- **Fast Loading** with optimized images and code splitting
- **Smooth Transitions** between pages
- **Hover Effects** and interactive elements
- **Mobile-First** responsive design
- **Accessibility** compliant

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
git clone https://github.com/Milesy1/mileswaiteR2.git
cd mileswaiteR2
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

- **Portfolio**: [https://mileswaiteR2.vercel.app](https://mileswaiteR2.vercel.app)
- **GitHub**: [@Milesy1](https://github.com/Milesy1)
- **Repository**: [https://github.com/Milesy1/mileswaiteR2](https://github.com/Milesy1/mileswaiteR2)

---

⭐ **Star this repository** if you found it helpful!

