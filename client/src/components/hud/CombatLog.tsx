// client/src/components/hud/CombatLog.tsx
import {useGameState} from "../../state/GameStateContext";
import type {CombatLogEntry} from "../../state/gameStateTypes";

export function CombatLog() {
  const { state } = useGameState();
  const lines = state.combatLog;

  return (
    <div className="w-80 bg-black bg-opacity-80 border border-gray-700 rounded p-2 text-xs text-gray-200 max-h-40 overflow-y-auto">
      {lines.map((l: CombatLogEntry) => (
        <div key={l.id}>{l.text}</div>
      ))}
    </div>
  );
}