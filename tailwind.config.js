/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  theme: {
    extend: {
      fontFamily: {
        'mv-skifer': ['MV-SKIFER', 'sans-serif'],
        'onest': ['Onest', 'sans-serif'],
      },
      colors: {
        primary: '#04061B',
      },
      animation: {
        'spin-slow': 'spin 3s linear infinite',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'soviet-orbit': 'orbit 4s linear infinite',
      },
      keyframes: {
        spin: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' }
        },
        pulse: {
          '0%, 100%': {
            opacity: 1,
            transform: 'scale(1)'
          },
          '50%': {
            opacity: 0.5,
            transform: 'scale(0.95)'
          }
        },
        orbit: {
          '0%': { 
            transform: 'rotate(0deg) translateX(70px) translateY(10px) rotate(0deg)',
          },
          '100%': { 
            transform: 'rotate(360deg) translateX(70px) translateY(10px) rotate(-360deg)',
          },
        }
      }
    },
  },
  plugins: [],
};