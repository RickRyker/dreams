// client/src/components/player/PlayerInventoryPanel.tsx
import { useState } from "react";
import { usePlayer } from "../../context/PlayerContext";

export function PlayerInventoryPanel() {
  const { player } = usePlayer();
  const [hoverItem, setHoverItem] = useState<string | null>(null);

  if (!player) {
    return (
      <div className="text-gray-400 p-4 bg-black border border-gray-700 rounded">
        Loading inventory...
      </div>
    );
  }

  const inventory = player.inventory;

  return (
    <div className="bg-black text-white border border-gray-700 rounded p-4 w-[360px] shadow-lg relative">
      <h2 className="text-xl font-bold mb-3 text-yellow-400 tracking-wide">
        Inventory
      </h2>

      {/* Inventory Grid */}
      <div className="grid grid-cols-6 gap-2">
        {inventory.map((item) => (
          <div
            key={item.itemId}
            className="relative w-12 h-12 bg-gray-800 border border-gray-700 rounded flex items-center justify-center cursor-pointer hover:border-yellow-400"
            onMouseEnter={() => setHoverItem(item.itemId)}
            onMouseLeave={() => setHoverItem(null)}
          >
            {/* Item Icon */}
            {item.icon ? (
              <img
                src={item.icon}
                alt={item.name}
                className="w-10 h-10 object-contain pointer-events-none"
              />
            ) : (
              <div className="text-gray-500 text-xs">?</div>
            )}

            {/* Quantity Badge */}
            {item.qty > 1 && (
              <div className="absolute bottom-0 right-0 bg-black bg-opacity-70 px-1 text-xs rounded">
                {item.qty}
              </div>
            )}

            {/* Tooltip */}
            {hoverItem === item.itemId && (
              <div className="absolute z-50 left-14 top-0 bg-gray-900 border border-gray-700 p-2 rounded shadow-xl w-40 pointer-events-none">
                <div className="font-bold text-yellow-300">{item.name}</div>
                <div className="text-gray-400 text-xs mt-1">
                  Item ID: {item.itemId}
                </div>
                <div className="text-gray-400 text-xs">Qty: {item.qty}</div>
              </div>
            )}
          </div>
        ))}

        {/* Empty Slots (optional) */}
        {Array.from({ length: Math.max(0, 36 - inventory.length) }).map(
          (_, i) => (
            <div
              key={`empty-${i}`}
              className="w-12 h-12 bg-gray-900 border border-gray-800 rounded"
            />
          )
        )}
      </div>
    </div>
  );
}
