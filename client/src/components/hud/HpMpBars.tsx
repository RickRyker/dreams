// client/src/components/hud/HpMpBars.tsx

import { usePlayer } from "../../context/PlayerContext";

export function HpMpBars() {
  const { player } = usePlayer();
  if (!player) return null;

  const hpPct = Math.max(0, Math.min(100, (player.stats.hp / player.stats.maxHp) * 100));
  const mpPct = Math.max(0, Math.min(100, (player.stats.mp / player.stats.maxMp) * 100));

  return (
    <div className="space-y-2 w-64">
      {/* HP */}
      <div className="text-xs text-red-400">HP {player.stats.hp}/{player.stats.maxHp}</div>
      <div className="w-full h-4 bg-gray-800 border border-gray-700 rounded">
        <div
          className="h-full bg-red-600 transition-all duration-200"
          style={{ width: `${hpPct}%` }}
        />
      </div>

      {/* MP */}
      <div className="text-xs text-blue-400">MP {player.stats.mp}/{player.stats.maxMp}</div>
      <div className="w-full h-4 bg-gray-800 border border-gray-700 rounded">
        <div
          className="h-full bg-blue-600 transition-all duration-200"
          style={{ width: `${mpPct}%` }}
        />
      </div>
    </div>
  );
}
