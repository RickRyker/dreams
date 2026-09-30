// server/src/players/services/PlayerEquipmentService.ts

import { PlayerEquipmentRepository } from "../repositories/PlayerEquipmentRepository";
import { PlayerEquipmentMapper } from "../mappers/PlayerEquipmentMapper";
import { EquipmentDto } from "shared";
import { PlayerEquipment, SlotType, InventoryItem, Item } from "@prisma/client";
import { prisma } from "../../db/client";

type PlayerEquipmentWithItem = PlayerEquipment & {
  item: (InventoryItem & { item: Item }) | null;
};

export class PlayerEquipmentService {
  constructor(private readonly repo: PlayerEquipmentRepository) {}

  async equip(playerId: string, slotType: SlotType, itemId: string): Promise<EquipmentDto> {
    const model: PlayerEquipment = await this.repo.equipItem(playerId, slotType, itemId);

    const withItem = await prisma.playerEquipment.findUnique({
      where: { id: model.id },
      include: {
        item: {
          include: {
            item: true,
          },
        },
      },
    });

    if (!withItem) {
      throw new Error("EQUIPMENT_NOT_FOUND_AFTER_EQUIP");
    }

    return PlayerEquipmentMapper.fromPrisma(withItem as PlayerEquipmentWithItem);
  }

  async unequip(equipmentId: string): Promise<void> {
    await this.repo.unequip(equipmentId);
  }

  async list(playerId: string): Promise<EquipmentDto[]> {
    const models = await prisma.playerEquipment.findMany({
      where: { playerId },
      include: {
        item: {
          include: {
            item: true,
          },
        },
      },
    });

    return models.map(m =>
      PlayerEquipmentMapper.fromPrisma(m as PlayerEquipmentWithItem),
    );
  }
}
