// server/prisma/seed/players.ts


import { Account, GenderType, Player, PrismaClient } from '@prisma/client';

export async function seedPlayers(prisma: PrismaClient): Promise<void> {

  const system: Account | null = await prisma.account.findUnique({
    where: { email: 'system@dreams-of-nowhere.com' },
  });
  if (system) {
    const systemPlayer: Player = await prisma.player.upsert({
      where: {accountId_name: {accountId: system.id, name: 'system'}},
      update: {},
      create: {
        id: system.id,
        name: 'system',
        accountId: system.id,
        gender: GenderType.OTHER
      }
    });
    console.log("Created player " + JSON.stringify(systemPlayer));
  }

  const admin: Account | null = await prisma.account.findUnique({
    where: { email: 'admin@dreams-of-nowhere.com' },
  });
  if (admin) {
    const adminPlayer: Player = await prisma.player.upsert({
      where: { accountId_name: { accountId: admin.id, name: 'admin' } },
      update: {},
      create: {
        id: admin.id,
        name: 'admin',
        accountId: admin.id,
        gender: GenderType.OTHER
      }
    });
    console.log("Created player " + JSON.stringify(adminPlayer));
  }

  const ryker: Account | null = await prisma.account.findUnique({
    where: { email: 'rick.ryker@gmail.com' },
  });
  if (ryker) {
    const rykerPlayer: Player = await prisma.player.upsert({
      where: { accountId_name: { accountId: ryker.id, name: 'Kerrik' } },
      update: {},
      create: {
      id: ryker.id,
        name: 'Kerrik',
        accountId: ryker.id,
        gender: GenderType.MALE
      }
    });
    console.log("Created player " + JSON.stringify(rykerPlayer));
  }

  console.log('First players seeded.');
}
