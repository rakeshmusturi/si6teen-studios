import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import "@fontsource/poppins/400.css";
import "@fontsource/poppins/500.css";
import "@fontsource/poppins/600.css";
import "@fontsource/poppins/700.css";
import theme from "@/theme";
import { CartProvider } from "@/lib/cart";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "@/styles/carbon.scss";

export const viewport = { width: "device-width", initialScale: 1, viewportFit: "cover" };

export const metadata = {
  title: { default: "Si6teen | Fragrance & Skincare", template: "%s | Si6teen" },
  description: "Modern, minimal, premium fragrances and skincare by Si6teen Studios.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en-IN">
      <body>
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <CartProvider>
              <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
                <Header />
                <Box component="main" sx={{ flex: 1 }}>{children}</Box>
                <Footer />
              </Box>
            </CartProvider>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
