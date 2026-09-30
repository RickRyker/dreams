// shared/types/CombatClientMessage.ts


export type CombatClientMessage =
  | {
  type: "SUBSCRIBE_COMBAT";
  combatId: string;
}
  | {
  type: "UNSUBSCRIBE_COMBAT";
  combatId: string;
}
  | {
  type: "SET_LAST_SEQ";
  combatId: string;
  lastSeq: number;
};
