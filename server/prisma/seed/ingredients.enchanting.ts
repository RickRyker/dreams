// server/prisma/seed/ingredients.enchanting.ts

import {fx, seedItemFunction, ItemSeed} from './items';
import {ItemType, MaterialType, PrismaClient} from "@prisma/client";

const seedName: string = 'Enchanting Ingredient';

// ---------------------------------------------------------------------------
// SEED FUNCTION
// ---------------------------------------------------------------------------
export async function seedEnchantingIngredients(prisma: PrismaClient): Promise<void> {
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
  // ENCHANTING — SCROLL  (T2 – T3)
  // ══════════════════════════════════════════════════════════════════════════
  {
    slug: 'scroll_fireball', name: 'Scroll of Fireball',
    description: 'A parchment scribed in flame-orange ink. Releases a single devastating fireball on use.',
    itemType: ItemType.SCROLL, materialType: MaterialType.NONE,
    weight: 0.1, cost: 200, buyPrice: 360, sellPrice: 80,
    toHitBonus: 0, statEffects: fx(0, 0, 2, 0, 0, 10),         // INT+2 MP+10
  },
  {
    slug: 'scroll_frost_shield', name: 'Scroll of Frost Shield',
    description: 'Inscribed with glacial runes. Surrounds the caster in a shell of ice that absorbs damage.',
    itemType: ItemType.SCROLL, materialType: MaterialType.NONE,
    weight: 0.1, cost: 250, buyPrice: 450, sellPrice: 100,
    toHitBonus: 0, statEffects: fx(0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 3, 5), // CON+2 DR+3 SR+5
  },
  {
    slug: 'scroll_haste', name: 'Scroll of Haste',
    description: 'A scroll of silver ink on quickened vellum. Doubles the reader\'s movement and attack speed.',
    itemType: ItemType.SCROLL, materialType: MaterialType.NONE,
    weight: 0.1, cost: 300, buyPrice: 540, sellPrice: 120,
    toHitBonus: 0, statEffects: fx(0, 5, 0, 0, 0, 0, 3, 5),   // DEX+5 toHit+3 dodge+5
  },
  {
    slug: 'scroll_binding', name: 'Scroll of Binding',
    description: 'A grey scroll sealed with a lock rune. Binds a target in place for several seconds.',
    itemType: ItemType.SCROLL, materialType: MaterialType.NONE,
    weight: 0.1, cost: 400, buyPrice: 720, sellPrice: 160,
    toHitBonus: 0, statEffects: fx(0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3), // INT+3 SR+3
  },
  {
    slug: 'scroll_shatter', name: 'Scroll of Shatter',
    description: 'A vibrating scroll crackling with kinetic energy. Releases a cone of shattering force.',
    itemType: ItemType.SCROLL, materialType: MaterialType.NONE,
    weight: 0.1, cost: 350, buyPrice: 630, sellPrice: 140,
    toHitBonus: 0, statEffects: fx(3, 0, 0, 0, 0, 0, 0, 0, 5, 8), // STR+3 critChance+5 critDamage+8
  },
  {
    slug: 'scroll_divine_light', name: 'Scroll of Divine Light',
    description: 'A radiant scroll scribed in gold ink. Calls down a pillar of holy light that heals allies and burns undead.',
    itemType: ItemType.SCROLL, materialType: MaterialType.NONE,
    weight: 0.1, cost: 600, buyPrice: 1080, sellPrice: 240,
    toHitBonus: 0, statEffects: fx(0, 0, 5, 0, 50, 30, 0, 0, 0, 0, 0, 0, 8), // INT+5 HP+50 MP+30 SR+8
  },

];
