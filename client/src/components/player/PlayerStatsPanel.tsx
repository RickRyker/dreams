// client/src/components/player/PlayerStatsPanel.tsx
import React from "react";
import { usePlayer } from "../../context/PlayerContext";

export function PlayerStatsPanel() {
  const { player } = usePlayer();

  if (!player) {
    return (
      <div className="text-gray-400 p-4 bg-black border border-gray-700 rounded">
        Loading stats...
      </div>
    );
  }

  const s = player.stats;

  return (
    <div className="bg-black text-white border border-gray-700 rounded p-4 w-80 shadow-lg">
      <h2 className="text-xl font-bold mb-3 text-green-400 tracking-wide">
        Stats
      </h2>

      <div className="space-y-2 text-sm">
        {/* HP */}
        <div className="flex justify-between">
          <span className="text-gray-400">HP</span>
          <span className="text-red-400">
            {s.hp} / {s.maxHp}
          </span>
        </div>

        {/* MP */}
        <div className="flex justify-between">
          <span className="text-gray-400">MP</span>
          <span className="text-blue-400">
            {s.mp} / {s.maxMp}
          </span>
        </div>

        <div className="border-t border-gray-700 my-2"></div>

        {/* Core Attributes */}
        <div className="flex justify-between">
          <span className="text-gray-400">Strength</span>
          <span>{s.strength}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-400">Dexterity</span>
          <span>{s.dexterity}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-400">Intelligence</span>
          <span>{s.intelligence}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-400">Charisma</span>
          <span>{s.charisma}</span>
        </div>

        <div className="border-t border-gray-700 my-2"></div>

        {/* Gold */}
        <div className="flex justify-between">
          <span className="text-gray-400">Gold</span>
          <span className="text-yellow-400">{s.gold}</span>
        </div>

        {/* XP */}
        <div className="flex justify-between">
          <span className="text-gray-400">Experience</span>
          <span>{s.experience}</span>
        </div>
      </div>
    </div>
  );
}
