import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: { '2xl': '1400px' },
    },
    extend: {
      colors: {
        // ── Enlight Lab Brand ─────────────────────────────────────────
        'el-blue':       '#1a3fdb',   // primary CTA blue (buttons, links)
        'el-blue-dark':  '#1530b0',   // hover state
        'el-blue-light': '#e8edfb',   // light blue tint (backgrounds, tags)
        'el-navy':       '#0d1b4b',   // deep navy (section bg, footer)
        'el-navy-mid':   '#1e2d6b',   // mid navy (dark section cards)
        'el-heading':    '#0f172a',   // headings
        'el-body':       '#4b5563',   // body text
        'el-muted':      '#94a3b8',   // placeholder, muted text
        'el-border':     '#e2e8f0',   // card borders
        'el-bg':         '#f8f9fc',   // page background (not pure white)
        'el-white':      '#ffffff',

        // ── Severity Colors ───────────────────────────────────────────
        'severity-critical': '#dc2626',
        'severity-high':     '#ea580c',
        'severity-medium':   '#ca8a04',
        'severity-low':      '#16a34a',

        // ── shadcn/ui required tokens ─────────────────────────────────
        border:      'hsl(var(--border))',
        input:       'hsl(var(--input))',
        ring:        'hsl(var(--ring))',
        background:  'hsl(var(--background))',
        foreground:  'hsl(var(--foreground))',
        primary: {
          DEFAULT:    'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT:    'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT:    'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT:    'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT:    'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT:    'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT:    'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },

      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },

      fontSize: {
        'display-xl': ['3.5rem',  { lineHeight: '1.1', fontWeight: '700' }],
        'display-lg': ['2.75rem', { lineHeight: '1.15', fontWeight: '700' }],
        'display-md': ['2rem',    { lineHeight: '1.2', fontWeight: '700' }],
      },

      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },

      boxShadow: {
        'el-card':  '0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)',
        'el-hover': '0 4px 12px rgba(26,63,219,0.12)',
        'el-blue':  '0 4px 14px rgba(26,63,219,0.3)',
      },

      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to:   { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to:   { height: '0' },
        },
        'score-ring': {
          from: { strokeDashoffset: 'var(--circumference)' },
          to:   { strokeDashoffset: 'var(--offset)' },
        },
        'fade-up': {
          from: { opacity: '0', transform: 'translateY(16px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          from: { opacity: '0' },
          to:   { opacity: '1' },
        },
      },

      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up':   'accordion-up 0.2s ease-out',
        'score-ring':     'score-ring 1.2s ease-out forwards',
        'fade-up':        'fade-up 0.5s ease-out forwards',
        'fade-in':        'fade-in 0.4s ease-out forwards',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}

export default config