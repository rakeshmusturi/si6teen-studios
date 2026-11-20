"use client";
import { createTheme } from "@mui/material/styles";

// Si6teen brand kit
export const BRAND = {
  purple: "#7B68EE",
  purpleDark: "#5F4BD6", // for small text/links: better contrast on white
  lavender: "#E7E5FF",
  lavenderSoft: "#F6F5FF",
  white: "#FFFFFF",
  black: "#1E1E1E",
};

const theme = createTheme({
  cssVariables: true,
  palette: {
    primary: { main: BRAND.purple, dark: BRAND.purpleDark, light: BRAND.lavender, contrastText: "#fff" },
    secondary: { main: BRAND.black },
    text: { primary: BRAND.black, secondary: "#5b5b6b" },
    background: { default: BRAND.white, paper: BRAND.white },
    divider: "#e4e2f5",
  },
  shape: { borderRadius: 2 }, // the logo is sharp-edged; keep corners tight
  typography: {
    fontFamily: '"Poppins", system-ui, -apple-system, sans-serif',
    h1: { fontWeight: 600, letterSpacing: "-0.01em" },
    h2: { fontWeight: 600, letterSpacing: "-0.01em" },
    h3: { fontWeight: 600 },
    h4: { fontWeight: 600 },
    h5: { fontWeight: 600 },
    h6: { fontWeight: 600 },
    button: { fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" },
  },
  components: {
    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: { root: { paddingInline: 24 } },
    },
    MuiToggleButton: {
      styleOverrides: {
        root: {
          "&.Mui-selected, &.Mui-selected:hover": {
            backgroundColor: BRAND.lavender, color: BRAND.purpleDark, borderColor: BRAND.purple,
          },
        },
      },
    },
    MuiLink: { styleOverrides: { root: { color: BRAND.purpleDark } } },
  },
});
export default theme;
