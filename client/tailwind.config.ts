import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        obsidian: "#0A0A0C",
        flame: "#FF3E00",
        ember: "#E60000",
        // From the Original can: brushstroke gold and label cream.
        gold: "#C9A13B",
        cream: "#EDE6CF",
        // Light section grey used on mofaya.co.za.
        ash: "#DCDCDC",
      },
      fontFamily: {
        display: ["var(--font-montserrat)", "system-ui", "sans-serif"],
        sans: ["var(--font-montserrat)", "system-ui", "sans-serif"],
        brush: ["var(--font-marker)", "cursive"],
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0) rotate(-3deg)" },
          "50%": { transform: "translateY(-14px) rotate(1.5deg)" },
        },
        burn: {
          "0%, 100%": { transform: "scale(1) rotate(0deg)", opacity: "0.95" },
          "50%": { transform: "scale(1.04) rotate(-1.5deg)", opacity: "1" },
        },
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        burn: "burn 4s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
