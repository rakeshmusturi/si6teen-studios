"use client";
import { Accordion, AccordionItem } from "@carbon/react"; // Carbon component

export default function DetailsAccordion({ html }) {
  if (!html) return null;
  return (
    <Accordion>
      <AccordionItem title="Product details" open>
        <div dangerouslySetInnerHTML={{ __html: html }} />
      </AccordionItem>
    </Accordion>
  );
}
