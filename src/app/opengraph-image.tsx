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
          backgroundColor: "#090a0b",
          backgroundImage:
            "radial-gradient(circle at 15% 15%, rgba(2,210,227,0.30), transparent 45%)",
          color: "#f7fafb",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            width: 90,
            height: 2,
            background: "rgba(247,250,251,0.3)",
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
            color: "#02d2e3",
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
            color: "rgba(247,250,251,0.55)",
          }}
        >
          Next.js · React · Laravel · Spring Boot — Madagascar
        </div>
      </div>
    ),
    { ...size }
  );
}
