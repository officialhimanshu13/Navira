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
        obsidian: {
          950: '#02050D',
          900: '#030712',
          850: '#050B18',
          800: '#081224',
          700: '#0E1C36',
        },
        brand: {
          bg: '#030712',
          navy: '#060F1E',
          surface: '#09152A',
          surfaceLight: '#0F2140',
          border: 'rgba(255, 255, 255, 0.08)',
          blue: '#19BDF0',
          cyan: '#19BDF0',
          emerald: '#10B981',
          emeraldLight: '#34D399',
          violet: '#A78BFA',
          violetDark: '#8B5CF6',
          muted: '#94A3B8',
          text: '#F8FAFC',
        },
        dark: {
          950: '#030712',
          900: '#060F1E',
          850: '#09152A',
          800: '#0F2140',
          700: '#1A335E',
        },
        navy: {
          50: '#f0f4f8',
          100: '#d9e2ec',
          200: '#bcccdc',
          300: '#9fb3c8',
          400: '#829ab1',
          500: '#627d98',
          600: '#486581',
          700: '#334e68',
          800: '#1e3a5f',
          900: '#060F1E',
          950: '#030712',
        },
        teal: {
          50: '#f0fdfa',
          100: '#ccfbf1',
          200: '#99f6e4',
          300: '#5eead4',
          400: '#2dd4bf',
          500: '#14b8a6',
          600: '#0d9488',
          700: '#0f766e',
          800: '#115e59',
          900: '#134e4a',
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      boxShadow: {
        'glow-cyan': '0 0 25px -5px rgba(25, 189, 240, 0.35)',
        'glow-emerald': '0 0 25px -5px rgba(16, 185, 129, 0.35)',
        'glow-violet': '0 0 25px -5px rgba(167, 139, 250, 0.35)',
        'glow-card': '0 10px 30px -10px rgba(3, 7, 18, 0.9), 0 0 1px 1px rgba(255, 255, 255, 0.08)',
        'cinematic': '0 20px 50px -15px rgba(0, 0, 0, 0.8), 0 0 30px -5px rgba(25, 189, 240, 0.15)',
      }
    },
  },
  plugins: [],
}
