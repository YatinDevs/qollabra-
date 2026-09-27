import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

async function dataUrl(file: string) {
  const buf = await readFile(join(process.cwd(), "public/brand", file));
  return `data:image/png;base64,${buf.toString("base64")}`;
}

/** Shared branded social card. `brand` switches between the Qollabra (light) and Qohort (dark) looks. */
export async function renderOg({
  title,
  eyebrow,
  brand = "qollabra",
}: {
  title: string;
  eyebrow?: string;
  brand?: "qollabra" | "qohort";
}) {
  const dark = brand === "qohort";
  const logo = await dataUrl(dark ? "qohort-paper.png" : "qollabra-mark.png");
  const size = title.length > 70 ? 54 : title.length > 45 ? 64 : 76;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: dark ? "#1c1c1c" : "#fffcf7",
          color: dark ? "#f8f8f8" : "#1f1f1f",
          borderBottom: "16px solid #ff9a33",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          {dark ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={logo} width={216} height={82} alt="" />
          ) : (
            <>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={logo} width={48} height={72} alt="" />
              <span style={{ fontSize: 40, fontWeight: 700, color: "#444444" }}>Qollabra</span>
            </>
          )}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          {eyebrow && (
            <span style={{ fontSize: 26, color: dark ? "#ff9a33" : "#b35c00", textTransform: "uppercase", letterSpacing: 3 }}>
              {eyebrow}
            </span>
          )}
          <span style={{ fontSize: size, fontWeight: 700, lineHeight: 1.1, maxWidth: 1000 }}>{title}</span>
        </div>
        <span style={{ fontSize: 24, color: dark ? "#a9a9a9" : "#5c5c5c" }}>
          {dark ? "qollabra.com/qohort" : "qollabra.com"}
        </span>
      </div>
    ),
    ogSize,
  );
}
