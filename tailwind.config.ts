import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#0056B3",     // Your Deep Atlantic Blue
        accent: "#FFAB00",      // Your Electric Amber
        charcoal: "#424242",    // Your Slate Charcoal
        jet: "#1A1A1A",         // Your Jet Black text
      },
    },
  },
  plugins: [],
};
export default config;
