import { ogContentType, ogSize, renderOg } from "@/lib/og";

export const alt = "Qollabra — Product engineering and production GenAI";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOg({ eyebrow: "Production GenAI consultants", title: "We build the system, not just the demo." });
}
