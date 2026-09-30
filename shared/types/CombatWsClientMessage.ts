// shared/types/CombatWsClientMessage.ts

export type CombatWsClientMessage =
  | { type: "SET_LAST_SEQ"; combatId: string; lastSeq: number };
