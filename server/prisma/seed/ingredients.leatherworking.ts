// server/prisma/seed/ingredients.leatherworking.ts

import {fx, seedItemFunction, ItemSeed} from './items';
import {ItemType, MaterialType, PrismaClient} from "@prisma/client";

const seedName: string = 'Alchemical Ingredient';

// ---------------------------------------------------------------------------
// SEED FUNCTION
// ---------------------------------------------------------------------------
export async function seedLeatherWorkingIngredients(prisma: PrismaClient): Promise<void> {
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
  // LEATHERWORKING — HIDES & LEATHER  (T1 – T6)
  // ══════════════════════════════════════════════════════════════════════════
  {
    slug: 'rough_leather', name: 'Rough Leather',
    description: 'Untreated hide scraped and dried. Stiff and scratchy but serviceable.',
    itemType: ItemType.INGREDIENT, materialType: MaterialType.LEATHER,
    weight: 0.5, cost: 40, buyPrice: 72, sellPrice: 16,
    toHitBonus: 0, statEffects: fx(),
  },
  {
    slug: 'tanned_leather', name: 'Tanned Leather',
    description: 'Hide cured in oak-bark tannin. Supple, strong, and ready for cutting.',
    itemType: ItemType.INGREDIENT, materialType: MaterialType.LEATHER,
    weight: 0.5, cost: 150, buyPrice: 270, sellPrice: 60,
    toHitBonus: 0, statEffects: fx(),
  },
  {
    slug: 'reinforced_leather', name: 'Reinforced Leather',
    description: 'Double-layered hide backed with metal studs. Significantly tougher than standard leather.',
    itemType: ItemType.INGREDIENT, materialType: MaterialType.LEATHER,
    weight: 0.6, cost: 600, buyPrice: 1080, sellPrice: 240,
    toHitBonus: 0, statEffects: fx(),
  },
  {
    slug: 'shadowhide', name: 'Shadowhide',
    description: 'The rare pelt of a shadow-panther, naturally matte and noise-absorbing.',
    itemType: ItemType.INGREDIENT, materialType: MaterialType.LEATHER,
    weight: 0.4, cost: 5000, buyPrice: 9000, sellPrice: 2000,
    toHitBonus: 0, statEffects: fx(),
  },
  {
    slug: 'celestial_hide', name: 'Celestial Hide',
    description: 'The luminous skin of a celestial beast. Warm to the touch, never rots, faintly divine.',
    itemType: ItemType.INGREDIENT, materialType: MaterialType.LEATHER,
    weight: 0.3, cost: 75000, buyPrice: 135000, sellPrice: 30000,
    toHitBonus: 0, statEffects: fx(),
  },

  // ══════════════════════════════════════════════════════════════════════════
  // LEATHERWORKING — ARMOR  (T2 – T5)
  // ══════════════════════════════════════════════════════════════════════════
  {
    slug: 'leather_vest', name: 'Leather Vest',
    description: 'A close-fitting vest of tanned leather. Light enough to run in, tough enough to matter.',
    itemType: ItemType.ARMOR, materialType: MaterialType.LEATHER,
    weight: 2.0, cost: 80, buyPrice: 144, sellPrice: 32,
    toHitBonus: 0, statEffects: fx(0, 2, 0, 0, 20, 0, 0, 2, 0, 0, 0, 1),
    // DEX+2 HP+20 dodge+2 DR+1
  },
  {
    slug: 'reinforced_vest', name: 'Reinforced Vest',
    description: 'A studded leather vest with iron-plate inserts. Balances mobility with real protection.',
    itemType: ItemType.ARMOR, materialType: MaterialType.LEATHER,
    weight: 2.5, cost: 700, buyPrice: 1260, sellPrice: 280,
    toHitBonus: 0, statEffects: fx(0, 3, 0, 0, 50, 0, 0, 4, 0, 0, 2, 2),
    // DEX+3 HP+50 dodge+4 critResistance+2 DR+2
  },
  {
    slug: 'shadowhide_cuirass', name: 'Shadowhide Cuirass',
    description: 'A cuirass of shadow-panther hide. Near-invisible in dim light. Rogues pay extortionate prices.',
    itemType: ItemType.ARMOR, materialType: MaterialType.LEATHER,
    weight: 2.2, cost: 12000, buyPrice: 21600, sellPrice: 4800,
    toHitBonus: 0, statEffects: fx(0, 8, 0, 0, 100, 0, 0, 8, 0, 0, 5, 4, 3),
    // DEX+8 HP+100 dodge+8 critResistance+5 DR+4 SR+3
  },

  // ══════════════════════════════════════════════════════════════════════════
  // SMITHING — SHIELD  (T2 – T5)
  // ══════════════════════════════════════════════════════════════════════════
  {
    slug: 'iron_shield', name: 'Iron Shield',
    description: 'A round iron shield, battered but effective. Standard defensive kit for militia.',
    itemType: ItemType.SHIELD, materialType: MaterialType.METAL,
    weight: 4.0, cost: 100, buyPrice: 180, sellPrice: 40,
    toHitBonus: 0, statEffects: fx(0, 0, 0, 1, 20, 0, 0, 2, 0, 0, 2, 2),
    // CON+1 HP+20 dodge+2 critResistance+2 DR+2
  },
  {
    slug: 'steel_shield', name: 'Steel Shield',
    description: 'A kite-shaped steel shield with a reinforced boss. Deflects arrows and blades alike.',
    itemType: ItemType.SHIELD, materialType: MaterialType.METAL,
    weight: 4.0, cost: 700, buyPrice: 1260, sellPrice: 280,
    toHitBonus: 0, statEffects: fx(0, 0, 0, 2, 50, 0, 0, 3, 0, 0, 4, 4),
    // CON+2 HP+50 dodge+3 critResistance+4 DR+4
  },
  {
    slug: 'mithril_shield', name: 'Mithril Shield',
    description: 'An elegant mithril tower shield. Heavy enough to stop a warhammer, light enough to sprint with.',
    itemType: ItemType.SHIELD, materialType: MaterialType.METAL,
    weight: 3.0, cost: 5000, buyPrice: 9000, sellPrice: 2000,
    toHitBonus: 0, statEffects: fx(0, 0, 0, 4, 100, 0, 0, 5, 0, 0, 7, 7),
    // CON+4 HP+100 dodge+5 critResistance+7 DR+7
  },
  {
    slug: 'void_bulwark', name: 'Void Bulwark',
    description: 'A shield of solid void-metal. Spells that strike it are partially absorbed into nothingness.',
    itemType: ItemType.SHIELD, materialType: MaterialType.METAL,
    weight: 3.5, cost: 45000, buyPrice: 81000, sellPrice: 18000,
    toHitBonus: 0, statEffects: fx(0, 0, 0, 6, 180, 0, 0, 6, 0, 0, 10, 10, 8),
    // CON+6 HP+180 dodge+6 critResistance+10 DR+10 SR+8
  },

  // -------------------------
  // LEATHERWORKING INGREDIENT
  // -------------------------
  { slug: "raw_hide", name: "Raw Hide", description: "Untreated animal hide.",
    itemType: ItemType.INGREDIENT, materialType: MaterialType.LEATHER,
    weight: 1, cost: 3, buyPrice: 6, sellPrice: 1, toHitBonus: 0,
    statEffects: fx() },

  { slug: "leather_strip", name: "Leather Strip", description: "Cut leather strip.",
    itemType: ItemType.MATERIAL, materialType: MaterialType.LEATHER,
    weight: 0.2, cost: 2, buyPrice: 4, sellPrice: 1, toHitBonus: 0,
    statEffects: fx() },

  { slug: "thread", name: "Thread", description: "Basic sewing thread.",
    itemType: ItemType.INGREDIENT, materialType: MaterialType.FIBER,
    weight: 0.05, cost: 1, buyPrice: 2, sellPrice: 0, toHitBonus: 0,
    statEffects: fx() },

  { slug: "leather_armor", name: "Leather Armor", description: "Light leather armor.",
    itemType: ItemType.ARMOR, materialType: MaterialType.LEATHER,
    weight: 6, cost: 25, buyPrice: 50, sellPrice: 10, toHitBonus: 0,
    statEffects: fx(1,1,0,2, 15,0, 0,1, 0,0,0, 2,1, 0,0,0) },

  { slug: "leather_boot", name: "Leather Boot", description: "Light leather boot.",
    itemType: ItemType.ARMOR, materialType: MaterialType.LEATHER,
    weight: 2, cost: 12, buyPrice: 24, sellPrice: 5, toHitBonus: 0,
    statEffects: fx(0,1,0,1, 5,0, 0,2, 0,0,0, 1,1, 0,0,0) },

  { slug: "quiver", name: "Quiver", description: "A leather quiver for arrows.",
    itemType: ItemType.MATERIAL, materialType: MaterialType.LEATHER,
    weight: 1, cost: 8, buyPrice: 16, sellPrice: 3, toHitBonus: 0,
    statEffects: fx() },

];
