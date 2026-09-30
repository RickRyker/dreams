// server/src/modules/spells/spells.controller.ts

import {
  listSpells,
  getSpellById,
  listPlayerSpells,
  learnSpell,
  unlearnSpell
} from './spells.service.js';
import { AppError } from '../../errors/AppError.js';

export const listSpellsController = async () => {
  return listSpells();
};

export const getSpellController = async (spellId: string) => {
  const spell = await getSpellById(spellId);
  if (!spell) throw new AppError('Spell not found', 404);
  return spell;
};

export const listPlayerSpellsController = async (playerId: string) => {
  return listPlayerSpells(playerId);
};

export const learnSpellController = async (playerId: string, spellId: string) => {
  return learnSpell(playerId, spellId);
};

export const unlearnSpellController = async (playerId: string, spellId: string) => {
  return unlearnSpell(playerId, spellId);
};
