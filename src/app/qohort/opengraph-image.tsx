import { ogContentType, ogSize, renderOg } from "@/lib/og";

export const alt = "Qohort — Applied AI Engineering Residency";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOg({
    brand: "qohort",
    eyebrow: "Applied AI Engineering Residency",
    title: "Become an engineer who can build, deploy and defend AI-enabled software.",
  });
}
