/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        gold: {
          DEFAULT: '#d4af37',
          light: '#f8e9b5',
          dark: '#a38829',
        },
        purple: {
          DEFAULT: '#6b46c1',
          light: '#a78bfa',
          dark: '#4c1d95',
        },
        dark: {
          DEFAULT: '#0a0a0a',
          light: '#1a1a1a',
          lighter: '#2d2d2d',
        }
      },
      fontFamily: {
        serif: ['Playfair Display', 'serif'],
        sans: ['Montserrat', 'sans-serif'],
      },
      animation: {
        'glow': 'glow 2s ease-in-out infinite alternate',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spotlight': 'spotlight 3s ease-in-out infinite alternate',
      },
      keyframes: {
        glow: {
          '0%': { 
            boxShadow: '0 0 5px #d4af37, 0 0 10px #d4af37, 0 0 15px #d4af37',
          },
          '100%': { 
            boxShadow: '0 0 10px #d4af37, 0 0 20px #d4af37, 0 0 30px #d4af37, 0 0 40px #6b46c1',
          },
        },
        spotlight: {
          '0%': { 
            backgroundPosition: '0% 50%',
          },
          '100%': { 
            backgroundPosition: '100% 50%',
          },
        },
      },
    },
  },
  plugins: [],
}

