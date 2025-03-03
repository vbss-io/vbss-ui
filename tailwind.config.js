/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./packages/*/src/**/*.@(js|jsx|ts|tsx)"
  ],
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
