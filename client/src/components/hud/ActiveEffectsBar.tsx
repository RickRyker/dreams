// client/src/components/hud/ActiveEffectsBar.tsx

import {useGameState} from "../../state/GameStateContext";
import {useEffect} from "react";
import type {ActiveEffect} from "../../state/gameStateTypes";

export function ActiveEffectsBar() {
  const { state, removeEffect } = useGameState();
  const effects: ActiveEffect[] = state.effects;

  useEffect(() => {
    if (effects.length === 0) return;
    const id = setInterval(() => {
      // you could move countdown logic into GameState if you prefer
      effects.forEach((e: ActiveEffect) => {
        if (e.remainingSeconds <= 1) removeEffect(e.id);
      });
    }, 1000);
    return () => clearInterval(id);
  }, [effects, removeEffect]);

  if (effects.length === 0) return null;

  return (
    <div className="flex gap-1 bg-black bg-opacity-70 border border-gray-700 rounded px-2 py-1">
      {effects.map((e: ActiveEffect) => (
        <div
          key={e.id}
          className={`w-8 h-8 border rounded flex items-center justify-center text-[10px] ${
            e.isDebuff ? "border-red-500" : "border-green-500"
          }`}
          title={`${e.name} (${e.remainingSeconds}s)`}
        >
          {e.icon ? (
            <img src={e.icon} alt={e.name} className="w-7 h-7 object-contain" />
          ) : (
            e.name[0]
          )}
        </div>
      ))}
    </div>
  );
}
