"use client";
import { useState } from "react";
import Box from "@mui/material/Box";

export default function Gallery({ images, alt }) {
  const [i, setI] = useState(0);
  if (!images.length) return <Box sx={{ aspectRatio: "1/1", bgcolor: "primary.light" }} />;
  return (
    <Box>
      <Box sx={{ aspectRatio: "1 / 1", bgcolor: "primary.light", mb: 1.5 }}>
        <img src={images[i]} alt={alt} style={{ display: "block", width: "100%", height: "100%", objectFit: "cover" }} />
      </Box>
      {images.length > 1 && (
        <Box sx={{ display: "flex", gap: 1 }}>
          {images.map((src, idx) => (
            <Box key={src} component="button" type="button" onClick={() => setI(idx)} aria-label={`Image ${idx + 1}`}
              sx={{ p: 0, width: 72, height: 72, cursor: "pointer", bgcolor: "primary.light",
                    border: 2, borderColor: idx === i ? "primary.main" : "transparent" }}>
              <img src={src} alt="" style={{ display: "block", width: "100%", height: "100%", objectFit: "cover" }} />
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
}
