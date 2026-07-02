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
        sans: ['Geist', 'sans-serif'],
        serif: ['Instrument Serif', 'serif'],
        mono: ['Geist Mono', 'monospace'],
      },
      boxShadow: {
        'neo': '0 1px 2px rgba(0, 0, 0, 0.04)',
        'neo-hover': '0 4px 12px rgba(0, 0, 0, 0.05)',
        'neo-active': '0 1px 1px rgba(0, 0, 0, 0.02)',
        'neo-inset': 'inset 0 1px 2px rgba(0, 0, 0, 0.04)',
        'neo-card': '0 2px 8px rgba(0, 0, 0, 0.02)',
        'minimal': '0 1px 3px rgba(0, 0, 0, 0.02), 0 1px 2px rgba(0, 0, 0, 0.04)',
      },
      borderRadius: {
        'neo': '8px',
      },
      transitionDuration: {
        'neo': '200ms',
      }
    },
  },
  plugins: [forms],
};
