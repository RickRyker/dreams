import { PlayerInfoPanel } from "./PlayerInfoPanel";
import { PlayerInventoryPanel } from "./PlayerInventoryPanel";
import { PlayerQuestLog } from "./PlayerQuestLog";
import { PlayerSkillsPanel } from "./PlayerSkillsPanel";
import { PlayerStatsPanel } from "./PlayerStatsPanel";
import { PlayerJournalPanel } from "./PlayerJournalPanel";
import { PlayerAchievementsPanel } from "./PlayerAchievementsPanel";
import { PlayerPanelWindow } from "./PlayerPanelWindow";
import { usePlayerPanels } from "../../state/PlayerPanelsContext";
import { PLAYER_PANELS_BY_ID, type PlayerPanelId } from "../../state/playerPanels";

function renderPanelContent(panelId: PlayerPanelId) {
  switch (panelId) {
    case "info":
      return <PlayerInfoPanel />;
    case "inventory":
      return <PlayerInventoryPanel />;
    case "quests":
      return <PlayerQuestLog />;
    case "skills":
      return <PlayerSkillsPanel />;
    case "stats":
      return <PlayerStatsPanel />;
    case "journal":
      return <PlayerJournalPanel />;
    case "achievements":
      return <PlayerAchievementsPanel />;
  }
}

export function PlayerPanelsLayer() {
  const { openPanels, panelOrder, focusedPanel, closePanel, focusPanel } = usePlayerPanels();

  const visiblePanels = panelOrder.filter((panelId) => openPanels[panelId]);

  if (visiblePanels.length === 0) return null;

  return (
    <div className="absolute inset-0 pointer-events-none">
      {visiblePanels.map((panelId, index) => {
        const config = PLAYER_PANELS_BY_ID[panelId];
        return (
          <PlayerPanelWindow
            key={panelId}
            title={config.title}
            top={config.position.top}
            left={config.position.left}
            width={config.position.width}
            zIndex={40 + index}
            isFocused={focusedPanel === panelId}
            onFocus={() => focusPanel(panelId)}
            onClose={() => closePanel(panelId)}
          >
            {renderPanelContent(panelId)}
          </PlayerPanelWindow>
        );
      })}
    </div>
  );
}
