# Don Pépé Services - Luxury Marketplace

## Overview
A premium luxury marketplace website built with React, Vite, Tailwind CSS, and Framer Motion. This application features a modern dark theme luxury design with animated effects, multilingual support (English/French), and an admin panel for managing cars, properties, and concierge services.

## Project Type
Frontend-only React application with:
- Public-facing luxury marketplace
- Admin panel for content management
- localStorage-based data persistence (no backend database)

## Tech Stack
- **React 18** - UI library
- **Vite 7** - Build tool and development server
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Animation library
- **Three.js** - 3D graphics for hero section
- **React Router** - Client-side routing

## Development Setup

### Port Configuration
- **Development Server**: Port 5000 (configured for Replit environment)
- **Host**: 0.0.0.0 (allows proxy access in Replit iframe)
- **HMR Port**: 5000 (for hot module replacement)

### Running the Project
The project uses a single workflow:
- **dev-server**: Runs `npm run dev` on port 5000

### Key Configuration Files
- `vite.config.js`: Configured for Replit with port 5000, host 0.0.0.0
- `tailwind.config.js`: Custom luxury theme configuration
- `package.json`: Dependencies and npm scripts

## Project Structure
```
├── src/
│   ├── components/         # Reusable React components
│   │   ├── admin/         # Admin panel components
│   │   ├── animations/    # Animation effects (ClickSpark, Dock)
│   │   ├── CarGalleryModal.jsx
│   │   ├── Footer.jsx
│   │   ├── Header.jsx
│   │   ├── Hero3D.jsx
│   │   └── StatsCounter.jsx
│   ├── contexts/          # React contexts
│   │   ├── AuthContext.jsx    # Admin authentication
│   │   ├── LanguageContext.jsx # i18n support
│   │   └── ThemeContext.jsx    # Theme management
│   ├── data/              # Static data files
│   │   └── cars.js        # Car inventory data
│   ├── pages/             # Page components
│   │   ├── admin/         # Admin panel pages
│   │   ├── Home.jsx
│   │   ├── Services.jsx
│   │   ├── Concierge.jsx
│   │   └── Contact.jsx
│   ├── utils/             # Utility functions
│   │   └── dataManager.js # localStorage data persistence
│   ├── App.jsx            # Main app component with routing
│   ├── main.jsx           # React entry point
│   └── index.css          # Global styles and Tailwind imports
├── public/
│   └── images/            # Car and asset images
└── index.html             # HTML entry point
```

## Features
- ✨ Modern React + Vite setup
- 🎨 Custom luxury dark theme (gold and purple accents)
- 🎭 Framer Motion animations and effects
- 🌍 Multilingual support (English/French) with header language selector
- 🚗 Interactive car gallery with modal and image slider
- 📱 Fully responsive design (optimized for mobile, tablet, and desktop)
- 🔐 Admin panel with protected routes
- 💫 Animated glow and spotlight effects
- 🖼️ Three.js 3D car animation in hero section
- 💾 Full localStorage-based data persistence
- 📸 Image upload with base64 encoding for admin panels
- 🔍 Real-time search functionality with 500ms debounce
- ⚡ Optimized image loading with lazy loading and async decoding

## Recent Changes
- **2025-11-07**: Client-Side Enhancements
  - **Search Functionality**: Added luxury-themed search bar to Luxury Cars section
    - Real-time filtering by car name, brand, model, year, engine, color, and transmission
    - 500ms debounce to optimize performance during typing
    - Displays result count and "No results" empty state with clear button
    - Fully accessible with ARIA labels and keyboard support
    - Smooth animations with gold/purple gradient glow effect on focus
  - **Image Optimization**: Implemented performance improvements across the site
    - Added lazy loading to all car and property images (`loading="lazy"`)
    - Implemented async image decoding (`decoding="async"`) for smoother rendering
    - CarGalleryModal hero image uses eager loading with preload links for adjacent images
    - Thumbnail images use lazy loading for better initial page load
    - Added background placeholders to prevent layout shift during image loading
  - **Responsive Design**: Enhanced mobile, tablet, and desktop experience
    - Optimized typography scaling across all breakpoints (sm, md, lg, xl)
    - Added responsive padding and spacing for better mobile UX
    - Search bar adapts to smaller screens with adjusted font sizes and padding
    - All grid layouts properly respond to different screen sizes
    - Improved banner and section headings for mobile readability
  
- **2025-11-07**: GitHub Import to Replit
  - Successfully imported project from GitHub
  - Verified all dependencies installed correctly (185 packages)
  - Confirmed Vite configuration already optimized for Replit (port 5000, host 0.0.0.0, allowedHosts: true)
  - Workflow 'dev-server' running successfully on port 5000
  - Deployment configuration set to autoscale with build command
  - All pages verified working (Home, Services, Concierge, Admin Login)
  - WebGL error handling confirmed functional in Hero3D component
  
- **2025-11-06**: Implemented localStorage-based data persistence
  - Created centralized DataManager utility for all localStorage operations
  - Updated AdminCars, AdminProperties, AdminConcierge, and AdminSettings to persist data
  - Added image upload functionality with base64 encoding (prevents blob URL issues)
  - Connected client-side pages (Services, Concierge) to read from localStorage
  - Moved language selector to admin panel header (top-right corner)
  - All admin modifications now persist across page refreshes and sync with client-side
  
- **2025-11-05**: Initial Replit setup
  - Configured Vite to use port 5000 with host 0.0.0.0
  - Set up dev-server workflow
  - Installed all dependencies
  - Configured for Replit environment deployment
  - Fixed WebGL rendering crashes in Hero3D component

## Admin Panel
The application includes an admin panel at `/admin` with:
- Dashboard with analytics
- Car inventory management (add/edit/delete cars with image uploads)
- Property listings management (add/edit/delete properties with image uploads)
- Concierge service management (enable/disable services)
- Message management
- User management
- Settings configuration (company info, contact details)

**Default Admin Credentials**: Check `AuthContext.jsx` for authentication logic

### Data Persistence
- All admin changes are saved to browser localStorage via `DataManager` utility
- Images are converted to base64 strings for reliable persistence
- Client-side pages automatically sync with admin modifications
- Data persists across page refreshes (localStorage limit: ~5-10MB typically)

## Deployment Notes
- The application is deployed using Replit's autoscale deployment
- Build command: `npm run build`
- Preview command: `npm run preview`
- Static files are served from the `dist` folder after build
