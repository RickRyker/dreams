// server/src/events/EventRewardService.ts

import {prisma} from "@prisma";
import { RewardType } from '@prisma/client';
import { WebSocketHub } from './WebSocketHub';

export class EventRewardService {
  constructor(private hub: WebSocketHub) {}

  async preview(playerId: string, slug: string) {
    const event = await prisma.event.findUnique({
      where: { slug },
      include: { rewards: true },
    });

    if (!event) throw new Error('Event not found');

    const participation = await prisma.eventParticipation.findUnique({
      where: { eventId_playerId: { eventId: event.id, playerId } },
    });

    const rewards = await Promise.all(
      event.rewards.map(async (r) => {
        switch (r.rewardType) {
          case RewardType.ITEM: {
            const item = r.itemId ? await prisma.item.findUnique({ where: { id: r.itemId } }) : null;
            return { type: 'ITEM', amount: r.amount, item };
          }
          case RewardType.RECIPE: {
            const recipe = r.recipeId ? await prisma.recipe.findUnique({ where: { id: r.recipeId } }) : null;
            return { type: 'RECIPE', recipe };
          }
          case RewardType.XP_BOOST:
          case RewardType.DROP_RATE:
            return { type: r.rewardType, value: r.value };
          case RewardType.TITLE:
            return { type: 'TITLE', title: r.title };
        }
      })
    );

    return {
      event: { slug: event.slug, name: event.name },
      alreadyClaimed: participation?.rewardClaimed ?? false,
      rewards,
    };
  }

  async claim(playerId: string, slug: string) {
    const event = await prisma.event.findUnique({
      where: { slug },
      include: { rewards: true },
    });

    if (!event) throw new Error('Event not found');

    let participation = await prisma.eventParticipation.findUnique({
      where: { eventId_playerId: { eventId: event.id, playerId } },
    });

    if (!participation) {
      participation = await prisma.eventParticipation.create({
        data: {
          eventId: event.id,
          playerId,
          progress: {},
          completed: false,
          rewardClaimed: false,
        },
      });
    }

    if (participation.rewardClaimed) {
      throw new Error('Already claimed');
    }

    const applied: any[] = [];

    for (const r of event.rewards) {
      switch (r.rewardType) {
        case RewardType.ITEM:
          if (r.itemId && r.amount) {
            await prisma.inventoryItem.create({
              data: { playerId, itemId: r.itemId, quantity: r.amount },
            });
            applied.push({ type: 'ITEM', itemId: r.itemId, amount: r.amount });
          }
          break;

        case RewardType.RECIPE:
          if (r.recipeId) {
            await prisma.playerRecipe.upsert({
              where: { playerId_recipeId: { playerId, recipeId: r.recipeId } },
              update: {},
              create: { playerId, recipeId: r.recipeId },
            });
            applied.push({ type: 'RECIPE', recipeId: r.recipeId });
          }
          break;

        case RewardType.TITLE:
          if (r.title) {
            const title = await prisma.title.create({
              data: {
                slug: `${slug}-${playerId}-${Date.now()}`,
                name: r.title,
                description: `Granted by event ${event.name}`,
                isGrantable: true,
              },
            });

            await prisma.playerTitle.create({
              data: { playerId, titleId: title.id },
            });

            applied.push({ type: 'TITLE', title: r.title });
          }
          break;

        case RewardType.XP_BOOST:
        case RewardType.DROP_RATE:
          applied.push({ type: r.rewardType, value: r.value });
          break;
      }
    }

    await prisma.eventParticipation.update({
      where: { eventId_playerId: { eventId: event.id, playerId } },
      data: { rewardClaimed: true },
    });

    // 🔔 Push realtime event
    await this.hub.pushToPlayer(playerId, {
      type: 'EVENT_REWARD_CLAIMED',
      event: slug,
      rewards: applied,
    });

    return { event: slug, applied };
  }
}
