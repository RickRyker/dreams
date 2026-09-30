// server/prisma/seed/titles.ts


import {PrismaClient, TitleDisplayType} from '@prisma/client';

export async function seedTitles(prisma: PrismaClient): Promise<void> {

  const TITLES = [
    { slug: 'lord', name: 'Lord', female: 'Lady', description: '', display: TitleDisplayType.PREFIX, isGrantable: false },
    { slug: 'king', name: 'King', female: 'Queen', description: '', display: TitleDisplayType.PREFIX, isGrantable: false },
    { slug: 'duke', name: 'Duke', female: 'Duchess', description: '', display: TitleDisplayType.PREFIX, isGrantable: false },
    { slug: 'earl', name: 'Earl', female: 'Countess', description: '', display: TitleDisplayType.PREFIX, isGrantable: false },
    { slug: 'count', name: 'Count', female: 'Countess', description: '', display: TitleDisplayType.PREFIX, isGrantable: false },
    { slug: 'baron', name: 'Baron', female: 'Baroness', description: '', display: TitleDisplayType.PREFIX, isGrantable: false },
    { slug: 'sir', name: 'Sir', female: 'Dame', description: '', display: TitleDisplayType.PREFIX, isGrantable: false },
    { slug: 'doctor', name: 'Doctor', female: 'Doctor', description: '', display: TitleDisplayType.PREFIX, isGrantable: false },
    { slug: 'elder', name: 'Elder', female: 'Elder', description: '', display: TitleDisplayType.PREFIX, isGrantable: false },
    { slug: 'slayer', name: 'Slayer', female: 'Slayer', description: '', display: TitleDisplayType.PREFIX, isGrantable: false },
    { slug: 'the', name: 'The', female: 'The', description: '', display: TitleDisplayType.PREFIX, isGrantable: false },
  ];
  for (const title of TITLES) {
    await prisma.title.upsert({
      where: { slug: title.slug },
      update: {},
      create: {
        slug: title.slug,
        name: title.name,
        female: title.female,
        description: title.slug,
        display: title.display,
        isGrantable: title.isGrantable,
      }
    });
  }
  const title = await prisma.title.findUnique({ where: { slug: 'duke' }});
  if (title) {
    const player = await prisma.player.findUnique({ where: { id: 'RYKER' } });
    if (player) {
      await prisma.playerTitle.upsert({
        where: { playerId_titleId: {
            playerId: player.id,
            titleId: title.id,
          } },
        update: {},
        create: { playerId: player.id, titleId: title.id },
      });
      await prisma.player.upsert({
        where: { id: player.id },
        update: { title: title.name },
        create: { title: title.name, accountId: player.accountId },
      });
    }
  }
  console.log('Titles seeded.');
}
