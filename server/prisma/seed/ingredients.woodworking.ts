// server/prisma/seed/ingredients.woodworking.ts

import {fx, seedItemFunction, ItemSeed} from './items';
import {ItemType, MaterialType, PrismaClient} from "@prisma/client";

const seedName: string = 'Woodworking Ingredients';

// ---------------------------------------------------------------------------
// SEED FUNCTION
// ---------------------------------------------------------------------------
export async function seedWoodworkingIngredients(prisma: PrismaClient): Promise<void> {
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
  // WOODWORKING — TIMBER  (T1 – T6)
  // ══════════════════════════════════════════════════════════════════════════

  {
    slug: 'oak_plank', name: 'Oak Plank',
    description: 'A sturdy plank of common oak. The first timber any carpenter learns to cut.',
    itemType: ItemType.MATERIAL, materialType: MaterialType.WOOD,
    weight: 2.0, cost: 20, buyPrice: 36, sellPrice: 8,
    toHitBonus: 0, statEffects: fx(),
  },
  {
    slug: 'ashwood_plank', name: 'Ashwood Plank',
    description: 'Tight-grained ash timber with excellent flex. Preferred for BOW and handles.',
    itemType: ItemType.MATERIAL, materialType: MaterialType.WOOD,
    weight: 2.0, cost: 500, buyPrice: 900, sellPrice: 200,
    toHitBonus: 0, statEffects: fx(),
  },
  {
    slug: 'ironbark_plank', name: 'Ironbark Plank',
    description: 'Wood harder than most iron. Sawing it blunts standard blades immediately.',
    itemType: ItemType.MATERIAL, materialType: MaterialType.WOOD,
    weight: 2.5, cost: 2000, buyPrice: 3600, sellPrice: 800,
    toHitBonus: 0, statEffects: fx(),
  },
  {
    slug: 'darkwood_plank', name: 'Darkwood Plank',
    description: 'A sleek, near-black timber from ancient groves. Carries enchantments without resistance.',
    itemType: ItemType.MATERIAL, materialType: MaterialType.WOOD,
    weight: 1.8, cost: 3500, buyPrice: 6300, sellPrice: 1400,
    toHitBonus: 0, statEffects: fx(),
  },
  {
    slug: 'voidwood_plank', name: 'Voidwood Plank',
    description: 'Timber from trees grown in the void-tainted Ashwood Barrens. Absorbs spell residue.',
    itemType: ItemType.MATERIAL, materialType: MaterialType.METAL,
    weight: 1.5, cost: 25000, buyPrice: 45000, sellPrice: 10000,
    toHitBonus: 0, statEffects: fx(),
  },
  {
    slug: 'celestial_plank', name: 'Celestial Plank',
    description: 'Wood from the World-Tree\'s fallen branches. Every plank still pulses with life.',
    itemType: ItemType.MATERIAL, materialType: MaterialType.UNKNOWN,
    weight: 1.2, cost: 80000, buyPrice: 144000, sellPrice: 32000,
    toHitBonus: 0, statEffects: fx(),
  },

  // ══════════════════════════════════════════════════════════════════════════
  // WOODWORKING — BOW & STAFF  (T2 – T6)
  // ══════════════════════════════════════════════════════════════════════════
  {
    slug: 'oak_shortbow', name: 'Oak Shortbow',
    description: 'A simple short bow of bent oak. Ideal for scouts and hunters on the move.',
    itemType: ItemType.BOW, materialType: MaterialType.WOOD,
    weight: 1.2, cost: 90, buyPrice: 162, sellPrice: 36,
    toHitBonus: 5, statEffects: fx(0, 3, 0, 0, 0, 0, 5, 0, 3),
    // DEX+3 toHit+5 critChance+3
  },
  {
    slug: 'ash_longbow', name: 'Ash Longbow',
    description: 'A tall longbow of taut ashwood. Greater range and power than the shortbow.',
    itemType: ItemType.BOW, materialType: MaterialType.DUST,
    weight: 1.5, cost: 600, buyPrice: 1080, sellPrice: 240,
    toHitBonus: 8, statEffects: fx(0, 5, 0, 0, 0, 0, 8, 0, 4, 5),
    // DEX+5 toHit+8 critChance+4 critDamage+5
  },
  {
    slug: 'darkwood_recurve', name: 'Darkwood Recurve',
    description: 'A recurved bow of darkwood. Arrows loosed from it fly silent and true.',
    itemType: ItemType.BOW, materialType: MaterialType.WOOD,
    weight: 1.3, cost: 4000, buyPrice: 7200, sellPrice: 1600,
    toHitBonus: 13, statEffects: fx(0, 8, 0, 0, 0, 0, 13, 0, 8, 12),
    // DEX+8 toHit+13 critChance+8 critDamage+12
  },
  {
    slug: 'voidwood_bow', name: 'Voidwood Bow',
    description: 'A bow carved from voidwood. Arrows fired from it phase partially out of reality mid-flight.',
    itemType: ItemType.BOW, materialType: MaterialType.METAL,
    weight: 1.0, cost: 30000, buyPrice: 54000, sellPrice: 12000,
    toHitBonus: 20, statEffects: fx(0, 12, 4, 0, 0, 0, 20, 0, 12, 15, 0, 0, 4),
    // DEX+12 INT+4 toHit+20 critChance+12 critDamage+15 SR+4
  },
  {
    slug: 'oak_staff', name: 'Oak Staff',
    description: 'A plain oak walking staff trimmed for battle. Channels minor arcane energy.',
    itemType: ItemType.STAFF, materialType: MaterialType.WOOD,
    weight: 1.5, cost: 70, buyPrice: 126, sellPrice: 28,
    toHitBonus: 3, statEffects: fx(0, 0, 3, 0, 0, 20, 3),
    // INT+3 MP+20 toHit+3
  },
  {
    slug: 'ashwood_staff', name: 'Ashwood Staff',
    description: 'A slender ashwood staff tipped in polished crystal. A mage\'s reliable companion.',
    itemType: ItemType.STAFF, materialType: MaterialType.DUST,
    weight: 1.8, cost: 550, buyPrice: 990, sellPrice: 220,
    toHitBonus: 7, statEffects: fx(0, 0, 6, 0, 0, 50, 7, 0, 0, 0, 0, 0, 2),
    // INT+6 MP+50 toHit+7 SR+2
  },
  {
    slug: 'darkwood_staff', name: 'Darkwood Staff',
    description: 'A darkwood staff carved with sigil-runes. Holds additional spell charges between rests.',
    itemType: ItemType.STAFF, materialType: MaterialType.WOOD,
    weight: 1.6, cost: 3800, buyPrice: 6840, sellPrice: 1520,
    toHitBonus: 12, statEffects: fx(0, 0, 10, 0, 0, 80, 12, 0, 5, 8, 0, 0, 5),
    // INT+10 MP+80 toHit+12 critChance+5 critDamage+8 SR+5
  },
  {
    slug: 'celestial_staff', name: 'Celestial Staff',
    description: 'A staff of condensed starlight. Spells cast through it leave afterimages visible to gods.',
    itemType: ItemType.STAFF, materialType: MaterialType.UNKNOWN,
    weight: 1.4, cost: 130000, buyPrice: 234000, sellPrice: 52000,
    toHitBonus: 27, statEffects: fx(0, 0, 18, 0, 0, 200, 25, 0, 12, 20, 0, 0, 12),
    // INT+18 MP+200 toHit+25 critChance+12 critDamage+20 SR+12
  },


  // -------------------------
  // WOODWORKING INGREDIENTS
  // -------------------------
  { slug: "oak_log", name: "Oak Log", description: "A sturdy oak log.",
    itemType: ItemType.INGREDIENT, materialType: MaterialType.WOOD,
    weight: 2, cost: 3, buyPrice: 6, sellPrice: 1, toHitBonus: 0,
    statEffects: fx() },

  { slug: "oak_plank", name: "Oak Plank", description: "Processed oak plank.",
    itemType: ItemType.MATERIAL, materialType: MaterialType.WOOD,
    weight: 1, cost: 4, buyPrice: 8, sellPrice: 2, toHitBonus: 0,
    statEffects: fx() },

  { slug: "wood_handle", name: "Wood Handle", description: "A carved wooden handle.",
    itemType: ItemType.MATERIAL, materialType: MaterialType.WOOD,
    weight: 0.5, cost: 3, buyPrice: 6, sellPrice: 1, toHitBonus: 0,
    statEffects: fx() },

  { slug: "string", name: "String", description: "Strong crafting string.",
    itemType: ItemType.INGREDIENT, materialType: MaterialType.FIBER,
    weight: 0.1, cost: 1, buyPrice: 2, sellPrice: 0, toHitBonus: 0,
    statEffects: fx() },

  { slug: "bow", name: "Bow", description: "A basic wooden bow.",
    itemType: ItemType.BOW, materialType: MaterialType.WOOD,
    weight: 2, cost: 18, buyPrice: 36, sellPrice: 7, toHitBonus: 4,
    statEffects: fx(1,2,0,0, 0,0, 4,1, 0,0,0, 0,0, 0,0,0) },

  { slug: "wooden_shield", name: "Wooden Shield", description: "A simple wooden shield.",
    itemType: ItemType.ARMOR, materialType: MaterialType.WOOD,
    weight: 5, cost: 15, buyPrice: 30, sellPrice: 6, toHitBonus: -1,
    statEffects: fx(0,0,0,2, 10,0, -1,2, 0,0,0, 2,1, 0,0,0) },

  { slug: "staff", name: "Staff", description: "A wooden staff infused with magic.",
    itemType: ItemType.STAFF, materialType: MaterialType.WOOD,
    weight: 2, cost: 20, buyPrice: 40, sellPrice: 8, toHitBonus: 3,
    statEffects: fx(0,1,2,0, 0,10, 3,0, 0,0,0, 0,0, 0,0,0) },

];
