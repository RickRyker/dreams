// server/prisma/seed/eggs.ts

import { ElementType, ItemActionType, ItemType, MaterialType, PrismaClient, QualityType, SlotType } from "@prisma/client";
import {fx} from "./items";
import {type} from "node:os";

export async function seedEggs(prisma: PrismaClient): Promise<void> {
  const pets = await prisma.petType.findMany();
  for (const pet of pets) {
    const eggSlug = pet.name.toLowerCase().replace(' ','-') + '-egg';
    const eggName = pet.name + ' Egg';
    const eggDesc = 'Egg that might hatch into a/an ' + pet.name;
    const item = await prisma.item.upsert({
      where: {slug: eggSlug},
      update: {
        name: eggName,
        description: eggDesc,
        type: ItemType.PET,
        slot: SlotType.NONE,
        element: ElementType.NONE,
        material: MaterialType.ORGANIC,
        weight: 1,
        baseCost: 0,
        buyPrice: 0,
        sellPrice: 0,
        fragility: 0,
        toHitBonus: 0,
        minLevel: 1,
        maxLevel: 800,
        decayRate: 1,
        canBeBroken: false,
        canOverrideCollision: false,
        // effects: null,
        spellSlug: null,
        action: ItemActionType.NONE,
        statEffects: fx(),
        quality: QualityType.D,
      },
      create: {
        slug: eggSlug,
        name: eggName,
        description: eggDesc,
        type: ItemType.PET,
        slot: SlotType.NONE,
        element: ElementType.NONE,
        material: MaterialType.ORGANIC,
        weight: 1,
        baseCost: 0,
        buyPrice: 0,
        sellPrice: 0,
        fragility: 0,
        toHitBonus: 0,
        minLevel: 1,
        maxLevel: 800,
        decayRate: 1,
        canBeBroken: false,
        canOverrideCollision: false,
        // effects: null,
        spellSlug: null,
        action: ItemActionType.NONE,
        statEffects: fx(),
        quality: QualityType.D,
      },
    });
    console.log(`  ✅ [Pet Egg] ${item.name.padEnd(36)}`);
  }
  console.log('Pet Eggs seeded from Pets.');
}
