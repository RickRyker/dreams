// server/prisma/seed/profanity.ts


import {PrismaClient} from '@prisma/client';

export async function seedProfanity(prisma: PrismaClient): Promise<void> {

  const BAD_WORDS = [ 'bitch', 'damn', 'fuck', 'shit' ];

  for (const word of BAD_WORDS) {
    await prisma.profanityPattern.upsert({
      where: { pattern: word },
      update: {},
      create: { pattern: word, severity: 3 },
    });
  }

  console.log('Profanity patterns seeded.');
}
