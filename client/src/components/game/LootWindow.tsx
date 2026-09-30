// client/src/components/game/LootWindow.tsx

import { useGameState } from "../../state/GameStateContext";
import type { LootItem } from "../../state/gameStateTypes";

export function LootWindow() {
  const { state, closeLoot, openLoot } = useGameState();
  const loot = state.loot;

  if (!loot.isOpen || loot.items.length === 0) return null;

  const onTake = (id: string) => {
    const remaining = loot.items.filter((i: LootItem) => i.id !== id);
    openLoot(remaining);
  };

  const onTakeAll = () => {
    openLoot([]);
  };

  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      <div className="w-80 bg-black bg-opacity-90 border border-gray-700 rounded p-4 pointer-events-auto">
        <div className="flex justify-between items-center mb-3">
          <div className="text-lg font-bold text-yellow-300">Loot</div>
          <button
            onClick={closeLoot}
            className="text-gray-400 hover:text-white text-sm"
          >
            ✕
          </button>
        </div>

        <div className="space-y-2 max-h-60 overflow-y-auto text-sm">
          {loot.items.map((item: LootItem) => (
            <div
              key={item.id}
              className="flex items-center justify-between bg-gray-900 border border-gray-700 rounded px-2 py-1"
            >
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-black border border-gray-700 rounded flex items-center justify-center text-[10px] text-gray-400">
                  {item.icon ? (
                    <img
                      src={item.icon}
                      alt={item.name}
                      className="w-5 h-5 object-contain"
                    />
                  ) : (
                    item.name[0]
                  )}
                </div>
                <span>{item.name}</span>
                {item.qty > 1 && (
                  <span className="text-gray-400 text-xs">x{item.qty}</span>
                )}
              </div>
              <button
                onClick={() => onTake(item.id)}
                className="text-xs text-cyan-300 hover:text-cyan-100"
              >
                Take
              </button>
            </div>
          ))}
        </div>

        <div className="flex justify-end gap-2 mt-3 text-xs">
          <button
            onClick={onTakeAll}
            className="px-2 py-1 bg-cyan-600 text-black rounded hover:bg-cyan-500"
          >
            Take All
          </button>
        </div>
      </div>
    </div>
  );
}
