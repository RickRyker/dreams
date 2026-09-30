// server/src/modules/spells/types.ts


export interface SpellDTO {
  id: string;
  name: string;
  description?: string | null;
  manaCost: number;
  level?: number | null;
}

export interface PlayerSpellDTO {
  id: string;
  playerId: string;
  spellId: string;
  count: number;
  spell: SpellDTO;
}

export interface LearnSpellRequest {
  spellId: string;
}
