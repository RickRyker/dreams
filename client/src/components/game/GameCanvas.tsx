// client/src/components/game/GameCanvas.tsx
import { useEffect, useRef } from "react";
import { usePlayer } from "../../context/PlayerContext";
import { useGameState } from "../../state/GameStateContext";

export function GameCanvas() {
  const { player } = usePlayer();
  const {
    setTarget,
    addCombatLog,
    addEffect,
    openLoot,
    openDialog,
  } = useGameState();

  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Tab") {
        e.preventDefault();

        setTarget({
          id: "mob-1",
          name: "Dream Wisp",
          hp: 50,
          maxHp: 100,
          level: player?.level ?? 1,
        });

        addCombatLog("You target Dream Wisp.");
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [player, setTarget, addCombatLog]);

  const handleClick = () => {
    // Click-to-target
    setTarget({
      id: "mob-2",
      name: "Nightmare Fragment",
      hp: 80,
      maxHp: 120,
      level: (player?.level ?? 1) + 1,
    });

    addCombatLog("You target Nightmare Fragment.");

    // Add a buff
    addEffect({
      id: `buff-${Date.now()}-${Math.random()}`,
      name: "Focus",
      remainingSeconds: 10,
      isDebuff: false,
    });

    // Open loot window
    openLoot([
      { id: "loot-1", name: "Shimmering Dust", qty: 2 },
      { id: "loot-2", name: "Torn Page", qty: 1 },
    ]);

    // Open NPC mappers
    openDialog({
      isOpen: true,
      npcName: "Whispering Shade",
      text: "Do you remember why you came here?",
      options: [
        { id: "1", label: "No... tell me." },
        { id: "2", label: "I don't want to remember." },
      ],
    });
  };

  if (!player) return null;

  return (
    <div
      ref={containerRef}
      className="w-full h-full bg-gray-950 relative"
      id="game-canvas"
      onClick={handleClick}
    >
      {!player.mapId && (
        <div className="absolute inset-0 flex items-center justify-center text-sm text-gray-500 pointer-events-none">
          World loaded for {player.name}, but no map is assigned yet.
        </div>
      )}
    </div>
  );
}
