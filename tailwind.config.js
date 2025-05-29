/** @type {import('tailwindcss').Config} */
import forms from '@tailwindcss/forms';

export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: 'var(--primary-50)',
          100: 'var(--primary-100)',
          200: 'var(--primary-200)',
          300: 'var(--primary-300)',
          400: 'var(--primary-400)',
          500: 'var(--primary-500)',
          600: 'var(--primary-600)',
          700: 'var(--primary-700)',
          800: 'var(--primary-800)',
          900: 'var(--primary-900)',
          950: 'var(--primary-950)',
        },
        accent: {
          50: 'var(--accent-50)',
          100: 'var(--accent-100)',
          200: 'var(--accent-200)',
          300: 'var(--accent-300)',
          400: 'var(--accent-400)',
          500: 'var(--accent-500)',
          600: 'var(--accent-600)',
          700: 'var(--accent-700)',
          800: 'var(--accent-800)',
          900: 'var(--accent-900)',
        }
      },
      fontFamily: {
        sans: ['DM Sans', 'sans-serif'],
      },
      boxShadow: {
        'neo': '8px 8px 16px rgba(34, 197, 94, 0.12), -8px -8px 16px rgba(255, 255, 255, 0.95)',
        'neo-hover': '12px 12px 24px rgba(34, 197, 94, 0.15), -12px -12px 24px rgba(255, 255, 255, 1)',
        'neo-active': '4px 4px 8px rgba(34, 197, 94, 0.12), -4px -4px 8px rgba(255, 255, 255, 0.95)',
        'neo-inset': 'inset 4px 4px 8px rgba(34, 197, 94, 0.12), inset -4px -4px 8px rgba(255, 255, 255, 0.95)',
        'neo-card': '8px 8px 16px rgba(34, 197, 94, 0.12), -8px -8px 16px rgba(255, 255, 255, 0.95)',
      },
      borderRadius: {
        'neo': '20px',
      },
      transitionDuration: {
        'neo': '200ms',
      }
    },
  },
  plugins: [forms],
};
