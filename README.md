# Don Pépé Services - Luxury Marketplace

A premium luxury marketplace website built with React, Vite, Tailwind CSS, and Framer Motion.

## Features

- ✨ Modern React + Vite setup
- 🎨 Tailwind CSS with custom luxury theme (dark mode only)
- 🎭 Framer Motion animations
- 🌍 Multilingual support (English/French)
- 🚗 Interactive car gallery modal with image slider
- 📱 Fully responsive design
- 🎯 Professional animations (Click Spark, Dock effects)
- 💫 Animated glow and spotlight effects
- 🖼️ Three.js 3D car animation in hero section
- ⚡ Fast and optimized

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

The site will open at `http://localhost:3000`

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
├── src/
│   ├── components/         # Reusable React components
│   │   ├── animations/     # Animation components (ClickSpark, Dock)
│   │   ├── CarGalleryModal.jsx
│   │   ├── Footer.jsx
│   │   ├── Header.jsx
│   │   ├── Hero3D.jsx
│   │   └── StatsCounter.jsx
│   ├── contexts/          # React contexts (Language, Theme)
│   ├── data/              # Data files (cars data)
│   ├── pages/             # Page components (Home, Services, etc.)
│   ├── App.jsx            # Main App component
│   ├── main.jsx           # Entry point
│   └── index.css          # Global styles
├── images/                # Image assets
├── index.html
├── package.json
├── tailwind.config.js
├── vite.config.js
└── postcss.config.js
```

## Tech Stack

- **React 18** - UI library
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **React Router** - Routing
- **Three.js** - 3D graphics

## Features Details

### Color Palette
- Dark theme only (no white)
- Gold (#d4af37) accents
- Purple (#6b46c1) accents
- Animated glow and pulse effects
- Spotlight animations

### Animations
- **Click Spark**: Animated spark effect on click (from reactbits.dev)
- **Dock**: Hover and tap animations (from reactbits.dev)
- **Stats Counter**: Animated counting numbers
- **3D Car**: Three.js animated car in hero section
- **Smooth Scroll**: Parallax effects

### Car Gallery
- Modal popup with image gallery
- Thumbnail navigation
- Keyboard navigation (arrows, ESC)
- All car images loaded from `/images/` folder

## Notes

- All car images should be in the `/images/` folder with proper folder structure
- Update WhatsApp and email links in components with actual contact information
- Image paths use absolute paths from public directory (`/images/...`)

