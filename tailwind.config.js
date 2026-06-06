/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        nova: {
          dark: '#050508',
          'indigo-deep': '#090915',
          'indigo-medium': '#111224',
          purple: '#6355d9',
          'purple-glow': '#8c7cf0',
          electric: '#00f0ff',
          'electric-glow': '#39f3ff',
          'gray-tech': '#181922',
          'gray-border': '#222431',
          accent: '#7c3aed',
        }
      },
      fontFamily: {
        sans: ['"Space Grotesk"', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow-pulse': 'glowPulse 2s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'radar': 'radar 4s cubic-bezier(0, 0, 0.2, 1) infinite',
      },
      keyframes: {
        glowPulse: {
          '0%, 100%': { opacity: 0.8, boxShadow: '0 0 10px rgba(0, 240, 255, 0.2)' },
          '50%': { opacity: 1, boxShadow: '0 0 20px rgba(0, 240, 255, 0.6)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        radar: {
          '0%': { transform: 'scale(0.8)', opacity: 0.5 },
          '100%': { transform: 'scale(2.2)', opacity: 0 },
        }
      },
      backdropBlur: {
        xs: '2px',
      }
    },
  },
  plugins: [],
}
