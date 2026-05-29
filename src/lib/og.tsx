import { ImageResponse } from "next/og";

// Shared warm, branded fallback share card. The band's hero photo will
// replace this later — until then we render a simple desert-sunset card.
export const OG_SIZE = { width: 1200, height: 630 };
export const OG_ALT = "OC Times Quartet — Brothers on the road";
export const OG_CONTENT_TYPE = "image/png";

export function renderShareImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background:
            "linear-gradient(135deg, #3a2417 0%, #a05a30 55%, #d9a55c 100%)",
          color: "#fbf6ea",
          fontFamily: "Georgia, serif",
        }}
      >
        <div
          style={{
            fontSize: 30,
            letterSpacing: 8,
            textTransform: "uppercase",
            color: "#f0d49b",
            fontWeight: 600,
          }}
        >
          2008 International Quartet Champions
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 150,
            fontWeight: 700,
            lineHeight: 1.0,
            marginTop: 24,
          }}
        >
          OC Times
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 40,
            marginTop: 28,
            maxWidth: 900,
            color: "rgba(251,246,234,0.92)",
          }}
        >
          Four voices, twenty-plus years, one long shared trip.
        </div>
      </div>
    ),
    { ...OG_SIZE }
  );
}
