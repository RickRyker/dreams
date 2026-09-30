// server/src/modules/spells/spells.service.ts

import { SpellsService as SpellsServiceClass } from "./SpellsService";
import { SpellsRepository } from "./SpellsRepository";

const service = new SpellsServiceClass(new SpellsRepository());

export const listSpells = async () => service.listAllSpells();
export const getSpellById = async (spellId: string) => service.getSpellById(spellId);
export const listPlayerSpells = async (playerId: string) => service.listPlayerSpells(playerId);
export const learnSpell = async (playerId: string, spellId: string) => service.learnSpell(playerId, spellId);
export const unlearnSpell = async (playerId: string, spellId: string) => service.unlearnSpell(playerId, spellId);

export { SpellsService } from "./SpellsService";
