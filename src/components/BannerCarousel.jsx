"use client";
import { useRef, useState } from "react";
import Link from "next/link";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

// slides: [{ id, eyebrow, title, subtitle, cta, href, image, tone: "light" | "purple" }]
const TONES = {
  light: { bg: "linear-gradient(135deg, #E7E5FF 0%, #F6F5FF 100%)", color: "text.primary", sub: "text.secondary" },
  purple: { bg: "linear-gradient(135deg, #7B68EE 0%, #6B57E6 100%)", color: "#fff", sub: "rgba(255,255,255,0.85)" },
};

export default function BannerCarousel({ slides }) {
  const track = useRef(null);
  const [dot, setDot] = useState(0);
  const onScroll = () => {
    const el = track.current; if (!el) return;
    const first = el.children[0]; if (!first) return;
    setDot(Math.round(el.scrollLeft / (first.clientWidth + 12)));
  };
  const goTo = (n) => {
    const el = track.current; if (!el?.children[0]) return;
    el.scrollTo({ left: n * (el.children[0].clientWidth + 12), behavior: "smooth" });
  };

  return (
    <Box>
      <Box ref={track} onScroll={onScroll} sx={{
        display: "flex", gap: "12px", overflowX: "auto", scrollSnapType: "x mandatory", scrollbarWidth: "none",
        "&::-webkit-scrollbar": { display: "none" } }}>
        {slides.map((s) => {
          const t = TONES[s.tone] ?? TONES.light;
          return (
            <Box key={s.id} sx={{
              flex: { xs: "0 0 92%", md: "0 0 100%" }, scrollSnapAlign: "start", background: t.bg, color: t.color,
              borderRadius: "20px", overflow: "hidden", display: "flex", alignItems: "center", gap: 2,
              p: { xs: 2.5, md: 6 }, minHeight: { xs: 200, md: 380 } }}>
              <Box sx={{ flex: 1, minWidth: 0 }}>
                <Typography variant="caption" sx={{ letterSpacing: "0.14em", textTransform: "uppercase", fontWeight: 600, opacity: 0.9 }}>
                  {s.eyebrow}
                </Typography>
                <Typography component="h2" sx={{ fontWeight: 600, lineHeight: 1.15, mt: 0.5, mb: 1,
                  fontSize: { xs: "1.35rem", md: "2.75rem" } }}>{s.title}</Typography>
                <Typography sx={{ color: t.sub, mb: { xs: 2, md: 3 }, fontSize: { xs: "0.8rem", md: "1rem" }, maxWidth: 420 }}>
                  {s.subtitle}
                </Typography>
                <Button component={Link} href={s.href} variant="contained" size="small"
                  sx={s.tone === "purple"
                    ? { bgcolor: "#fff", color: "primary.dark", backgroundImage: "none", "&:hover": { bgcolor: "#F6F5FF", backgroundImage: "none" } }
                    : undefined}>
                  {s.cta}
                </Button>
              </Box>
              {s.image && (
                <Box sx={{ width: { xs: 130, md: 340 }, aspectRatio: "1 / 1", flexShrink: 0, borderRadius: "16px", overflow: "hidden", bgcolor: "rgba(255,255,255,0.4)" }}>
                  <img src={s.image} alt="" style={{ display: "block", width: "100%", height: "100%", objectFit: "cover" }} />
                </Box>
              )}
            </Box>
          );
        })}
      </Box>
      {slides.length > 1 && (
        <Box sx={{ display: "flex", justifyContent: "center", gap: 1, mt: 1.5 }}>
          {slides.map((s, n) => (
            <Box key={s.id} component="button" type="button" aria-label={`Banner ${n + 1}`} onClick={() => goTo(n)}
              sx={{ p: 0, border: 0, cursor: "pointer", height: 6, borderRadius: 3, transition: "all .2s",
                    width: n === dot ? 18 : 6, bgcolor: n === dot ? "primary.main" : "#d4d1ee" }} />
          ))}
        </Box>
      )}
    </Box>
  );
}
