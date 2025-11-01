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
        'near-black': '#0A0A0B',
        'mikan': '#FF6B35',
        'mikan-dark': '#E5522D',
        'paper': '#FAFAFA',
        'ink': '#1A1A1A',
        'ink-muted': '#6B6B6B',
      },
      boxShadow: {
        'orange-sm': '0 1px 2px 0 rgba(255, 107, 53, 0.05)',
        'orange': '0 4px 6px -1px rgba(255, 107, 53, 0.1), 0 2px 4px -2px rgba(255, 107, 53, 0.1)',
        'orange-lg': '0 10px 15px -3px rgba(255, 107, 53, 0.15), 0 4px 6px -4px rgba(255, 107, 53, 0.1)',
        'orange-xl': '0 20px 25px -5px rgba(255, 107, 53, 0.2), 0 8px 10px -6px rgba(255, 107, 53, 0.1)',
      },
    },
  },
  plugins: [],
};
