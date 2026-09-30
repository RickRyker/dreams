// server/prisma/seed/items.ts

import { Item, ItemType, MaterialType, PrismaClient, Recipe } from '@prisma/client';

// ---------------------------------------------------------------------------
// MMO TIER SCALING REFERENCE
// ---------------------------------------------------------------------------
// Tier 0 - Starting    (wood/stone/cloth)   : cost          0 -          5
// Tier 1 - Basic       (wood/stone/cloth)   : cost          5 -         50
// Tier 2 – Common      (iron/wood/leather)  : cost         50 –        500
// Tier 3 – Uncommon    (steel/ash/bone)     : cost        500 –      2 500
// Tier 4 – Rare        (mithril/darkwood)   : cost      2 500 –     10 000
// Tier 5 – Super Rare  (adamantine/void)    : cost     10 000 –     50 000
// Tier 6 – Epic        (celestial/infernal) : cost     50 000 –    500 000
// Tier 7 – Legendary   (unknown)            : cost    500 000 –  5 000 000
// Tier 8 – Mythical    (unknown)            : cost  5 000 000 – 50 000 000
// Tier 9 - Godly       (unknown)            : cost 50 000 000 - ?
//
// toHitBonus  : flat integer % added to hit-chance roll    (1–35)
// statEffects : JSON object — all keys required, zero if unused
//   STR / DEX / INT / CON      : attribute deltas  (−10 … +30)
//   HP  / MP                   : flat pool bonuses (0 … +500)
//   toHit / dodge              : % bonuses          (0 … +25)
//   critChance / critDamage    : % bonuses          (0 … +40)
//   critResistance             : % reduction        (0 … +20)
//   DR  (Damage Reduction)     : flat points        (0 … +15)
//   SR  (Spell Resistance)     : flat points        (0 … +15)
// ---------------------------------------------------------------------------

export type StatEffects = {
  STR: number;
  DEX: number;
  INT: number;
  CON: number;
  HP: number;
  MP: number;
  toHit: number;
  dodge: number;
  critChance: number;
  critDamage: number;
  critResistance: number;
  DR: number;
  SR: number;
  fatigue: number;
  hunger: number;
  thirst: number;
};

export interface ItemSeed {
  slug: string;
  name: string;
  description: string;
  itemType: ItemType;
  materialType: MaterialType;
  weight: number;       // kg
  cost: number;         // base gold value
  buyPrice: number;     // vendor buy  (cost × markup)
  sellPrice: number;    // vendor sell (cost × 0.40)
  toHitBonus: number;   // integer %
  statEffects: StatEffects;
}

export interface RecipeSeed {
  slug: string
  name: string
  description: string
  skillSlug: string
  difficulty: number
  ingredients: any
  resultItemSlug: string   // <-- IMPORTANT: use slug, not ID
}

// ---------------------------------------------------------------------------
// HELPERS
// ---------------------------------------------------------------------------
export const fx = (
  STR = 0, DEX = 0, INT = 0, CON = 0,
  HP  = 0, MP  = 0,
  toHit = 0, dodge = 0,
  critChance = 0, critDamage = 0, critResistance = 0,
  DR = 0, SR = 0,
  fatigue = 0, hunger = 0, thirst = 0,
): StatEffects => ({
  STR, DEX, INT, CON, HP, MP, toHit, dodge,
  critChance, critDamage, critResistance, DR, SR,
  fatigue, hunger, thirst
});

export function getTierLabel(cost: number): string {
  if (cost < 5)        return 'T0 Starting  ';
  if (cost < 50)       return 'T1 Basic     ';
  if (cost < 500)      return 'T2 Common    ';
  if (cost < 2500)     return 'T3 Uncommon  ';
  if (cost < 10000)    return 'T4 Rare      ';
  if (cost < 50000)    return 'T5 Super Rare';
  if (cost < 500000)   return 'T6 Epic      ';
  if (cost < 5000000)  return 'T7 Legendary ';
  if (cost < 50000000) return 'T8 Mythical  ';
  return                      'T9 Godly     ';
}

