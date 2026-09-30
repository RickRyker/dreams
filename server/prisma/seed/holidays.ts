// server/prisma/seed/holidays.ts

import {EventType, PrismaClient, RewardType} from '@prisma/client';

type HolidayReward = {
  rewardType: RewardType,
  itemSlug?: string,
  recipeSlug?: string,
  questSlug?: string,
  title?: string,
  value?: number,
  amount?: number,
};

type HolidaySeed = {
  slug: string;
  name: string;
  description: string;
  type: EventType;
  isHoliday: boolean;
  startsAt: string;
  endsAt: string;
  isActive: boolean;
  rewards: HolidayReward[];
};

const HOLIDAYS: HolidaySeed[] = [
  {
    slug: 'origin-day',
    name: 'Origin Day',
    description: 'The day the Dreams engine first went online.',
    type: EventType.HOLIDAY,
    isHoliday: true,
    startsAt: '2026-05-15T00:00:00Z',
    endsAt: '2026-05-16T00:00:00Z',
    isActive: false,
    rewards: [
      { rewardType: RewardType.ITEM, itemSlug: 'iron-sword', amount: 1 },
      { rewardType: RewardType.XP_BOOST, value: 0.2 },
      { rewardType: RewardType.RECIPE, recipeSlug: 'bread-standard' },
    ],
  },
  {
    slug: 'agent-arrival',
    name: 'Agent Arrival',
    description: 'Commemorating the introduction of the first chat agent.',
    type: EventType.HOLIDAY,
    isHoliday: true,
    startsAt: '2026-04-10T00:00:00Z',
    endsAt: '2026-04-10T23:59:59Z',
    isActive: false,
    rewards: [
      { rewardType: RewardType.DROP_RATE, value: 0.15 },
      { rewardType: RewardType.ITEM, itemSlug: 'silver-stiletto', amount: 1 },
      { rewardType: RewardType.TITLE, title: 'The First Listener' },
    ],
  },
];

export async function seedHolidays(prisma: PrismaClient): Promise<void> {
  for (const event of HOLIDAYS) {
    const createdEvent = await prisma.event.upsert({
      where: { slug: event.slug },
      update: {
        name: event.name,
        description: event.description,
        type: event.type,
        isHoliday: event.isHoliday,
        startsAt: new Date(event.startsAt),
        endsAt: new Date(event.endsAt),
        isActive: event.isActive,
        createdById: 'system',
      },
      create: {
        slug: event.slug,
        name: event.name,
        description: event.description,
        type: event.type,
        isHoliday: event.isHoliday,
        startsAt: new Date(event.startsAt),
        endsAt: new Date(event.endsAt),
        isActive: event.isActive,
        createdById: 'system',
      },
    });

    for (const reward of event.rewards) {
      switch (reward.rewardType) {
        case RewardType.ITEM: {
          const item = await prisma.item.findUnique({
            where: { slug: reward.itemSlug },
          });
          if (!item) break;

          await prisma.eventReward.create({
            data: {
              eventId: createdEvent.id,
              rewardType: reward.rewardType,
              itemId: item.id,
              amount: reward.amount,
            },
          });
          break;
        }

        case RewardType.RECIPE: {
          const recipe = await prisma.recipe.findUnique({
            where: { slug: reward.recipeSlug },
          });
          if (!recipe) break;

          await prisma.eventReward.create({
            data: {
              eventId: createdEvent.id,
              rewardType: reward.rewardType,
              recipeId: recipe.id,
            },
          });
          break;
        }

        case RewardType.XP_BOOST:
        case RewardType.DROP_RATE: {
          await prisma.eventReward.create({
            data: {
              eventId: createdEvent.id,
              rewardType: reward.rewardType,
              value: reward.value,
            },
          });
          break;
        }

        case RewardType.TITLE: {
          await prisma.eventReward.create({
            data: {
              eventId: createdEvent.id,
              rewardType: reward.rewardType,
              title: reward.title,
            },
          });
          break;
        }
      }
    }
  }

  console.log('Holidays + rewards seeded.');
}
