import { ImageResponse } from "next/og";

export const dynamic = "force-static";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
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
          backgroundColor: "#000000",
          backgroundImage:
            "radial-gradient(circle at 15% 15%, rgba(168,85,247,0.35), transparent 45%)",
          color: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            width: 90,
            height: 2,
            background: "rgba(255,255,255,0.4)",
            marginBottom: 40,
          }}
        />
        <div style={{ display: "flex", fontSize: 72, fontWeight: 700, letterSpacing: -1 }}>
          Hakim Sabi
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 16,
            fontSize: 40,
            color: "#a855f7",
            fontWeight: 600,
          }}
        >
          Développeur Fullstack
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 32,
            fontSize: 28,
            color: "rgba(255,255,255,0.6)",
          }}
        >
          Next.js · React · Laravel · Spring Boot — Madagascar
        </div>
      </div>
    ),
    { ...size }
  );
}
