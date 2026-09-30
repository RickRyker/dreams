// client/src/components/CauseOfDeathChart.tsx
export function CauseOfDeathChart({
                                    causeOfDeath,
                                  }: {
  causeOfDeath: Record<string, string>;
}) {
  const entries = Object.entries(causeOfDeath);

  if (!entries.length) return <div>No deaths recorded.</div>;

  return (
    <div style={{ padding: 12, background: "#1a1a1a", color: "#eee" }}>
      <h4>Cause of Death</h4>
      {entries.map(([victim, cause]) => (
        <div
          key={victim}
          style={{
            marginBottom: 4,
            padding: 4,
            borderLeft: "4px solid #c33",
            background: "#222",
          }}
        >
          <strong>{victim}</strong> died to <span>{cause}</span>
        </div>
      ))}
    </div>
  );
}
