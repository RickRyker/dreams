// src/client/components/TurnOrderSidebar.tsx
import React from "react";

interface TurnOrderParticipant {
  id: string;
  isAlive: boolean;
  initiative?: number;
  participantType: string;
}

export function TurnOrderSidebar({
                                   participants,
                                   activeTurnId,
                                 }: {
  participants: TurnOrderParticipant[];
  activeTurnId: string | null;
}) {
  const order = participants
    .filter((p) => p.isAlive)
    .sort((a, b) => (a.initiative ?? 0) - (b.initiative ?? 0));

  return (
    <div
      style={{
        width: 140,
        background: "#111",
        color: "#fff",
        borderLeft: "2px solid #444",
        padding: 8,
        fontFamily: "monospace",
      }}
    >
      <div style={{ marginBottom: 6, fontWeight: "bold" }}>Turn Order</div>
      {order.map((p, idx) => (
        <div
          key={p.id}
          style={{
            padding: "4px 6px",
            marginBottom: 2,
            background: p.id === activeTurnId ? "#0a0" : "#222",
            borderRadius: 4,
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <span>{p.participantType[0]}-{idx + 1}</span>
          <span>{p.initiative ?? "-"}</span>
        </div>
      ))}
    </div>
  );
}
