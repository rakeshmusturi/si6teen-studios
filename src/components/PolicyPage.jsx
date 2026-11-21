import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { BUSINESS } from "@/lib/business";

export function PolicyLayout({ title, intro, children }) {
  return (
    <Container maxWidth="md" sx={{ py: { xs: 4, md: 8 } }}>
      <Typography variant="h4" component="h1" sx={{ mb: 1, fontSize: { xs: "1.75rem", md: "2.25rem" } }}>{title}</Typography>
      <Typography variant="caption" color="text.secondary">Last updated: {BUSINESS.updated}</Typography>
      {intro && <Typography sx={{ mt: 3, color: "text.secondary", lineHeight: 1.8 }}>{intro}</Typography>}
      <Box sx={{ mt: 2 }}>{children}</Box>
    </Container>
  );
}
export const H = ({ children }) => (
  <Typography variant="h6" component="h2" sx={{ mt: 4, mb: 1.5 }}>{children}</Typography>
);
export const P = ({ children }) => (
  <Typography sx={{ mb: 1.5, lineHeight: 1.8, color: "text.secondary" }}>{children}</Typography>
);
export const UL = ({ items }) => (
  <Box component="ul" sx={{ pl: 3, mt: 0, mb: 2, color: "text.secondary", lineHeight: 1.8 }}>
    {items.map((i, n) => <li key={n}>{i}</li>)}
  </Box>
);
