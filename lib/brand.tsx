import { ImageResponse } from "next/og";

// Shared artwork for the share preview, the home-screen icons and the manifest.
export function iconImage(size: number) {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "#1f5c5a", borderRadius: size * 0.22 }}>
        <div style={{ display: "flex", width: size * 0.62, height: size * 0.5 }}>
          <div style={{ flex: 1, background: "#f2c98b", borderRadius: `${size * 0.08}px 0 0 ${size * 0.08}px` }} />
          <div style={{ flex: 1, background: "#fbf7f0", borderRadius: `0 ${size * 0.08}px ${size * 0.08}px 0`, display: "flex", alignItems: "center", justifyContent: "center", color: "#1f5c5a", fontSize: size * 0.34, fontWeight: 700 }}>+</div>
        </div>
      </div>
    ),
    { width: size, height: size },
  );
}

export function shareImage() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", padding: "0 96px", background: "#fbf7f0", color: "#1f2a2e" }}>
        <div style={{ display: "flex", fontSize: 28, letterSpacing: 6, textTransform: "uppercase", color: "#8a4a0f" }}>Apologetics, evangelism and discipleship</div>
        <div style={{ display: "flex", fontSize: 108, fontWeight: 700, lineHeight: 1.05, marginTop: 28 }}>The Gita and the Gospel</div>
        <div style={{ display: "flex", fontSize: 38, lineHeight: 1.4, color: "#56636a", marginTop: 32, maxWidth: 900 }}>
          Who is God, does he love us, and what are we here for? A walk through two scriptures, side by side.
        </div>
        <div style={{ display: "flex", marginTop: 48, height: 12, width: 360, borderRadius: 6, background: "linear-gradient(90deg,#1f5c5a,#e9a94b)" }} />
      </div>
    ),
    { width: 1200, height: 630 },
  );
}
