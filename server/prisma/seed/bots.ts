// server/prisma/seed/bots.ts


import {PrismaClient} from '@prisma/client';

export async function seedChatBots(prisma: PrismaClient): Promise<void> {
  const BOTS = [
    {
      name: 'Glum',
      triggerName: 'Glum',
      priority: 1,
      responses: [
        { pattern: 'hello|hi|hey', replies: ['Hi, I guess.', 'Oh, it is you.'] },
        { pattern: 'help|quest|where', replies: ['Look it up yourself.', 'I am not a map.', 'Maybe ask someone who cares?'] },
        { pattern: '.*', replies: ['...sigh...', 'Can we not?', 'I am busy doing nothing.'] }
      ]
    }
  ];

  for (const bot of BOTS) {
    // 1. Upsert ChatBot (JSON responses stored directly)
    const createdBot = await prisma.chatBot.upsert({
      where: { name: bot.name },
      update: {
        triggerName: bot.triggerName,
        isActive: true,
        responses: {
          deleteMany: {}, // wipe old nested responses
          create: bot.responses.map(r => ({
            pattern: r.pattern,
            replies: r.replies
          }))
        }
      },
      create: {
        name: bot.name,
        triggerName: bot.triggerName,
        isActive: true,
        responses: {
          create: bot.responses.map(r => ({
            pattern: r.pattern,
            replies: r.replies
          }))
        }
      }
    });
    //
    // // 2. Remove old relational responses
    // await prisma.chatBotResponse.deleteMany({
    //   where: { chatBotId: createdBot.id }
    // });
    //
    // // 3. Insert relational responses
    // for (const response of bot.responses) {
    //   await prisma.chatBotResponse.create({
    //     data: {
    //       chatBotId: createdBot.id,
    //       pattern: response.pattern,
    //       replies: response.replies
    //     }
    //   });
    // }
    console.log(`Chat bot ${createdBot.name} created`);
  }

  console.log('Chat bots seeded.');
}
