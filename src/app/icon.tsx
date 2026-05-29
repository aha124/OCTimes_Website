import { ImageResponse } from "next/og";

// Warm "OC" monogram favicon — a placeholder until the band supplies a logo.
export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#b85431",
          color: "#fbf6ea",
          fontSize: 18,
          fontWeight: 700,
          fontFamily: "Georgia, serif",
          letterSpacing: -1,
        }}
      >
        OC
      </div>
    ),
    { ...size }
  );
}
