// server/src/mappers/WorldConfigSettingDtoMapper.ts

import { WorldConfigSetting } from "@prisma/client";
import { WorldConfigSettingDto } from "shared";

export function toWorldConfigSettingDto(model: WorldConfigSetting): WorldConfigSettingDto {
  return {
    id: model.id,
    worldConfigId: model.worldConfigId,
    name: model.name,
    value: model.value,
    createdAt: model.createdAt.getTime(),
    updatedAt: model.updatedAt.getTime(),
  };
}

export function toWorldConfigSettingDtoList(models: WorldConfigSetting[]): WorldConfigSettingDto[] {
  return models.map(toWorldConfigSettingDto);
}
