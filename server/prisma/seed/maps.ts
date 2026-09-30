// server/prisma/seed/maps.ts

import {PrismaClient} from '@prisma/client';

export async function seedMaps(prisma: PrismaClient): Promise<void> {

  await prisma.map.upsert({
    where: { id: 'tutorial' },
    update: {
      name: 'Tutorial Island',
      description: 'A simple tutorial map for new players.',
      isSystemMap: true,
      creatorId: 'system',
      width: 256,
      height: 256,
      s3JsonUrl: 'maps/tutorial.json',
      s3BitmaskUrl: 'maps/tutorial-bitmask.png',
      wildLifeTypes: ['BEES', 'BIRDS', 'BUTTERFLIES'],
      wildLifeColors: ['blue', 'green', '0xFF0000'],
    },
    create: {
      id: 'tutorial',
      name: 'Tutorial Island',
      description: 'A simple tutorial map for new players.',
      isSystemMap: true,
      creatorId: 'system',
      width: 256,
      height: 256,
      s3JsonUrl: 'maps/tutorial.json',
      s3BitmaskUrl: 'maps/tutorial-bitmask.png',
      wildLifeTypes: ['BEES', 'BIRDS', 'BUTTERFLIES'],
      wildLifeColors: ['blue', 'green', '0xFF0000'],
    },
  });

}
