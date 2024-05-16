import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{html,js,jsx,tsx}"],
  theme: {
    colors: {
      ...require("tailwindcss/colors"),
      primary_color: "white",
      secondary_color: "#6b7280",
      tertiary_color: "#48bb78",
      // primary_color: "#fffff5",
      // secondary_color: "#78dcca",
      // tertiary_color: "#c9fbac",
      // background_color: "#ecebff",
      // silver_color_field: "#ecebff",
      // text_color: "",
      // button_border_color: "",
      // button_bg_color: "#50b33d",
      // button_text_color: "",
      // border_color: "#6b7280",
    },
    extend: {
      fontSize: {
        fontSizeModale: "1rem",
        fontSizeText : "1rem"
      },
    },
  },
  plugins: [],
} satisfies Config;
