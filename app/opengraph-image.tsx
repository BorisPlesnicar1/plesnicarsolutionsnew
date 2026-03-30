import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt = "Plesnicar Solutions – IT & Digital aus Österreich";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const runtime = "nodejs";

export default async function Image() {
  const logoPath = join(process.cwd(), "public", "logos", "LogoTEXTB.png");
  const logoData = await readFile(logoPath, "base64");
  const logoSrc = `data:image/png;base64,${logoData}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0a0a0a",
        }}
      >
        {/* Logo zentriert im richtigen Seitenverhältnis – nicht gequetscht */}
        <img
          src={logoSrc}
          alt="Plesnicar Solutions"
          style={{
            maxWidth: "85%",
            maxHeight: "75%",
            objectFit: "contain",
          }}
        />
      </div>
    ),
    { ...size }
  );
}
