// server/src/modules/world/world.service.ts

import { WorldConfigSettingType } from '@prisma/client';
import { prisma } from "@prisma";
import { AppError } from '../../errors/AppError.js';

export const getWorldConfig = async () => {
  return prisma.worldConfig.findFirst({
    include: {
      settings: true
    }
  });
};

export const getSetting = async (name: WorldConfigSettingType) => {
  return prisma.worldConfigSetting.findFirst({
    where: { name }
  });
};

export const updateSetting = async (name: WorldConfigSettingType, value: string) => {
  const config = await prisma.worldConfig.findFirst();
  if (!config) throw new AppError('World config not found', 500);

  const existing = await prisma.worldConfigSetting.findFirst({
    where: {
      worldConfigId: config.id,
      name
    }
  });

  if (existing) {
    return prisma.worldConfigSetting.update({
      where: { id: existing.id },
      data: { value }
    });
  }

  return prisma.worldConfigSetting.create({
    data: {
      worldConfigId: config.id,
      name,
      value
    }
  });
};

export const toggleMaintenanceMode = async (enabled: boolean) => {
  const config = await prisma.worldConfig.findFirst();
  if (!config) throw new AppError('World config not found', 500);

  const name = WorldConfigSettingType.IS_MAINTENANCE_MODE;
  const value = enabled ? 'true' : 'false';
  const existing = await prisma.worldConfigSetting.findFirst({
    where: {
      worldConfigId: config.id,
      name
    }
  });

  if (existing) {
    return prisma.worldConfigSetting.update({
      where: { id: existing.id },
      data: { value }
    });
  }

  return prisma.worldConfigSetting.create({
    data: {
      worldConfigId: config.id,
      name,
      value
    }
  });
};
