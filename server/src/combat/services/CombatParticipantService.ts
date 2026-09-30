// server/src/combat/services/CombatParticipantService.ts

import {PrismaClient} from "@prisma/client";
import {prisma as prismaClient} from "@prisma";
import { CombatAssembler } from "../assemblers/CombatAssembler";
import { CombatParticipantDto } from "shared";

export class CombatParticipantService {
  constructor(private readonly prisma: PrismaClient = prismaClient) {}

  async listParticipants(combatId: string): Promise<CombatParticipantDto[]> {
    return this.prisma.combatParticipant.findMany({where: {combatId}}).then((rows) => rows.map(CombatAssembler.toParticipantDto));
  }

  async getParticipant(participantId: string): Promise<CombatParticipantDto | null> {
    return this.prisma.combatParticipant.findUnique({where: {id: participantId}}).then((row) => row ? CombatAssembler.toParticipantDto(row) : null);
  }

  async deleteParticipant(id: string) {
    await this.prisma.combatParticipant.delete({where: {id}});
  }

  async deleteParticipantsForCombat(combatId: string) {
    await this.prisma.combatParticipant.deleteMany({where: {combatId}});
  }
}
