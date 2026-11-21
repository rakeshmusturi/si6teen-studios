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
  grey: "#F3F3F6",
};

const theme = createTheme({
  cssVariables: true,
  palette: {
    primary: { main: BRAND.purple, dark: BRAND.purpleDark, light: BRAND.lavender, contrastText: "#fff" },
    secondary: { main: BRAND.black },
    text: { primary: BRAND.black, secondary: "#6b6b7b" },
    background: { default: BRAND.white, paper: BRAND.white },
    divider: "#e4e2f5",
  },
  shape: { borderRadius: 12 },
  typography: {
    fontFamily: '"Poppins", system-ui, -apple-system, sans-serif',
    h1: { fontWeight: 600, letterSpacing: "-0.01em" },
    h2: { fontWeight: 600, letterSpacing: "-0.01em" },
    h3: { fontWeight: 600 },
    h4: { fontWeight: 600 },
    h5: { fontWeight: 600 },
    h6: { fontWeight: 600 },
    button: { fontWeight: 500, letterSpacing: 0, textTransform: "none", fontSize: "1rem" },
  },
  components: {
    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: {
        root: { paddingInline: 24, borderRadius: 12 },
        containedPrimary: {
          backgroundImage: `linear-gradient(90deg, ${BRAND.purple} 0%, #6B57E6 100%)`,
          "&:hover": { backgroundImage: `linear-gradient(90deg, #6F5CE6 0%, ${BRAND.purpleDark} 100%)` },
          "&.Mui-disabled": { backgroundImage: "none" },
        },
      },
    },
    MuiLink: { styleOverrides: { root: { color: BRAND.purpleDark } } },
  },
});
export default theme;
