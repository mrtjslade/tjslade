import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

// Social preview card, generated at build time. The card is cut on a diagonal
// like the favicon: professional mode on the white side, space mode on the
// black side.

export const alt =
  "TJ Slade, web developer: React, Next.js, and TypeScript. tjslade.com";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const W = size.width;
const H = size.height;

// The diagonal runs from the bottom edge at x=430 up to the right edge at y=40.
const EDGE = { bottomX: 430, rightY: 40 };
const isSpaceSide = (x: number, y: number) =>
  (x - EDGE.bottomX) * (H - EDGE.rightY) > (H - y) * (W - EDGE.bottomX);

// Deterministic star field so the image is identical on every build.
function stars(count: number) {
  let seed = 7;
  const rand = () => {
    seed = (seed * 16807) % 2147483647;
    return seed / 2147483647;
  };
  const out: { x: number; y: number; r: number; o: number }[] = [];
  while (out.length < count) {
    const x = rand() * W;
    const y = rand() * H;
    const r = 1 + rand() * 2.2;
    const o = 0.35 + rand() * 0.6;
    // Keep stars clear of the diagonal edge.
    if (isSpaceSide(x - 24, y + 24)) out.push({ x, y, r, o });
  }
  return out;
}

const font = (file: string) =>
  readFile(join(process.cwd(), "src/assets/og-fonts", file));

export default async function OpengraphImage() {
  const [interBold, interMedium, bebas, aurebesh] = await Promise.all([
    font("Inter-Bold.ttf"),
    font("Inter-Medium.ttf"),
    font("BebasNeue-Regular.ttf"),
    readFile(join(process.cwd(), "public/fonts/AurebeshAF-Canon.otf")),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          background: "#ffffff",
          fontFamily: "Inter",
        }}
      >
        {/* Space side and the red seam along the diagonal */}
        <svg
          width={W}
          height={H}
          viewBox={`0 0 ${W} ${H}`}
          style={{ position: "absolute", top: 0, left: 0 }}
        >
          <polygon
            points={`${EDGE.bottomX},${H} ${W},${EDGE.rightY} ${W},${H}`}
            fill="#05070d"
          />
          <line
            x1={EDGE.bottomX}
            y1={H}
            x2={W}
            y2={EDGE.rightY}
            stroke="#ff3333"
            strokeWidth={8}
          />
        </svg>

        {stars(70).map((s, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              left: s.x,
              top: s.y,
              width: s.r * 2,
              height: s.r * 2,
              borderRadius: "50%",
              background: "#ffffff",
              opacity: s.o,
            }}
          />
        ))}

        {/* Professional side */}
        <div
          style={{
            position: "absolute",
            left: 80,
            top: 92,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              fontSize: 116,
              fontWeight: 700,
              color: "#1a1a1a",
              letterSpacing: -3,
              lineHeight: 1,
            }}
          >
            TJ Slade
          </div>
          <div
            style={{
              width: 96,
              height: 7,
              background: "#b8333d",
              marginTop: 30,
              marginBottom: 30,
            }}
          />
          <div
            style={{
              fontSize: 38,
              fontWeight: 500,
              color: "#2a2a2a",
              lineHeight: 1.3,
            }}
          >
            Web developer
          </div>
          <div
            style={{
              fontSize: 32,
              fontWeight: 500,
              color: "#5a5a5a",
              lineHeight: 1.3,
            }}
          >
            React · Next.js · TypeScript
          </div>
        </div>

        <div
          style={{
            position: "absolute",
            left: 80,
            bottom: 62,
            display: "flex",
            alignItems: "center",
          }}
        >
          <svg width={40} height={40} viewBox="0 0 64 64">
            <path d="M 12.2 12.2 A 28 28 0 0 1 51.8 51.8 Z" fill="#ff3333" />
            <path d="M 12.2 12.2 A 28 28 0 0 0 51.8 51.8 Z" fill="#000000" />
          </svg>
          <div
            style={{
              marginLeft: 12,
              fontSize: 28,
              fontWeight: 500,
              color: "#1a1a1a",
            }}
          >
            tjslade.com
          </div>
        </div>

        {/* Space side: the hero line in Aurebesh, with its translation */}
        <div
          style={{
            position: "absolute",
            right: 72,
            bottom: 70,
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
          }}
        >
          <div
            style={{
              fontFamily: "Aurebesh",
              fontSize: 54,
              color: "#ffd700",
              textShadow: "0 0 18px rgba(255, 215, 0, 0.55)",
            }}
          >
            Hi, I'm TJ
          </div>
          <div
            style={{
              fontFamily: "Bebas Neue",
              fontSize: 34,
              letterSpacing: 4,
              color: "#ffd700",
              opacity: 0.75,
              marginTop: 6,
            }}
          >
            Hi, I'm TJ
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Inter", data: interBold, weight: 700, style: "normal" },
        { name: "Inter", data: interMedium, weight: 500, style: "normal" },
        { name: "Bebas Neue", data: bebas, weight: 400, style: "normal" },
        { name: "Aurebesh", data: aurebesh, weight: 400, style: "normal" },
      ],
    }
  );
}
