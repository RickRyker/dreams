// server/prisma/seed/world.ts


import { Map, PrismaClient, WorldConfig, WorldConfigSetting, WorldConfigSettingType } from '@prisma/client';

export async function seedWorld(prisma: PrismaClient): Promise<void> {

  const tutorial: Map | null = await prisma.map.findUnique({
    where: { id: 'tutorial' },
  });

  const worldConfig: WorldConfig = await prisma.worldConfig.upsert({
    where: { id: 'default-config' },
    update: {
      name: 'Dreams of Nowhere Else and Beyond',
    },
    create: {
      id: 'default-config',
      name: 'Dreams of Nowhere Else and Beyond',
    }
  });

  type SettingSeed = {
    name: WorldConfigSettingType;
    value: string;
  };

  const DATA: SettingSeed[] = [
    { name: WorldConfigSettingType.BUFFER_SIZE, value: '10' },
    { name: WorldConfigSettingType.BYPASS_MAINTENANCE, value: 'false' },
    { name: WorldConfigSettingType.GHOST_DURATION_MINUTES, value: '2' },
    { name: WorldConfigSettingType.IS_MAINTENANCE_MODE, value: 'false' },
    { name: WorldConfigSettingType.LOG_SIZE_LIMIT_BYTES, value: '1000000' },
    { name: WorldConfigSettingType.LOG_PRUNE_DAYS, value: '7' },
    { name: WorldConfigSettingType.MAINTENANCE_START, value: '03:00' },
  //{ name: WorldConfigSettingType.MAINTENANCE_END, value: '03:00' },
    { name: WorldConfigSettingType.MIN_LEVEL_CREATE_GUILD, value: '10' },
    { name: WorldConfigSettingType.MIN_LEVEL_JOIN_GUILD, value: '5' },
    { name: WorldConfigSettingType.SIMILARITY_THRESHOLD, value: '0.8' },
    { name: WorldConfigSettingType.TUTORIAL_MAP, value: tutorial?.id ?? "" },
    { name: WorldConfigSettingType.TUTORIAL_START_X, value: '32' },
    { name: WorldConfigSettingType.TUTORIAL_START_Y, value: '32' },
  ];

  for (const record of DATA) {
    const ability: WorldConfigSetting = await prisma.worldConfigSetting.upsert({
      where: { id: `${worldConfig.id}-${record.name}` },
      update: {
        name: record.name,
        value: record.value,
        worldConfigId: worldConfig.id,
      },
      create: {
        id: `${worldConfig.id}-${record.name}`,
        name: record.name,
        value: record.value,
        worldConfigId: worldConfig.id,
      }
    });
    console.log("World config setting: ", ability.name, ability.value);
  }
  console.log('World config data seeded.');
}