export function blueprint(
  slug: string,
  name: string,
  skillSlug: string,
  difficulty: number,
  resultItemSlug: string,
  ingredients: any[]
): RecipeSeed {
  return {
    slug,
    name,
    description: `${name} Blueprint`,
    skillSlug,
    difficulty,
    ingredients,
    resultItemSlug,
  };
}

export function foodRecipe(
  slug: string,
  name: string,
  difficulty: number,
  resultItemSlug: string,
  ingredients: any[]
): RecipeSeed {
  return {
    slug,
    name,
    description: `${name} Recipe`,
    skillSlug: "cooking",
    difficulty,
    ingredients,
    resultItemSlug,
  };
}

// ---------------------------------------------------------------------------
// SEED FUNCTION
// ---------------------------------------------------------------------------
export async function seedItemFunction(prisma: PrismaClient, seedName: string, data: ItemSeed[]): Promise<void> {

  for (const item of data) {
    const slugName = item.slug.replace("-", "_");
    const result: Item = await prisma.item.upsert({
      where: { slug: slugName },
      update: {
        name:         item.name,
        description:  item.description,
        type:         item.itemType,
      //slot:         item.slot,
      //element:      item.element,
        material:     item.materialType,
        weight:       item.weight,
        baseCost:     item.cost,
        buyPrice:     item.buyPrice,
        sellPrice:    item.sellPrice,
      //fragility:    item.fragility,
        toHitBonus:   item.toHitBonus,
      //minLevel:     item.minLevel,
      //maxLevel:     item.maxLevel,
      //decayRate:    item.decayRate,
      //canBeBroken:  item.canBeBroken,
      //canOverrideCollision:item.canOverrideCollision,
      //effects:      item.effects,
      //spellSlug:    item.spellSlug,
      //action:       item.action,
        statEffects:  item.statEffects,
      //quality:      item.quality,
      },
      create: {
        slug:         slugName,
        name:         item.name,
        description:  item.description,
        type:         item.itemType,
      //slot:         item.slot,
      //element:      item.element,
        material:     item.materialType,
        weight:       item.weight,
        baseCost:     item.cost,
        buyPrice:     item.buyPrice,
        sellPrice:    item.sellPrice,
      //fragility:    item.fragility,
        toHitBonus:   item.toHitBonus,
      //minLevel:     item.minLevel,
      //maxLevel:     item.maxLevel,
      //decayRate:    item.decayRate,
      //canBeBroken:  item.canBeBroken,
      //canOverrideCollision:item.canOverrideCollision,
      //effects:      item.effects,
      //spellSlug:    item.spellSlug,
      //action:       item.action,
        statEffects:  item.statEffects,
      //quality:      item.quality,
        createdById:  'system',
      },
    });

    const tierLabel = getTierLabel(item.cost);
    console.log(
      `  ✅ [${tierLabel}] ${result.name.padEnd(36)} ` +
      `${item.itemType.padEnd(8)} ${item.materialType.padEnd(12)} ` +
      `+${item.toHitBonus}% hit  💰${item.cost.toLocaleString()}g`,
    );
  }
  console.log(`\n🗡️ ${seedName} seeding complete - ${data.length} records upserted.\n`);
}

