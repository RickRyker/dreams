// client/src/components/hud/Hotbar.tsx
import {usePlayer} from "../../context/PlayerContext";
import {useGameState} from "../../state/GameStateContext";

function getAbilityName(ability: Record<string, unknown>): string {
  const candidates = [
    ability.name,
    ability.slug,
    ability.skillSlug,
    ability.spellSlug,
    ability.id,
  ];

  for (const candidate of candidates) {
    if (typeof candidate === "string" && candidate.trim().length > 0) {
      return candidate;
    }
  }

  return "Ability";
}

export function Hotbar() {
  const { player } = usePlayer();
  const { addCombatLog, addEffect } = useGameState();

  if (!player) return null;

  const abilities = [...(player.spells ?? []), ...(player.skills ?? [])].slice(0, 10);

  const activateAbility = (abilityName: string) => {
    addCombatLog(`You use ${abilityName}.`);
    addEffect({
      id: `buff-${Date.now()}`,
      name: `${abilityName} Buff`,
      remainingSeconds: 5,
      isDebuff: false,
    });
  };

  return (
    <div
      className="absolute left-1/2 -translate-x-1/2 pointer-events-auto"
      style={{ bottom: 32 }}
    >
      <div className="flex gap-1 bg-gray-900 bg-opacity-80 border border-gray-700 rounded px-2 py-1">
        {Array.from({ length: 10 }).map((_, i) => {
          const ability = abilities[i];
          const abilityName = ability ? getAbilityName(ability as Record<string, unknown>) : "";
          return (
            <button
              key={i}
              onClick={() => ability && activateAbility(abilityName)}
              className="w-10 h-10 bg-black border border-gray-700 rounded flex items-center justify-center text-xs text-gray-400 hover:border-cyan-400"
            >
              {ability ? abilityName[0] : i + 1}
            </button>
          );
        })}
      </div>
    </div>
  );
}
