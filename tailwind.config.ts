import type { Config } from "tailwindcss"
const { fontFamily } = require("tailwindcss/defaultTheme")

const config = {
  darkMode: "class",
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
      fontFamily: {
        sans: ["var(--font-geist-sans)", ...fontFamily.sans],
        mono: ["var(--font-geist-mono)", ...fontFamily.mono],
        'dancing-script': ['var(--font-dancing-script)'],
        'pacifico': ['var(--font-pacifico)'],
        'caveat': ['var(--font-caveat)'],
        'great-vibes': ['var(--font-great-vibes)'],
      },
      colors: { /* ... */ },
      borderRadius: { /* ... */ },
      keyframes: { /* ... */ },
      animation: { /* ... */ },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config