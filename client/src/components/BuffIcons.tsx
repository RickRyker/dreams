// client/src/components/BuffIcons.tsx

export function BuffIcons({
                            effects,
                            now = Date.now(),
                          }: {
  effects: {
    id: string;
    type: "BUFF" | "DEBUFF" | "DOT" | "HOT";
    expiresAt: string | Date;
    spellSlug?: string;
  }[];
  now?: number;
}) {
  return (
    <div style={{ display: "flex", gap: 4 }}>
      {effects.map((e) => {
        const exp = typeof e.expiresAt === "string" ? new Date(e.expiresAt) : e.expiresAt;
        const msLeft = exp.getTime() - now;
        const secLeft = Math.max(0, Math.ceil(msLeft / 1000));

        const color =
          e.type === "BUFF" || e.type === "HOT"
            ? "#0a0"
            : "#a00";

        return (
          <div
            key={e.id}
            style={{
              width: 24,
              height: 24,
              background: color,
              borderRadius: 4,
              position: "relative",
              fontSize: 10,
              color: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            title={`${e.type} (${secLeft}s)`}
          >
            {e.type[0]}
            <div
              style={{
                position: "absolute",
                bottom: -10,
                width: "100%",
                textAlign: "center",
                fontSize: 9,
              }}
            >
              {secLeft}
            </div>
          </div>
        );
      })}
    </div>
  );
}
