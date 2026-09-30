// server/prisma/seed/ingredients.tools.ts

import {fx, seedItemFunction, ItemSeed} from './items';
import {ItemType, MaterialType, PrismaClient} from "@prisma/client";

const seedName: string = 'Tool Making Ingredients';

// ---------------------------------------------------------------------------
// SEED FUNCTION
// ---------------------------------------------------------------------------
export async function seedToolMakingIngredients(prisma: PrismaClient): Promise<void> {
  await seedItemFunction(prisma, seedName, data);
}

// ---------------------------------------------------------------------------
// ITEM DATA
// Covers: Smithing · Woodworking · Leatherworking · Alchemy · Enchanting
// Pricing: sellPrice = cost × 0.40 | buyPrice = cost × 1.80
// fx() arg order: STR, DEX, INT, CON, HP, MP, toHit, dodge,
//   critChance, critDamage, critResistance, DR, SR, fatigue, hunger, thirst
//
// Tier reference (cost):
//   T1 Starter    0 -       5
//   T2 Common     5 –      50  T3 Uncommon      50 – 500
//   T4 Rare     500 –   2 500  T5 Super Rare 2 500 – 10 000
//   T6 Epic  10 000 –  50 000  T7 Legendary 50 000 – 500 000
//   T8 Mythical 500 000 – 5 M  T9 Godly        5 M – 50 M
// ---------------------------------------------------------------------------
const data: ItemSeed[] = [

  // ══════════════════════════════════════════════════════════════════════════
  // TOOLS & ACCESSORIES  (T2 – T4)
  // ══════════════════════════════════════════════════════════════════════════
  {
    slug: 'iron_pickaxe', name: 'Iron Pickaxe',
    description: 'A sturdy iron-headed pickaxe. Required for mining iron and stone deposits.',
    itemType: ItemType.TOOL, materialType: MaterialType.METAL,
    weight: 3.0, cost: 120, buyPrice: 216, sellPrice: 48,
    toHitBonus: 2, statEffects: fx(2),                          // STR+2
  },
  {
    slug: 'steel_pickaxe', name: 'Steel Pickaxe',
    description: 'A sharp-headed steel pickaxe. Can chip mithril ore that shatters iron TOOL.',
    itemType: ItemType.TOOL, materialType: MaterialType.METAL,
    weight: 3.0, cost: 800, buyPrice: 1440, sellPrice: 320,
    toHitBonus: 4, statEffects: fx(4),                          // STR+4
  },
  {
    slug: 'jewelers_ring_iron', name: 'Iron Jeweller\'s Ring',
    description: 'A simple iron band set with a polished river gem. Beginner jewellery with modest luck.',
    itemType: ItemType.RING, materialType: MaterialType.METAL,
    weight: 0.05, cost: 150, buyPrice: 270, sellPrice: 60,
    toHitBonus: 0, statEffects: fx(0, 2, 0, 0, 0, 0, 0, 0, 2), // DEX+2 critChance+2
  },
  {
    slug: 'jewelers_ring_mithril', name: 'Mithril Jeweller\'s Ring',
    description: 'A finely worked mithril ring set with a cut sapphire. Amplifies perception and precision.',
    itemType: ItemType.RING, materialType: MaterialType.METAL,
    weight: 0.05, cost: 4500, buyPrice: 8100, sellPrice: 1800,
    toHitBonus: 0, statEffects: fx(0, 5, 3, 0, 0, 0, 0, 0, 5, 8), // DEX+5 INT+3 critChance+5 critDamage+8
  },
  {
    slug: 'amulet_of_focus', name: 'Amulet of Focus',
    description: 'A pendant of quartz crystal suspended in darksteel wire. Sharpens arcane concentration.',
    itemType: ItemType.PENDANT, materialType: MaterialType.NONE,
    weight: 0.1, cost: 2000, buyPrice: 3600, sellPrice: 800,
    toHitBonus: 0, statEffects: fx(0, 0, 5, 0, 0, 60, 0, 0, 0, 0, 0, 0, 4), // INT+5 MP+60 SR+4
  },

];
