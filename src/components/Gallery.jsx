"use client";
import { useRef, useState } from "react";
import Box from "@mui/material/Box";

const frame = { bgcolor: "#F6F5FF", borderRadius: "16px", overflow: "hidden" };
const imgStyle = { display: "block", width: "100%", height: "100%", objectFit: "cover" };

export default function Gallery({ images, alt }) {
  const [i, setI] = useState(0);        // desktop: selected image
  const [dot, setDot] = useState(0);    // mobile: current slide
  const track = useRef(null);

  if (!images.length) return <Box sx={{ ...frame, aspectRatio: "1 / 1" }} />;

  const onScroll = () => {
    const el = track.current;
    if (el) setDot(Math.round(el.scrollLeft / el.clientWidth));
  };
  const goTo = (n) => track.current?.scrollTo({ left: n * track.current.clientWidth, behavior: "smooth" });

  return (
    <>
      {/* Phone: swipeable carousel with dots */}
      <Box sx={{ display: { xs: "block", md: "none" } }}>
        <Box ref={track} onScroll={onScroll} sx={{
          display: "flex", overflowX: "auto", scrollSnapType: "x mandatory", scrollbarWidth: "none",
          "&::-webkit-scrollbar": { display: "none" }, ...frame }}>
          {images.map((src, n) => (
            <Box key={src} sx={{ flex: "0 0 100%", scrollSnapAlign: "start", aspectRatio: "1 / 1" }}>
              <img src={src} alt={n === 0 ? alt : ""} style={imgStyle} />
            </Box>
          ))}
        </Box>
        {images.length > 1 && (
          <Box sx={{ display: "flex", justifyContent: "center", gap: 1, mt: 1.5 }}>
            {images.map((src, n) => (
              <Box key={src} component="button" type="button" aria-label={`Image ${n + 1}`} onClick={() => goTo(n)}
                sx={{ p: 0, border: 0, cursor: "pointer", height: 6, borderRadius: 3, transition: "all .2s",
                      width: n === dot ? 18 : 6, bgcolor: n === dot ? "primary.main" : "#d4d1ee" }} />
            ))}
          </Box>
        )}
      </Box>

      {/* Desktop: thumbnails + large image */}
      <Box sx={{ display: { xs: "none", md: "flex" }, gap: 2 }}>
        {images.length > 1 && (
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
            {images.map((src, n) => (
              <Box key={src} component="button" type="button" aria-label={`Image ${n + 1}`} onClick={() => setI(n)}
                sx={{ p: 0, width: 76, height: 76, cursor: "pointer", borderRadius: "12px", overflow: "hidden",
                      bgcolor: "#F6F5FF", border: 2, borderColor: n === i ? "primary.main" : "transparent" }}>
                <img src={src} alt="" style={imgStyle} />
              </Box>
            ))}
          </Box>
        )}
        <Box sx={{ ...frame, flex: 1, aspectRatio: "1 / 1" }}>
          <img src={images[i]} alt={alt} style={imgStyle} />
        </Box>
      </Box>
    </>
  );
}
