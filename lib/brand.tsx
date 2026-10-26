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
