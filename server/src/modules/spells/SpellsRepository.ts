// server/src/modules/spells/SpellsRepository.ts

import { Prisma } from '@prisma/client';
import { prisma } from "@prisma";
import { SpellDTO, PlayerSpellDTO } from './types.js';

export class SpellsRepository {
  async inTransaction<T>(fn: (tx: Prisma.TransactionClient) => Promise<T>) {
    return prisma.$transaction(fn);
  }

  async listAllSpells(tx?: Prisma.TransactionClient): Promise<SpellDTO[]> {
    const client = tx || prisma;
    return client.spell.findMany() as Promise<SpellDTO[]>;
  }

  async getSpellById(spellId: string, tx?: Prisma.TransactionClient): Promise<SpellDTO | null> {
    const client = tx || prisma;
    return client.spell.findUnique({ where: { id: spellId } }) as Promise<SpellDTO | null>;
  }

  async listPlayerSpells(playerId: string, tx?: Prisma.TransactionClient): Promise<PlayerSpellDTO[]> {
    const client = tx || prisma;
    return client.playerSpell.findMany({
      where: { playerId },
      include: { spell: true }
    }) as Promise<PlayerSpellDTO[]>;
  }

  async learnSpell(playerId: string, spellId: string, tx?: Prisma.TransactionClient): Promise<PlayerSpellDTO> {
    const client = tx || prisma;
    return client.playerSpell.create({
      data: { playerId, spellId, count: 1 },
      include: { spell: true }
    }) as Promise<PlayerSpellDTO>;
  }

  async unlearnSpell(playerId: string, spellId: string, tx?: Prisma.TransactionClient): Promise<any> {
    const client = tx || prisma;
    const existing = await client.playerSpell.findUnique({
      where: { playerId_spellId: { playerId, spellId } }
    });
    if (!existing) return null;
    return client.playerSpell.delete({ where: { id: existing.id } });
  }

  async checkPlayerKnowsSpell(playerId: string, spellId: string, tx?: Prisma.TransactionClient): Promise<boolean> {
    const client = tx || prisma;
    const existing = await client.playerSpell.findUnique({
      where: { playerId_spellId: { playerId, spellId } }
    });
    return !!existing;
  }
}

