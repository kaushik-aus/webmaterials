/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./hooks/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        accent: "#FF6600",
        ink: "#000000",
        dim: "#212121",
      },
      boxShadow: {
        s: "0 1px 3px rgba(0,0,0,0.08)",
        m: "0 4px 12px rgba(0,0,0,0.1)",
        l: "0 8px 24px rgba(0,0,0,0.12)",
      },
      borderRadius: {
        DEFAULT: "0.5rem",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
