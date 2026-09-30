// src/client/components/AbilityTargetingOverlay.tsx

type Mode = "single" | "circle";

export function AbilityTargetingOverlay({
                                          origin,
                                          hover,
                                          range,
                                          radius,
                                          mode,
                                          width,
                                          height,
                                          tileSize,
                                        }: {
  origin: { x: number; y: number } | null;
  hover: { x: number; y: number } | null;
  range: number;
  radius: number;
  mode: Mode;
  width: number;
  height: number;
  tileSize: number;
}) {
  if (!origin) return null;

  const tiles: { x: number; y: number; type: "range" | "aoe" }[] = [];

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const dx = Math.abs(x - origin.x);
      const dy = Math.abs(y - origin.y);
      const dist = Math.max(dx, dy);
      if (dist <= range) {
        tiles.push({ x, y, type: "range" });
      }
    }
  }

  if (hover && mode === "circle") {
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const dx = Math.abs(x - hover.x);
        const dy = Math.abs(y - hover.y);
        const dist = Math.max(dx, dy);
        if (dist <= radius) {
          tiles.push({ x, y, type: "aoe" });
        }
      }
    }
  }

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
      }}
    >
      {tiles.map((t, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: t.x * tileSize,
            top: t.y * tileSize,
            width: tileSize,
            height: tileSize,
            boxSizing: "border-box",
            border:
              t.type === "range" ? "1px solid rgba(0,255,0,0.5)" : "1px solid rgba(255,0,0,0.7)",
            background:
              t.type === "range"
                ? "rgba(0,255,0,0.15)"
                : "rgba(255,0,0,0.2)",
          }}
        />
      ))}
    </div>
  );
}
