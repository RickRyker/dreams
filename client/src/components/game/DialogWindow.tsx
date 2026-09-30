// client/src/components/game/DialogWindow.tsx

import { useGameState } from "../../state/GameStateContext";
import type { DialogState } from "../../state/gameStateTypes";

export function DialogWindow() {
  const { state, closeDialog, addCombatLog } = useGameState();
  const dialog = state.dialog;

  if (!dialog.isOpen) return null;

  const onSelect = (id: string) => {
    addCombatLog(`You selected dialog option: ${id}`);
    closeDialog();
  };

  return (
    <div className="absolute inset-0 flex items-end justify-center pointer-events-none">
      <div className="w-[600px] bg-black bg-opacity-90 border border-gray-700 rounded p-4 mb-10 pointer-events-auto">
        <div className="text-lg font-bold text-cyan-300 mb-2">
          {dialog.npcName}
        </div>
        <div className="text-sm text-gray-200 mb-4">{dialog.text}</div>
        <div className="space-y-1">
          {dialog.options.map((o: DialogState["options"][number]) => (
            <button
              key={o.id}
              onClick={() => onSelect(o.id)}
              className="block w-full text-left text-sm text-gray-200 hover:text-cyan-300"
            >
              {o.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
