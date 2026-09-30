//client/src/components/player/PlayerQuestLog.tsx
import { useState } from "react";
import { usePlayer } from "../../context/PlayerContext";

export function PlayerQuestLog() {
  const { player } = usePlayer();
  const [hoverId, setHoverId] = useState<string | null>(null);

  if (!player) {
    return (
      <div className="text-gray-400 p-4 bg-black border border-gray-700 rounded">
        Loading quests...
      </div>
    );
  }

  return (
    <div className="bg-black text-white border border-gray-700 rounded p-4 w-[350px] shadow-lg relative">
      <h2 className="text-xl font-bold mb-3 text-orange-400 tracking-wide">
        Quest Log
      </h2>

      {player.quests.length === 0 && (
        <div className="text-gray-600 text-xs">No active quests</div>
      )}

      <div className="space-y-2">
        {player.quests.map((quest) => (
          <div
            key={quest.id}
            className={`p-2 bg-gray-900 border rounded cursor-pointer ${
              quest.isCompleted
                ? "border-green-500"
                : "border-gray-700 hover:border-orange-400"
            }`}
            onMouseEnter={() => setHoverId(quest.id)}
            onMouseLeave={() => setHoverId(null)}
          >
            <div className="flex justify-between">
              <span>{quest.name}</span>
              <span
                className={
                  quest.isCompleted ? "text-green-400" : "text-orange-300"
                }
              >
                {quest.isCompleted ? "Completed" : `Stage ${quest.stage}`}
              </span>
            </div>

            {hoverId === quest.id && (
              <div className="absolute z-50 left-80 bg-gray-900 border border-gray-700 p-2 rounded shadow-xl w-48 pointer-events-none">
                <div className="font-bold text-orange-300">{quest.name}</div>
                <div className="text-gray-400 text-xs mt-1">
                  Quest ID: {quest.id}
                </div>
                <div className="text-gray-400 text-xs">
                  Stage: {quest.stage}
                </div>
                <div className="text-gray-400 text-xs">
                  Status: {quest.isCompleted ? "Completed" : "In Progress"}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
