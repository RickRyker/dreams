// src/client/components/AbilityBar.tsx

export function AbilityBar({
                             abilities,
                             cooldowns,
                             gcdUntil,
                             onCast,
                           }: {
  abilities: { slug: string; name: string; icon?: string }[];
  cooldowns: Record<string, number>;
  gcdUntil: number | null;
  onCast: (slug: string) => void;
}) {
  const now = Date.now();

  return (
    <div
      style={{
        display: "flex",
        gap: "8px",
        padding: "8px",
        background: "#222",
        borderTop: "2px solid #444",
      }}
    >
      {abilities.map((a) => {
        const cd = cooldowns[a.slug] ?? 0;
        const cdRemaining = Math.max(0, cd - now);

        const gcdActive = gcdUntil !== null && gcdUntil > now;

        const disabled = cdRemaining > 0 || gcdActive;

        return (
          <button
            key={a.slug}
            onClick={() => !disabled && onCast(a.slug)}
            disabled={disabled}
            style={{
              width: 48,
              height: 48,
              background: disabled ? "#555" : "#333",
              color: "#fff",
              border: "1px solid #444",
              position: "relative",
            }}
          >
            {a.icon ? (
              <img src={a.icon} alt="" style={{ width: "100%", height: "100%" }} />
            ) : (
              a.name[0]
            )}

            {cdRemaining > 0 && (
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "rgba(0,0,0,0.6)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#fff",
                  fontSize: "14px",
                }}
              >
                {Math.ceil(cdRemaining / 1000)}
              </div>
            )}

            {gcdActive && (
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "rgba(255,255,255,0.2)",
                }}
              />
            )}
          </button>
        );
      })}
    </div>
  );
}
