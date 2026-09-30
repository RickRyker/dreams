// client/src/components/CharacterSheetPanel.tsx

import { PlayerInfoPanel } from "./player/PlayerInfoPanel";
import { PlayerStatsPanel } from "./player/PlayerStatsPanel";
import { PlayerInventoryPanel } from "./player/PlayerInventoryPanel";
import { PlayerEquipmentPanel } from "./player/PlayerEquipmentPanel";
import { PlayerSkillsPanel } from "./player/PlayerSkillsPanel";
import { PlayerPetsPanel } from "./player/PlayerPetsPanel";
import { PlayerMessagesPanel } from "./player/PlayerMessagesPanel";
import { PlayerQuestLog } from "./player/PlayerQuestLog";
import { PlayerJournalPanel } from "./player/PlayerJournalPanel";
import { PlayerAchievementsPanel } from "./player/PlayerAchievementsPanel";

export default function CharacterSheet() {
  return (
    <div className="flex gap-6 p-6 bg-black text-white">
      <div className="flex flex-col gap-4">
        <PlayerInfoPanel />
        <PlayerStatsPanel />
      </div>

      <PlayerEquipmentPanel />

      <PlayerInventoryPanel />

      <div className="flex flex-col gap-4">
        <PlayerSkillsPanel />
        <PlayerPetsPanel />
        <PlayerMessagesPanel />
        <PlayerQuestLog />
        <PlayerJournalPanel />
        <PlayerAchievementsPanel />
      </div>
    </div>
  );
}
