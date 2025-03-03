/** @type {import('tailwindcss').Config} */
export default {
  content: ["../**/src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        primary: "hsl(var(--primary))",
        secondary: "hsl(var(--secondary))",
      },
    },
  },
  plugins: [],
};
