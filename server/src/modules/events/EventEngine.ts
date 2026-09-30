// server/src/modules/events/EventEngine.ts

import {prisma} from "@prisma";
import {RewardType} from '@prisma/client';

export async function applyEventRewards(playerId: string, eventSlug: string) {
  // 1. Load event
  const event = await prisma.event.findUnique({
    where: { slug: eventSlug },
    include: { rewards: true },
  });

  if (!event) {
    throw new Error(`Event '${eventSlug}' not found`);
  }

  if (!event.isActive) {
    throw new Error(`Event '${eventSlug}' is not active`);
  }

  // 2. Ensure participation row exists
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

  // 3. Prevent duplicate claims
  if (participation.rewardClaimed) {
    throw new Error(`Rewards for '${eventSlug}' already claimed`);
  }

  // 4. Apply rewards
  const applied: any[] = [];

  for (const reward of event.rewards) {
    switch (reward.rewardType) {
      case RewardType.ITEM: {
        if (!reward.itemId || !reward.amount) break;

        await prisma.inventoryItem.create({
          data: {
            playerId,
            itemId: reward.itemId,
            quantity: reward.amount,
          },
        });

        applied.push({
          type: 'ITEM',
          itemId: reward.itemId,
          amount: reward.amount,
        });
        break;
      }

      case RewardType.RECIPE: {
        if (!reward.recipeId) break;

        await prisma.playerRecipe.upsert({
          where: {
            playerId_recipeId: {
              playerId,
              recipeId: reward.recipeId,
            },
          },
          update: {},
          create: {
            playerId,
            recipeId: reward.recipeId,
          },
        });

        applied.push({
          type: 'RECIPE',
          recipeId: reward.recipeId,
        });
        break;
      }

      case RewardType.XP_BOOST:
      case RewardType.DROP_RATE: {
        applied.push({
          type: reward.rewardType,
          value: reward.value,
        });

        // These are runtime buffs — you can store them in PlayerVariables or apply immediately
        break;
      }

      case RewardType.TITLE: {
        if (!reward.title) break;

        // Titles in your schema require a Title row, so this is a “custom title”
        const title = await prisma.title.create({
          data: {
            slug: `${event.slug}-${playerId}-${Date.now()}`,
            name: reward.title,
            description: `Granted by event ${event.name}`,
            isGrantable: true,
          },
        });

        await prisma.playerTitle.create({
          data: {
            playerId,
            titleId: title.id,
          },
        });

        applied.push({
          type: 'TITLE',
          title: reward.title,
        });
        break;
      }

      default:
        console.warn(`Unhandled reward type: ${reward.rewardType}`);
    }
  }

  // 5. Mark rewards claimed
  await prisma.eventParticipation.update({
    where: { eventId_playerId: { eventId: event.id, playerId } },
    data: { rewardClaimed: true },
  });

  // 6. Return applied rewards for UI
  return {
    event: event.slug,
    applied,
  };
}
