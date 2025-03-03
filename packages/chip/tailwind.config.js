import baseConfig from "../../tailwind.config"

/** @type {import('tailwindcss').Config} */
export default {
  content: ["../**/src/**/*.{js,ts,jsx,tsx}"],
  theme: baseConfig.theme,
  plugins: [],
};
