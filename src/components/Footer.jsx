import Image from "next/image";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

export default function Footer() {
  return (
    <Box component="footer" sx={{ bgcolor: "#F6F5FF", mt: 10, py: 6, borderTop: 1, borderColor: "divider" }}>
      <Container maxWidth="lg" sx={{ display: "flex", flexDirection: "column", gap: 2, alignItems: "flex-start" }}>
        <Image src="/brand/logo-header.png" alt="Si6teen" width={120} height={29} />
        <Typography variant="caption" sx={{ letterSpacing: "0.2em", textTransform: "uppercase" }}>
          Modern &nbsp;•&nbsp; Minimal &nbsp;•&nbsp; Premium
        </Typography>
        <Typography variant="caption" color="text.secondary">
          © {new Date().getFullYear()} Si6teen Studios. All prices include GST.
        </Typography>
      </Container>
    </Box>
  );
}
