// server/prisma/seed/avatars.ts


import {PrismaClient} from '@prisma/client';

export async function seedAvatars(prisma: PrismaClient): Promise<void> {

  let system: any = await prisma.account.findUnique({
    where: { email: 'system@dreams-of-nowhere.com' },
  });
  if (!system) {
    system = { id: 'system' };
  }

  const avatars = [
    { name: 'Default', description: 'Default avatar of a new player.', s3Key: 'assets/avatars/default.png' },
    { name: 'Male Default', description: 'Male avatar of a new player.', s3Key: 'assets/avatars/male_default.png' },
    { name: 'Female Default', description: 'Female avatar of a new player.', s3Key: 'assets/avatars/female_default.png' },
    { name: 'Archer', description: 'An archer.', s3Key: 'assets/avatars/archer.png' },
    { name: 'Beastmaster', description: 'A beastmaster.', s3Key: 'assets/avatars/beastmaster.png' },
    { name: 'Cavalier', description: 'A cavalier.', s3Key: 'assets/avatars/cavalier.png' },
    { name: 'Cook', description: 'A cook.', s3Key: 'assets/avatars/cook.png' },
    { name: 'Mage', description: 'A mage.', s3Key: 'assets/avatars/mage.png' },
    { name: 'Marauder', description: 'A marauder.', s3Key: 'assets/avatars/marauder.png' },
    { name: 'Rogue', description: 'A rogue.', s3Key: 'assets/avatars/rogue.png' },
    { name: 'Wizard', description: 'A wizard.', s3Key: 'assets/avatars/wizard.png' },
  ];

  for (const avatar of avatars) {
    await prisma.avatar.upsert({
      where: { accountId_name: { accountId: system.id, name: avatar.name } },
      update: {},
      create: { name: avatar.name, s3Key: avatar.s3Key, description: avatar.description, accountId: system.id, creatorId: system.id },
    });
  }

  console.log('Avatar types seeded.');
}