export async function seedRecipeFunction(prisma: PrismaClient, seedName: string, data: RecipeSeed[]): Promise<void> {
  for (const recipe of data) {
    const slugName = recipe.slug.replace(/-/g, "_");
    // Find the item this recipe produces
    const resultItem: Item | null = await prisma.item.findUnique({
      where: { slug: recipe.resultItemSlug }
    });
    if (!resultItem) {
      console.warn(`⚠️  Missing item for recipe: ${recipe.slug} → ${recipe.resultItemSlug}`);
      continue;
    }
    const upserted: Recipe = await prisma.recipe.upsert({
      where: { slug: slugName },
      update: {
        name: recipe.name,
        description: recipe.description,
        skillSlug: recipe.skillSlug,
        difficulty: recipe.difficulty,
        ingredients: recipe.ingredients,
        resultItemId: resultItem.id,
      },
      create: {
        slug: slugName,
        name: recipe.name,
        description: recipe.description,
        skillSlug: recipe.skillSlug,
        difficulty: recipe.difficulty,
        ingredients: recipe.ingredients,
        resultItemId: resultItem.id,
      },
    });
    console.log(`Created in ${seedName}: ${upserted.name}`);
  }
  console.log(`\n🛠️ ${seedName} seeding complete — ${data.length} records processed.\n`);
}

