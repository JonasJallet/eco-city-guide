import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{html,js,jsx,tsx}"],
  theme: {
    colors: {
      ...require("tailwindcss/colors"),
      primary_color: "white",
      secondary_color: "#6b7280",
      tertiary_color: "#48bb78",
      input_hover_bg: "#e7fcdc",
      border_color: "#6b7280",
      dark_text_color: "#4b5563",
    },
    extend: {
      fontSize: {
        fontSizeModale: "1rem",
      },
    },
  },
  plugins: [],
} satisfies Config;
