import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#E31B6B",
        "primary-dark": "#C41A5C",
        "primary-light": "#FF4D8A",
        coral: "#FF6B6B",
        hot: "#E31B6B",
        accent: "#FF8C42",
        "accent-teal": "#14B8A6",
      },
      backgroundImage: {
        "hero-gradient": "linear-gradient(135deg, #E31B6B 0%, #FF8C42 50%, #FF6B6B 100%)",
        "section-warm": "linear-gradient(180deg, #FFF5F7 0%, #FFFFFF 100%)",
        "card-shine": "linear-gradient(135deg, rgba(255,255,255,0.2) 0%, transparent 50%)",
      },
      fontFamily: {
        sans: ["system-ui", "-apple-system", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
