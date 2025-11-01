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
        'near-black': '#0a0a0a',
        'darker': '#121212',
        // Paper surface
        'paper': '#fafafa',
        'paper-warm': '#fbf8f3',
        // Ink and muted text
        'ink': '#1a1a1a',
        'muted': '#737373',
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
        // Brand orange
        'brand': '#f97316',
      },
      boxShadow: {
        'orange-glow': '0 0 20px rgba(249, 115, 22, 0.3)',
        'orange-glow-lg': '0 0 40px rgba(249, 115, 22, 0.4)',
        'orange-lift': '0 10px 30px -10px rgba(249, 115, 22, 0.5)',
        'neon-orange': '0 0 10px rgba(249, 115, 22, 0.6), 0 0 20px rgba(249, 115, 22, 0.4), 0 0 30px rgba(249, 115, 22, 0.2)',
      },
      backgroundImage: {
        'gradient-orange': 'linear-gradient(135deg, #fb923c 0%, #f97316 50%, #ea580c 100%)',
        'gradient-radial-orange': 'radial-gradient(circle at 50% 50%, rgba(249, 115, 22, 0.15) 0%, transparent 50%)',
        'gradient-nebula': 'radial-gradient(ellipse at top, rgba(249, 115, 22, 0.1) 0%, transparent 50%), radial-gradient(ellipse at bottom right, rgba(251, 146, 60, 0.08) 0%, transparent 50%)',
      },
      animation: {
        'pulse-glow': 'pulse-glow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'flicker': 'flicker 3s linear infinite',
      },
      keyframes: {
        'pulse-glow': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
        'flicker': {
          '0%, 19.999%, 22%, 62.999%, 64%, 64.999%, 70%, 100%': {
            opacity: '1',
            filter: 'drop-shadow(0 0 10px rgba(249, 115, 22, 0.8))',
          },
          '20%, 21.999%, 63%, 63.999%, 65%, 69.999%': {
            opacity: '0.85',
            filter: 'drop-shadow(0 0 5px rgba(249, 115, 22, 0.5))',
          },
        },
      },
    },
  },
  plugins: [],
};
