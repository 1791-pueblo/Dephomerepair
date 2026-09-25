import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#0056B3",
        accent: "#FFAB00",
        charcoal: "#424242",
        jet: "#1A1A1A",
      },
    },
  },
  plugins: [],
};
export default config;
