/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Near-black background
        'bg-dark': '#0a0a0a',
        'bg-darker': '#050505',
        // Paper surface
        'paper': '#1a1a1a',
        'paper-light': '#222222',
        // Ink/text colors
        'ink': '#f5f5f5',
        'ink-muted': '#a0a0a0',
        // Warm orange scale (mikan)
        'mikan': {
          50: '#fff7ed',
          100: '#ffedd5',
          200: '#fed7aa',
          300: '#fdba74',
          400: '#fb923c',
          500: '#f97316',
          600: '#ea580c',
          700: '#c2410c',
          800: '#9a3412',
          900: '#7c2d12',
        },
        // Border
        'border-subtle': '#2a2a2a',
      },
      boxShadow: {
        'orange-sm': '0 2px 8px rgba(249, 115, 22, 0.15)',
        'orange-md': '0 4px 16px rgba(249, 115, 22, 0.25)',
        'orange-lg': '0 8px 32px rgba(249, 115, 22, 0.35)',
        'neon-orange': '0 0 10px rgba(249, 115, 22, 0.5), 0 0 20px rgba(249, 115, 22, 0.3)',
      },
      backgroundImage: {
        'gradient-orange': 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)',
        'gradient-orange-subtle': 'linear-gradient(135deg, rgba(249, 115, 22, 0.1) 0%, rgba(234, 88, 12, 0.05) 100%)',
      },
    },
  },
  plugins: [],
};
