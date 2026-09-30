// client/src/components/hud/TargetFrame.tsx

import {useGameState} from "../../state/GameStateContext";
import type {TargetState} from "../../state/gameStateTypes";

export function TargetFrame() {
  const { state } = useGameState();
  const target: TargetState | null = state.target;
  if (!target) return null;

  const pct = Math.max(0, Math.min(100, (target.hp / target.maxHp) * 100));

  return (
    <div className="bg-black bg-opacity-80 border border-gray-700 rounded px-3 py-2 w-72">
      <div className="flex justify-between text-xs text-gray-300 mb-1">
        <span>{target.name}</span>
        <span>Lv {target.level}</span>
      </div>
      <div className="w-full h-3 bg-gray-800 rounded border border-gray-700">
        <div className="h-full bg-red-600" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}
