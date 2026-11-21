"use client";
import Box from "@mui/material/Box";
import { Accordion, AccordionItem } from "@carbon/react"; // Carbon component

// sections: [{ title, html }]  (built by lib/description.js)
export default function DetailsAccordion({ sections }) {
  if (!sections?.length) return null;
  return (
    <Box sx={{
      border: 1, borderColor: "divider", borderRadius: "14px", overflow: "hidden",
      "& .cds--accordion__item:first-of-type": { borderTop: 0 },
      "& .cds--accordion__item:last-of-type": { borderBottom: 0 },
      "& .cds--accordion__item": { borderColor: "#e4e2f5" },
      "& .cds--accordion__heading": { minHeight: 52, paddingInline: "16px" },
      "& .cds--accordion__heading:hover, & .cds--accordion__heading:active": { backgroundColor: "#F6F5FF" },
      "& .cds--accordion__arrow": { marginInline: "8px 0" },
      "& .cds--accordion__title": { fontFamily: "inherit", fontSize: "0.875rem", fontWeight: 500, marginInlineStart: 0 },
      "& .cds--accordion__content": { fontSize: "0.875rem", color: "text.secondary", lineHeight: 1.7, paddingInline: "16px", paddingBlockEnd: "16px" },
      "& .cds--accordion__content p": { m: 0, mb: 1 }, "& .cds--accordion__content ul": { m: 0, pl: 2.5, listStyleType: "disc" }, "& .cds--accordion__content li": { listStyleType: "disc", mb: 0.5 },
    }}>
      <Accordion>
        {sections.map((s) => (
          <AccordionItem key={s.title} title={s.title}>
            <div dangerouslySetInnerHTML={{ __html: s.html }} />
          </AccordionItem>
        ))}
      </Accordion>
    </Box>
  );
}
