import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Semantic color tokens (light mode defaults, dark mode via class)
        bg: 'var(--bg)',
        'bg-elevated': 'var(--bg-elevated)',
        border: 'var(--border)',
        'border-strong': 'var(--border-strong)',
        text: 'var(--text)',
        'text-strong': 'var(--text-strong)',
        'text-muted': 'var(--text-muted)',
        primary: 'var(--primary)',
        'primary-strong': 'var(--primary-strong)',
        'primary-bg': 'var(--primary-bg)',
        success: 'var(--success)',
        'success-bg': 'var(--success-bg)',
        warning: 'var(--warning)',
        'warning-bg': 'var(--warning-bg)',
        error: 'var(--error)',
        'error-bg': 'var(--error-bg)',
        focus: 'var(--focus)',
      },
      fontFamily: {
        sans: ['var(--font-geist-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-geist-mono)', 'ui-monospace', 'monospace'],
      },
      fontSize: {
        // Fluid clamp scale (matches DESIGN.md)
        '2xs': ['clamp(0.69rem, 0.67rem + 0.11vw, 0.78rem)', { lineHeight: '1.6' }],
        xs: ['clamp(0.83rem, 0.80rem + 0.17vw, 0.94rem)', { lineHeight: '1.6' }],
        base: ['clamp(1rem, 0.96rem + 0.22vw, 1.13rem)', { lineHeight: '1.6' }],
        sm: ['clamp(1.2rem, 1.15rem + 0.27vw, 1.35rem)', { lineHeight: '1.25' }],
        lg: ['clamp(1.44rem, 1.37rem + 0.34vw, 1.62rem)', { lineHeight: '1.25' }],
        xl: ['clamp(1.73rem, 1.63rem + 0.44vw, 1.94rem)', { lineHeight: '1.25' }],
        '2xl': ['clamp(2.07rem, 1.94rem + 0.56vw, 2.33rem)', { lineHeight: '1.1' }],
        '3xl': ['clamp(2.49rem, 2.31rem + 0.71vw, 2.8rem)', { lineHeight: '1.05', letterSpacing: '-0.02em' }],
      },
      lineHeight: {
        tight: '1.1',
        snug: '1.25',
        normal: '1.6',
        relaxed: '1.7',
        code: '1.55',
      },
      maxWidth: {
        'measure-narrow': '45ch',
        measure: '65ch',
        'measure-wide': '75ch',
      },
      spacing: {
        0: '0',
        1: '4px',
        2: '8px',
        3: '12px',
        4: '16px',
        5: '24px',
        6: '32px',
        7: '48px',
        8: '64px',
      },
      boxShadow: {
        0: 'none',
        1: '0 1px 2px rgb(0 0 0 / 0.05)',
        2: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
        3: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
        4: '0 25px 50px -12px rgb(0 0 0 / 0.15)',
        // Dark mode shadows use higher opacity (handled via CSS variables)
      },
      borderRadius: {
        none: '0',
        sm: '4px',
        md: '8px',
        lg: '12px',
        xl: '16px',
        full: '9999px',
      },
      transitionDuration: {
        fast: '120ms',
        normal: '150ms',
        slow: '300ms',
      },
      transitionTimingFunction: {
        expo: 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
      animation: {
        'fade-in': 'fadeIn 300ms cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'slide-up': 'slideUp 400ms cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'slide-up-delay': 'slideUp 400ms cubic-bezier(0.16, 1, 0.3, 1) 120ms forwards',
        'draw-bridge': 'drawBridge 500ms cubic-bezier(0.16, 1, 0.3, 1) 240ms forwards',
        'word-reveal': 'wordReveal 80ms ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        drawBridge: {
          '0%': { strokeDashoffset: '100%' },
          '100%': { strokeDashoffset: '0%' },
        },
        wordReveal: {
          '0%': { opacity: '0', transform: 'translateY(0.5em)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      zIndex: {
        'base': '0',
        'dropdown': '10',
        'sticky': '20',
        'nav': '40',
        'overlay': '50',
        'modal': '60',
        'toast': '70',
        'progress': '80',
      },
      gridTemplateColumns: {
        'auto-fill-sm': 'repeat(auto-fill, minmax(200px, 1fr))',
        'auto-fill-md': 'repeat(auto-fill, minmax(280px, 1fr))',
        'auto-fill-lg': 'repeat(auto-fill, minmax(350px, 1fr))',
        'auto-fit-sm': 'repeat(auto-fit, minmax(200px, 1fr))',
        'auto-fit-md': 'repeat(auto-fit, minmax(280px, 1fr))',
        'auto-fit-lg': 'repeat(auto-fit, minmax(350px, 1fr))',
      },
      gridTemplateAreas: {
        'hero': {
          'header': 'header header header',
          'main': 'nav main aside',
          'footer': 'footer footer footer',
        },
      },
      aspectRatio: {
        'video': '16 / 9',
        'square': '1 / 1',
        'photo': '4 / 3',
        'wide': '21 / 9',
      },
    },
  },
  plugins: [
    require('@tailwindcss/container-queries'),
  ],
}

export default config