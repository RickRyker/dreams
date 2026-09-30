// client/src/components/hud/ExperienceBar.tsx

import { usePlayer } from "../../context/PlayerContext";

export function ExperienceBar() {
  const { player } = usePlayer();
  if (!player) return null;

  // TEMP: Replace with your real XP-to-next-level formula later
  const xpNeeded = player.level * 100;
  const pct = Math.max(0, Math.min(100, (player.stats.experience / xpNeeded) * 100));

  return (
    <div className="w-full bg-gray-900 border-t border-gray-700 h-6 relative">
      <div
        className="h-full bg-purple-600 transition-all duration-200"
        style={{ width: `${pct}%` }}
      />
      <div className="absolute inset-0 flex items-center justify-center text-xs text-purple-200">
        XP {player.stats.experience} / {xpNeeded}
      </div>
    </div>
  );
}
