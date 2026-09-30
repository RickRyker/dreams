// client/src/components/hud/GoldDisplay.tsx

import { usePlayer } from "../../context/PlayerContext";

export function GoldDisplay() {
  const { player } = usePlayer();
  if (!player) return null;

  return (
    <div className="flex items-center gap-2 text-yellow-400 text-sm bg-gray-900 px-3 py-1 border border-gray-700 rounded shadow">
      <span className="text-yellow-300">🪙</span>
      <span>{player.stats.gold}</span>
    </div>
  );
}
