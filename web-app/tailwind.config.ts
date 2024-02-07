import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{html,js,jsx,tsx}"],
  theme: {
    colors: {
      ...require("tailwindcss/colors"),
      primary_color: "#ffffff",
      secondary_color: "#78dcca",
      tertiary_color: "#c9fbac",
      background_color: "#ecebff",
    },
    extend: {},
  },
  plugins: [],
} satisfies Config;
