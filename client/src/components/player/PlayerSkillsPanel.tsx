// client/src/components/player/PlayerSkillsPanel.tsx
import { useState } from "react";
import { usePlayer } from "../../context/PlayerContext";

function entryName(entry: Record<string, unknown>): string {
  const candidates = [entry.name, entry.slug, entry.skillSlug, entry.spellSlug, entry.id];
  for (const candidate of candidates) {
    if (typeof candidate === "string" && candidate.trim().length > 0) return candidate;
  }
  return "Unknown";
}

function entryKey(entry: Record<string, unknown>, fallback: string): string {
  const candidates = [entry.id, entry.slug, entry.skillSlug, entry.spellSlug, entry.name];
  for (const candidate of candidates) {
    if (typeof candidate === "string" && candidate.trim().length > 0) return candidate;
  }
  return fallback;
}

export function PlayerSkillsPanel() {
  const { player } = usePlayer();
  const [hoverId, setHoverId] = useState<string | null>(null);

  if (!player) {
    return (
      <div className="text-gray-400 p-4 bg-black border border-gray-700 rounded">
        Loading skills...
      </div>
    );
  }

  return (
    <div className="bg-black text-white border border-gray-700 rounded p-4 w-[300px] shadow-lg relative">
      <h2 className="text-xl font-bold mb-3 text-blue-400 tracking-wide">
        Skills & Spells
      </h2>

      <div className="space-y-3">
        {/* Spells */}
        <div>
          <div className="text-sm text-gray-400 mb-1">Spells</div>
          {player.spells.length === 0 && (
            <div className="text-gray-600 text-xs">No spells learned</div>
          )}

          {player.spells.map((spell, index) => {
            const spellRecord = spell as Record<string, unknown>;
            const spellId = entryKey(spellRecord, `spell-${index}`);
            const spellName = entryName(spellRecord);
            const spellLevel =
              typeof spellRecord.level === "number" ? spellRecord.level : 1;

            return (
            <div
              key={spellId}
              className="p-2 bg-gray-900 border border-gray-700 rounded cursor-pointer hover:border-blue-400"
              onMouseEnter={() => setHoverId(spellId)}
              onMouseLeave={() => setHoverId(null)}
            >
              <div className="flex justify-between">
                <span>{spellName}</span>
                <span className="text-blue-300">Lv {spellLevel}</span>
              </div>

              {hoverId === spellId && (
                <div className="absolute z-50 left-72 bg-gray-900 border border-gray-700 p-2 rounded shadow-xl w-40 pointer-events-none">
                  <div className="font-bold text-blue-300">{spellName}</div>
                  <div className="text-gray-400 text-xs mt-1">
                    Spell ID: {spellId}
                  </div>
                </div>
              )}
            </div>
            );
          })}
        </div>

        {/* Skills */}
        <div>
          <div className="text-sm text-gray-400 mb-1">Skills</div>
          {player.skills.length === 0 && (
            <div className="text-gray-600 text-xs">No skills learned</div>
          )}

          {player.skills.map((skill, index) => {
            const skillRecord = skill as Record<string, unknown>;
            const skillId = entryKey(skillRecord, `skill-${index}`);
            const skillName = entryName(skillRecord);
            const skillLevel =
              typeof skillRecord.level === "number" ? skillRecord.level : 1;

            return (
            <div
              key={skillId}
              className="p-2 bg-gray-900 border border-gray-700 rounded cursor-pointer hover:border-green-400"
              onMouseEnter={() => setHoverId(skillId)}
              onMouseLeave={() => setHoverId(null)}
            >
              <div className="flex justify-between">
                <span>{skillName}</span>
                <span className="text-green-300">Lv {skillLevel}</span>
              </div>

              {hoverId === skillId && (
                <div className="absolute z-50 left-72 bg-gray-900 border border-gray-700 p-2 rounded shadow-xl w-40 pointer-events-none">
                  <div className="font-bold text-green-300">{skillName}</div>
                  <div className="text-gray-400 text-xs mt-1">
                    Skill ID: {skillId}
                  </div>
                </div>
              )}
            </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
