// server/src/players/mappers/PlayerEquipmentMapper.ts


import { EquipmentDto } from "shared";

export class PlayerEquipmentMapper {
  static fromPrisma(model: any): EquipmentDto {
    return {
      slot: model.slotType,
      itemId: model.itemId ?? "",
      name: model.item?.item?.name ?? "",
      icon: null,
    };
  }
}
