// client/src/state/gameStateTypes.ts

export interface TargetState {
  id: string;
  name: string;
  hp: number;
  maxHp: number;
  level: number;
}

export interface ActiveEffect {
  id: string;
  name: string;
  icon?: string | null;
  remainingSeconds: number;
  isDebuff?: boolean;
}

export interface CombatLogEntry {
  id: number;
  text: string;
  timestamp: number;
}

export interface ChatMessage {
  id: number;
  channel: "system" | "global" | "local" | "guild";
  text: string;
}

export interface LootItem {
  id: string;
  name: string;
  qty: number;
  icon?: string | null;
}

export interface LootState {
  isOpen: boolean;
  items: LootItem[];
}

export interface DialogState {
  isOpen: boolean;
  npcName: string;
  text: string;
  options: { id: string; label: string }[];
}

export interface GameState {
  target: TargetState | null;
  effects: ActiveEffect[];
  combatLog: CombatLogEntry[];
  chat: ChatMessage[];
  loot: LootState;
  dialog: DialogState;
}
