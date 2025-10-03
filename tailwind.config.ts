// tailwind.config.ts

import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // --- PRIMARY PALETTE (Official USC Brand Colors) ---
        "usc-cardinal": "#990000", // PMS 201 C
        "usc-gold": "#FFCC00", // PMS 123 C

        // --- SECONDARY PALETTE (NEUTRALS) ---
        "usc-black": "#000000",
        "usc-white": "#FFFFFF",
        "usc-gray": {
          "30": "#CCCCCC", // 30K Gray
          "70": "#767676", // 70K Gray
        },
        "usc-rich-black": "#2A2B2A", // For print: 40C, 100K

        // --- TERTIARY PALETTE ---
        "usc-tan": "#F2C6A7", // PMS 474 C
        "usc-pink": "#F26178", // PMS 709 C
        "usc-deep-blue": "#2B5597", // PMS 7685 C
        "usc-olive": "#908C13", // PMS 582 C
        "usc-bright-yellow": "#FDE021", // PMS 107 C
        "usc-lime-green": "#DAE343", // PMS 380 C
        "usc-orange": "#FF9015", // PMS 1495 C
        "usc-vivid-red": "#E43D30", // PMS 179 C

        // --- OFFICIAL TINTS ---
        // Note: Tints for USC Cardinal are not permitted by the brand guide.
        "usc-gold-tint": {
          "75": "#FFD633", // Unofficial, but calculated for use
          "50": "#FFE066", // Unofficial, but calculated for use
          "25": "#FFF5CC", // Unofficial, but calculated for use
        },
      },
      backgroundImage: {
        // --- OFFICIAL GRADIENTS ---
        "usc-gradient-primary": "linear-gradient(to right, #990000, #FFCC00)",
        "usc-gradient-secondary": "linear-gradient(to right, #E43D30, #FDE021)",
      },
      // ... your other theme extensions
    },
  },
  plugins: [],
};

export default config;
