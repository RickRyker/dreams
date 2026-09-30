// server/src/combat/services/CombatEventService.ts

import {PrismaClient} from "@prisma/client";
import {prisma as prismaClient} from "@prisma";
import {CombatEventRepository} from "../repositories/CombatEventRepository";
import {CombatAssembler} from "../assemblers/CombatAssembler";
import { CombatLogEntryDto } from "shared";

export class CombatEventService {
  constructor(
    private readonly prisma: PrismaClient = prismaClient,
    private readonly repo: CombatEventRepository = new CombatEventRepository(prismaClient),
  ) {}

  listByCombat(combatId: string): Promise<CombatLogEntryDto[]> {
    return this.repo.listByCombat(combatId).then((entries) => entries.map(CombatAssembler.toLogEntryDto));
  }

  deleteByCombat(combatId: string): Promise<void> {
    return this.repo.deleteByCombat(combatId);
  }
}
