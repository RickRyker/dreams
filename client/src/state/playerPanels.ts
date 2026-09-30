// client/src/state/playerPanels.ts

export type PlayerPanelId =
  | "info"
  | "inventory"
  | "quests"
  | "skills"
  | "stats"
  | "journal"
  | "achievements";

export interface PlayerPanelDefinition {
  id: PlayerPanelId;
  label: string;
  title: string;
  shortcut: string;
  position: {
    top: number;
    left: number;
    width: number;
  };
}

export const PLAYER_PANEL_DEFINITIONS: readonly PlayerPanelDefinition[] = [
  {
    id: "info",
    label: "Character",
    title: "Character Info",
    shortcut: "c",
    position: { top: 100, left: 40, width: 360 },
  },
  {
    id: "stats",
    label: "Stats",
    title: "Player Stats",
    shortcut: "t",
    position: { top: 100, left: 430, width: 360 },
  },
  {
    id: "inventory",
    label: "Inventory",
    title: "Inventory",
    shortcut: "i",
    position: { top: 100, left: 820, width: 400 },
  },
  {
    id: "skills",
    label: "Skills",
    title: "Skills & Spells",
    shortcut: "k",
    position: { top: 280, left: 40, width: 360 },
  },
  {
    id: "quests",
    label: "Quests",
    title: "Quest Log",
    shortcut: "q",
    position: { top: 280, left: 430, width: 390 },
  },
  {
    id: "journal",
    label: "Journal",
    title: "Journal",
    shortcut: "j",
    position: { top: 280, left: 850, width: 400 },
  },
  {
    id: "achievements",
    label: "Achievements",
    title: "Achievements",
    shortcut: "h",
    position: { top: 460, left: 430, width: 420 },
  },
] as const;

export const PLAYER_PANEL_IDS: readonly PlayerPanelId[] =
  PLAYER_PANEL_DEFINITIONS.map((panel) => panel.id);

export const PLAYER_PANELS_BY_ID: Record<PlayerPanelId, PlayerPanelDefinition> =
  PLAYER_PANEL_DEFINITIONS.reduce<Record<PlayerPanelId, PlayerPanelDefinition>>(
    (acc, panel) => {
      acc[panel.id] = panel;
      return acc;
    },
    {} as Record<PlayerPanelId, PlayerPanelDefinition>
  );
