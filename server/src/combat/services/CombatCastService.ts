// server/src/combat/services/CombatCastService.ts

import {CombatCast, PrismaClient} from "@prisma/client";
import {prisma as prismaClient} from "@prisma";
import {CastSpellRequestSchema} from "@shared/index";
import { CombatAssembler } from "../assemblers/CombatAssembler";
import { CombatCastDto } from "shared";

// TEMPORARY — until AbilityRegistry is wired in
function getAbilityCastTime(spellSlug: string): number {
  return 1500; // default 1.5s cast time
}

export class CombatCastService {
  constructor(private readonly prisma: PrismaClient = prismaClient) {}

  async getCast(id: string): Promise<CombatCastDto | null> {
    return this.prisma.combatCast.findUnique({ where: { id } }).then((row) => row ? CombatAssembler.toCastDto(row) : null);
  }

  async listByCombat(combatId: string): Promise<CombatCastDto[]> {
    return this.prisma.combatCast.findMany({ where: { combatId } }).then((rows) => rows.map(CombatAssembler.toCastDto));
  }

  async listByCaster(casterId: string): Promise<CombatCastDto[]> {
    return this.prisma.combatCast.findMany({ where: { casterId } }).then((rows) => rows.map(CombatAssembler.toCastDto));
  }

  async deleteCast(id: string) {
    await this.prisma.combatCast.delete({ where: { id } });
  }

  async castSpell(body: unknown): Promise<CombatCast> {
    const parsed: any = CastSpellRequestSchema.parse(body);
    const { combatId, casterId, spellSlug, targetId } = parsed;

    // Server computes cast time
    const castTimeMs: number = getAbilityCastTime(spellSlug); // e.g. 1500
    const startedAt: Date = new Date();
    const endsAt: Date = new Date(startedAt.getTime() + castTimeMs);

    return this.prisma.combatCast.create({
      data: {
        combatId,
        casterId,
        spellSlug,
        participantId: targetId ?? undefined,
        startedAt,
        endsAt,
      },
    });
  }
}
