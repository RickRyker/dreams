// client/src/components/player/PlayerInfoPanel.tsx

import { usePlayer } from "../../context/PlayerContext";

export function PlayerInfoPanel() {
  const { player } = usePlayer();

  if (!player) {
    return (
      <div className="text-gray-400 p-4 bg-black border border-gray-700 rounded">
        Loading player info...
      </div>
    );
  }

  return (
    <div className="bg-black text-white border border-gray-700 rounded p-4 w-80 shadow-lg">
      <h2 className="text-xl font-bold mb-3 text-cyan-400 tracking-wide">
        {player.name}
      </h2>

      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-400">Title</span>
          <span>{player.title ?? "None"}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-400">Class</span>
          <span>{player.class}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-400">Level</span>
          <span>{player.level}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-400">Gender</span>
          <span>{player.gender}</span>
        </div>

        <div className="border-t border-gray-700 my-2"></div>

        <div className="flex justify-between">
          <span className="text-gray-400">Map</span>
          <span>{player.mapId ?? "Unknown"}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-400">Position</span>
          <span>
            ({player.x}, {player.y})
          </span>
        </div>

        <div className="border-t border-gray-700 my-2"></div>

        <div className="flex justify-between">
          <span className="text-gray-400">Default Character</span>
          <span className={player.isDefault ? "text-green-400" : "text-red-400"}>
            {player.isDefault ? "Yes" : "No"}
          </span>
        </div>
      </div>
    </div>
  );
}
