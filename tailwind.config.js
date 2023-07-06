const toml = require("toml");
const fs = require("fs");
const path = require("path");
const configPath = path.join(__dirname, "config.toml");
const getConfig = fs.readFileSync(configPath, "utf8");
const theme = JSON.parse(JSON.stringify(toml.parse(getConfig)));

let font_base = Number(theme.params.fonts.font_size.base.replace("px", ""));
let font_scale = Number(theme.params.fonts.font_size.scale);
let h6 = font_base / font_base;
let h5 = h6 * font_scale;
let h4 = h5 * font_scale;
let h3 = h4 * font_scale;
let h2 = h3 * font_scale;
let h1 = h2 * font_scale;
let fontPrimary, fontPrimaryType, fontSecondary, fontSecondaryType;
if (theme.params.fonts.font_family.primary) {
  fontPrimary = theme.params.fonts.font_family.primary
    .replace(/\+/g, " ")
    .replace(/:[ital,]*[ital@]*[wght@]*[0-9,;]+/gi, "");
  fontPrimaryType = theme.params.fonts.font_family.primary_type;
}
if (theme.params.fonts.font_family.secondary) {
  fontSecondary = theme.params.fonts.font_family.secondary
    .replace(/\+/g, " ")
    .replace(/:[ital,]*[ital@]*[wght@]*[0-9,;]+/gi, "");
  fontSecondaryType = theme.params.fonts.font_family.secondary_type;
}

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./hugo_stats.json"],
  theme: {
    screens: {
      xs: "480px",
      sm: "575px",
      md: "768px",
      lg: "1024px",
      xl: "1320px",
    },
    container: {
      padding: "1.5rem",
    },
    extend: {
      colors: {
        text: theme.params.colors.default.text_color.default,
        light: theme.params.colors.default.text_color.light,
        dark: theme.params.colors.default.text_color.dark,
        primary: theme.params.colors.default.theme_color.primary,
        secondary: theme.params.colors.default.theme_color.secondary,
        tertiary: theme.params.colors.default.theme_color.tertiary,
        quaternary: theme.params.colors.default.theme_color.quaternary,
        quinary: theme.params.colors.default.theme_color.quinary,
        senary: theme.params.colors.default.theme_color.senary,
        body: theme.params.colors.default.theme_color.body,
        border: theme.params.colors.default.theme_color.border,
        "theme-dark": theme.params.colors.default.theme_color.theme_dark,
        "theme-light": theme.params.colors.default.theme_color.theme_light,
      },
      fontSize: {
        base: font_base + "px",
        h1: h1 + "rem",
        "h1-md": h1 * 0.8 + "rem",
        h2: h2 + "rem",
        "h2-md": h2 * 0.8 + "rem",
        h3: h3 + "rem",
        "h3-md": h3 * 0.8 + "rem",
        h4: h4 + "rem",
        "h4-md": h4 * 0.8 + "rem",
        h5: h5 + "rem",
        h6: h6 + "rem",
      },
      fontFamily: {
        primary: [fontPrimary, fontPrimaryType],
        secondary: [fontSecondary, fontSecondaryType],
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/forms"),
    require("tailwind-bootstrap-grid")({
      generateContainer: false,
      gridGutters: {
        1: "0.25rem",
        2: "0.5rem",
        3: "1rem",
        4: "1.5rem",
        5: "3rem",
      },
    }),
  ],
};
