// server/src/players/repositories/PlayerEquipmentRepository.ts

import { prisma } from "../../db/client";
import { PlayerEquipment, SlotType } from "@prisma/client";

export class PlayerEquipmentRepository {
  /**
   * Equip an item into a specific slot.
   * Automatically unequips any existing item in that slot.
   */
  async equipItem(
    playerId: string,
    slotType: SlotType,
    itemId: string
  ): Promise<PlayerEquipment> {
    // Remove existing item in that slot
    await prisma.playerEquipment.deleteMany({
      where: { playerId, slotType },
    });

    return prisma.playerEquipment.create({
      data: {
        playerId,
        slotType,
        itemId,
      },
    });
  }

  /**
   * Unequip by equipment entry ID.
   */
  async unequip(id: string): Promise<void> {
    await prisma.playerEquipment.delete({ where: { id } });
  }

  /**
   * List all equipment for a player.
   */
  async list(playerId: string): Promise<PlayerEquipment[]> {
    return prisma.playerEquipment.findMany({
      where: { playerId },
      orderBy: { slotType: "asc" },
    });
  }
}
