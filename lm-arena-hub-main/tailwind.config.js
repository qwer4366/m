/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // Custom colors for Mu3 killer piaaz
        'arena-blue': '#2563eb',
        'arena-red': '#dc2626',
        'arena-green': '#16a34a',
        'arena-purple': '#9333ea',
        'arena-orange': '#ea580c',
        'arena-neutral': '#6b7280',
        'success': '#10b981',
        'warning': '#f59e0b',
        'info': '#3b82f6',
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        // Custom animations
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "fade-out": {
          "0%": { opacity: "1" },
          "100%": { opacity: "0" },
        },
        "slide-in-right": {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(0)" },
        },
        "slide-in-left": {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(0)" },
        },
        "slide-up": {
          "0%": { transform: "translateY(100%)" },
          "100%": { transform: "translateY(0)" },
        },
        "slide-down": {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(0)" },
        },
        "bounce-in": {
          "0%": { transform: "scale(0.3)", opacity: "0" },
          "50%": { transform: "scale(1.05)" },
          "70%": { transform: "scale(0.9)" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        "loading-dots": {
          "0%, 80%, 100%": { transform: "scale(0)" },
          "40%": { transform: "scale(1)" },
        },
        "glow": {
          "0%, 100%": { boxShadow: "0 0 5px rgba(37, 99, 235, 0.5)" },
          "50%": { boxShadow: "0 0 20px rgba(37, 99, 235, 0.8)" },
        },
        "pulse-slow": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.5" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.3s ease-out",
        "fade-out": "fade-out 0.3s ease-out",
        "slide-in-right": "slide-in-right 0.3s ease-out",
        "slide-in-left": "slide-in-left 0.3s ease-out",
        "slide-up": "slide-up 0.3s ease-out",
        "slide-down": "slide-down 0.3s ease-out",
        "bounce-in": "bounce-in 0.6s ease-out",
        "loading-dots": "loading-dots 1.4s ease-in-out infinite",
        "glow": "glow 2s ease-in-out infinite",
        "pulse-slow": "pulse-slow 3s ease-in-out infinite",
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        'gradient-success': 'linear-gradient(135deg, #16a34a 0%, #10b981 100%)',
        'gradient-warning': 'linear-gradient(135deg, #f59e0b 0%, #eab308 100%)',
        'gradient-error': 'linear-gradient(135deg, #dc2626 0%, #ef4444 100%)',
        'gradient-subtle': 'linear-gradient(135deg, rgba(37, 99, 235, 0.1) 0%, rgba(147, 51, 234, 0.1) 100%)',
        'gradient-arena': 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
      },
      boxShadow: {
        'arena-card': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06), 0 0 0 1px rgba(255, 255, 255, 0.05)',
        'arena-glow': '0 0 20px rgba(37, 99, 235, 0.3)',
        'arena-hover': '0 10px 25px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      },
      fontFamily: {
        'arabic': ['Noto Sans Arabic', 'Arial', 'sans-serif'],
        'english': ['Inter', 'system-ui', 'sans-serif'],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      zIndex: {
        '60': '60',
        '70': '70',
        '80': '80',
        '90': '90',
        '100': '100',
      },
      screens: {
        'xs': '475px',
        '3xl': '1600px',
      },
      backdropBlur: {
        'xs': '2px',
      },
      transitionProperty: {
        'height': 'height',
        'spacing': 'margin, padding',
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: 'none',
            color: 'hsl(var(--foreground))',
            '[dir="rtl"] &': {
              textAlign: 'right',
            },
            'h1, h2, h3, h4, h5, h6': {
              color: 'hsl(var(--foreground))',
              fontWeight: '700',
            },
            'p': {
              marginTop: '1em',
              marginBottom: '1em',
              lineHeight: '1.7',
            },
            'ul, ol': {
              paddingLeft: '1.5em',
              '[dir="rtl"] &': {
                paddingLeft: '0',
                paddingRight: '1.5em',
              },
            },
            'blockquote': {
              borderLeftWidth: '4px',
              borderLeftColor: 'hsl(var(--border))',
              paddingLeft: '1em',
              '[dir="rtl"] &': {
                borderLeftWidth: '0',
                borderRightWidth: '4px',
                borderRightColor: 'hsl(var(--border))',
                paddingLeft: '0',
                paddingRight: '1em',
              },
            },
            'code': {
              backgroundColor: 'hsl(var(--muted))',
              padding: '0.2em 0.4em',
              borderRadius: '0.25rem',
              fontSize: '0.875em',
            },
            'pre': {
              backgroundColor: 'hsl(var(--muted))',
              padding: '1em',
              borderRadius: '0.5rem',
              overflow: 'auto',
            },
          },
        },
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    require("@tailwindcss/typography"),
    // Custom plugin for RTL support
    function({ addUtilities }) {
      const newUtilities = {
        '.gradient-text': {
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          '-webkit-background-clip': 'text',
          '-webkit-text-fill-color': 'transparent',
          'background-clip': 'text',
        },
        '.battle-card': {
          background: 'hsl(var(--card))',
          border: '1px solid hsl(var(--border))',
          borderRadius: '0.75rem',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 10px 25px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
          },
        },
        '.arena-glow': {
          boxShadow: '0 0 20px rgba(37, 99, 235, 0.3)',
          animation: 'glow 2s ease-in-out infinite',
        },
        '.loading-dots': {
          animation: 'loading-dots 1.4s ease-in-out infinite',
        },
        '.text-shadow': {
          textShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        },
        '.text-shadow-lg': {
          textShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
        },
        '.backdrop-blur-xs': {
          backdropFilter: 'blur(2px)',
        },
        '.scrollbar-hide': {
          '-ms-overflow-style': 'none',
          'scrollbar-width': 'none',
          '&::-webkit-scrollbar': {
            display: 'none',
          },
        },
        '.scrollbar-thin': {
          'scrollbar-width': 'thin',
          '&::-webkit-scrollbar': {
            width: '6px',
          },
          '&::-webkit-scrollbar-track': {
            background: 'hsl(var(--muted))',
          },
          '&::-webkit-scrollbar-thumb': {
            background: 'hsl(var(--muted-foreground))',
            borderRadius: '3px',
          },
        },
      };
      addUtilities(newUtilities);
    },
  ],
};