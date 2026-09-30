// server/src/modules/world/world.controller.ts

import {
  getWorldConfig,
  getSetting,
  updateSetting,
  toggleMaintenanceMode
} from './world.service.js';
import { WorldConfigSettingType } from '@prisma/client';
import { AppError } from '../../errors/AppError.js';

export const getWorldConfigController = async () => {
  return getWorldConfig();
};

export const getSettingController = async (name: WorldConfigSettingType) => {
  const setting = await getSetting(name);
  if (!setting) throw new AppError('Setting not found', 404);
  return setting;
};

export const updateSettingController = async (name: WorldConfigSettingType, value: string) => {
  return updateSetting(name, value);
};

export const toggleMaintenanceController = async (enabled: boolean) => {
  return toggleMaintenanceMode(enabled);
};
