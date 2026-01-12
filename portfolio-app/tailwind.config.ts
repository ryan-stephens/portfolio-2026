import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#0f172a',
        foreground: '#f1f5f9',
        primary: '#0ea5e9',
        'primary-dark': '#0284c7',
        accent: '#06b6d4',
        'accent-dark': '#0891b2',
        muted: '#64748b',
        'muted-foreground': '#94a3b8',
        border: '#1e293b',
        card: '#1e293b',
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
      ringColor: {
        DEFAULT: '#0ea5e9',
      },
      ringWidth: {
        DEFAULT: '2px',
      },
    },
  },
  plugins: [],
}
export default config
