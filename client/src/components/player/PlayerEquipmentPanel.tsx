// client/src/components/player/PlayerEquipmentPanel.tsx
import { useState } from "react";
import { usePlayer } from "../../context/PlayerContext";

const EQUIPMENT_SLOTS = [
  "Head",
  "Chest",
  "Legs",
  "Feet",
  "Hands",
  "Weapon",
  "Offhand",
  "Accessory1",
  "Accessory2",
];

export function PlayerEquipmentPanel() {
  const { player } = usePlayer();
  const [hoverSlot, setHoverSlot] = useState<string | null>(null);

  if (!player) {
    return (
      <div className="text-gray-400 p-4 bg-black border border-gray-700 rounded">
        Loading equipment...
      </div>
    );
  }

  const equipmentMap = new Map(
    player.equipment.map((eq) => [eq.slot, eq])
  );

  return (
    <div className="bg-black text-white border border-gray-700 rounded p-4 w-[300px] shadow-lg relative">
      <h2 className="text-xl font-bold mb-3 text-purple-400 tracking-wide">
        Equipment
      </h2>

      <div className="grid grid-cols-2 gap-3">
        {EQUIPMENT_SLOTS.map((slot) => {
          const item = equipmentMap.get(slot);

          return (
            <div
              key={slot}
              className="relative bg-gray-900 border border-gray-700 rounded p-2 h-16 flex items-center justify-center cursor-pointer hover:border-purple-400"
              onMouseEnter={() => setHoverSlot(slot)}
              onMouseLeave={() => setHoverSlot(null)}
            >
              {/* Icon */}
              {item?.icon ? (
                <img
                  src={item.icon}
                  alt={item.name}
                  className="w-10 h-10 object-contain pointer-events-none"
                />
              ) : (
                <div className="text-gray-600 text-xs">{slot}</div>
              )}

              {/* Tooltip */}
              {hoverSlot === slot && item && (
                <div className="absolute z-50 left-32 top-0 bg-gray-900 border border-gray-700 p-2 rounded shadow-xl w-40 pointer-events-none">
                  <div className="font-bold text-purple-300">{item.name}</div>
                  <div className="text-gray-400 text-xs mt-1">
                    Slot: {slot}
                  </div>
                  <div className="text-gray-400 text-xs">
                    Item ID: {item.itemId}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
