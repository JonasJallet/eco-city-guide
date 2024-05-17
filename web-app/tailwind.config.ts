import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{html,js,jsx,tsx}"],
  theme: {
    colors: {
      ...require("tailwindcss/colors"),
      primary_color: "white",
      secondary_color: "#6b7280",
      tertiary_color: "#48bb78",
      button_bg_color: "#50b33d",
      button_border_color: "",
      button_text_color: "",
      border_color: "#6b7280",
    },
    extend: {
      fontSize: {
        fontSizeModale: "1rem",
      },
    },
  },
  plugins: [],
} satisfies Config;