export async function seedItems(prisma: PrismaClient): Promise<void> {

  const ARMOR = [
    { slug: 'chainmail-armor', name: 'Chainmail Armor', type: ItemType.ARMOR, material: MaterialType.METAL, baseCost: 50, weight: 10, toHitBonus: -1, buyPrice : 75, sellPrice: 25 },
    { slug: 'iron-breastplate', name: 'Iron Breastplate', type: ItemType.ARMOR, material: MaterialType.METAL, baseCost: 100, weight: 20, toHitBonus: -2, buyPrice: 150, sellPrice: 75 },
    { slug: 'leather-helmet', name: 'Leather Helmet', type: ItemType.HAT, material: MaterialType.LEATHER, baseCost: 25, weight: 5, toHitBonus: 0, buyPrice: 37, sellPrice: 18 },
    { slug: 'leather-tunic', name: 'Leather Tunic', type: ItemType.ARMOR, material: MaterialType.LEATHER, baseCost: 75, weight: 15, toHitBonus: -1, buyPrice: 112, sellPrice: 56 },
    { slug: 'mage-robe', name: 'Mage Robe', type: ItemType.ARMOR, material: MaterialType.CLOTH, baseCost: 50, weight: 3, toHitBonus: 0, buyPrice: 75, sellPrice: 37 },
    { slug: 'silver-stiletto', name: 'Silver Stiletto', type: ItemType.KNIFE, material: MaterialType.METAL, baseCost: 100, weight: 2, toHitBonus: 1, buyPrice: 150, sellPrice: 75 },
    { slug: 'steel-kite-shield', name: 'Steel Kite Shield', type: ItemType.SHIELD, material: MaterialType.METAL, baseCost: 150, weight: 25, toHitBonus: 0, buyPrice: 225, sellPrice: 112 },
    { slug: 'wooden-shield', name: 'Wooden Shield', type: ItemType.SHIELD, material: MaterialType.WOOD, baseCost: 50, weight: 10, toHitBonus: 0, buyPrice: 75, sellPrice: 37 },
  ];

  for (const item of ARMOR) {
    await prisma.item.upsert({
      where: { slug: item.slug },
      update: {
        name: item.name,
        type: item.type,
        material: item.material,
        baseCost: item.baseCost,
        weight: item.weight,
        toHitBonus: item.toHitBonus,
        buyPrice: item.buyPrice,
        sellPrice: item.sellPrice,
      },
      create:  {
        slug: item.slug,
        name: item.name,
        description: item.name,
        type: item.type,
        material: item.material,
        baseCost: item.baseCost,
        weight: item.weight,
        toHitBonus: item.toHitBonus,
        buyPrice: item.buyPrice,
        sellPrice: item.sellPrice,
        effects: { create: [] },
      },
    })
  }

  const WEAPONS = [
    { slug: 'bone-knife', name: 'Bone Knife', type: ItemType.KNIFE, material: MaterialType.BONE, baseCost: 40, minLevel: 1, buyPrice: 60, sellPrice: 20 },
    { slug: 'iron-sword', name: 'Iron Sword', type: ItemType.SWORD, material: MaterialType.METAL, baseCost: 100, minLevel: 1, buyPrice: 150, sellPrice: 75 },
    { slug: 'stone-dagger', name: 'Stone Dagger', type: ItemType.KNIFE, material: MaterialType.STONE, baseCost: 30, minLevel: 1, maxLevel: 5, toHitBonus: 0.05, buyPrice: 25, sellPrice: 25 },
    { slug: 'wooden-bow', name: 'Wooden Bow', type: ItemType.BOW, material: MaterialType.WOOD, baseCost: 50, minLevel: 1, buyPrice: 75, sellPrice: 37 },
    { slug: 'wooden-club', name: 'Wooden Club', type: ItemType.SWORD, material: MaterialType.WOOD, baseCost: 10, minLevel: 1, buyPrice: 15, sellPrice: 7 },
  ];

  for (const item of WEAPONS) {
    await prisma.item.upsert({
      where: { slug: item.slug },
      update: {
        slug: item.slug,
        name: item.name,
        type: item.type,
        material: item.material,
        baseCost: item.baseCost,
        minLevel: item.minLevel,
        maxLevel: (item as any).maxLevel,
        toHitBonus: (item as any).toHitBonus,
      },
      create: {
        slug: item.slug,
        name: item.name,
        type: item.type as any,
        material: item.material,
        baseCost: item.baseCost,
        minLevel: item.minLevel,
        maxLevel: (item as any).maxLevel,
        toHitBonus: (item as any).toHitBonus,
        effects: { create: [] },
      },
    });
  }

  const INGREDIENTS = [
    { slug: 'bread-standard', name: 'Fresh Bread', type: ItemType.FOOD, material: MaterialType.ORGANIC, baseCost: 5, weight: 1 },
    { slug: 'finger-bone', name: 'Finger Bone', type: ItemType.NONE, material: MaterialType.BONE, baseCost: 1, weight: 1 },
    { slug: 'flour', name: 'Flour', type: ItemType.CROP, material: MaterialType.ORGANIC, baseCost: 5, weight: 1 },
    { slug: 'water', name: 'Water', type: ItemType.DRINK, material: MaterialType.LIQUID, baseCost: 5, weight: 1 },
    { slug: 'wood', name: 'Wood', type: ItemType.MATERIAL, material: MaterialType.WOOD, baseCost: 2, weight: 10 },
  ];

  for (const item of INGREDIENTS) {
    await prisma.item.upsert({
      where: { slug: item.slug },
      update: {
        slug: item.slug,
        name: item.name,
        description: item.name,
        type: item.type,
        material: item.material,
        baseCost: item.baseCost,
        weight: item.weight,
      },
      create: {
        slug: item.slug,
        name: item.name,
        description: item.name,
        type: item.type,
        material: item.material,
        baseCost: item.baseCost,
        weight: item.weight,
        effects: { create: [] },
      },
    });
  }

  const standardBread = await prisma.item.findUnique({
    where: { slug: 'bread-standard' },
  });

  if (standardBread) {
    const breadRecipe = await prisma.recipe.upsert({
      where: { slug: 'bread-standard' },
      update: { name: 'Standard Bread' },
      create: {
        slug: 'bread-standard',
        name: 'Standard Bread',
        resultItemId: standardBread.id,
        skillSlug: 'cooking',
        difficulty: 0,
        ingredients: {
          create: [
            { itemSlug: 'flour', quantity: 1 },
            { itemSlug: 'water', quantity: 1 },
          ]
        },
      }},
    );
    const player = await prisma.player.findUnique({ where: { id: 'RYKER' }});
    if (player) {
      await prisma.playerRecipe.upsert({
        where: { playerId_recipeId: {
            playerId: player.id,
            recipeId: breadRecipe.id,
          } },
        update: {},
        create: { playerId: player.id, recipeId: breadRecipe.id },
      });
    }
  }

  console.log('Items seeded.');
}
