// client/src/components/hud/Minimap.tsx

import { usePlayer } from "../../context/PlayerContext";

export function Minimap() {
  const { player } = usePlayer();
  if (!player) return null;

  return (
    <div className="w-40 h-40 bg-gray-900 border border-gray-700 rounded relative text-xs text-gray-300">
      <div className="absolute top-1 left-2 text-cyan-300">
        {player.mapId ?? "Unknown Map"}
      </div>

      <div className="absolute bottom-1 left-2">
        ({player.x}, {player.y})
      </div>

      {/* Player marker */}
      <div className="w-2 h-2 bg-red-400 rounded-full absolute inset-1/2 -translate-x-1/2 -translate-y-1/2" />
    </div>
  );
}
