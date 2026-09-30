// server/prisma/seed/ingredients.alchemy.ts

import {fx, seedItemFunction, ItemSeed} from './items';
import {ItemType, MaterialType, PrismaClient} from "@prisma/client";

const seedName: string = 'Alchemical Ingredient';

// ---------------------------------------------------------------------------
// SEED FUNCTION
// ---------------------------------------------------------------------------
export async function seedAlchemicalIngredients(prisma: PrismaClient): Promise<void> {
  await seedItemFunction(prisma, seedName, data);
}

// ---------------------------------------------------------------------------
// ITEM DATA
// Pricing: sellPrice = cost × 0.40 | buyPrice = cost × 1.80
// All ingredient are non-combat → toHitBonus 0, statEffects fx()
// ---------------------------------------------------------------------------
const data: ItemSeed[] = [

  // ── EXTRACTS & REAGENTS ───────────────────────────────────────────────────
  {
    slug: 'ironroot_extract', name: 'Ironroot Extract',
    description: 'A concentrated tincture pressed from the ironroot plant. Dense with mineral energy.',
    itemType: ItemType.INGREDIENT, materialType: MaterialType.ESSENCE,
    weight: 0.1, cost: 80, buyPrice: 144, sellPrice: 32,
    toHitBonus: 0, statEffects: fx(),
  },
  {
    slug: 'emberbark_extract', name: 'Emberbark Extract',
    description: 'Distilled oil of emberbark. Faintly glows orange; intensely warming.',
    itemType: ItemType.INGREDIENT, materialType: MaterialType.ESSENCE,
    weight: 0.1, cost: 100, buyPrice: 180, sellPrice: 40,
    toHitBonus: 0, statEffects: fx(),
  },
  {
    slug: 'moonleaf_extract', name: 'Moonleaf Extract',
    description: 'Cold-pressed silver oil from moonleaf. Amplifies arcane effects in food and brew.',
    itemType: ItemType.INGREDIENT, materialType: MaterialType.ESSENCE,
    weight: 0.1, cost: 120, buyPrice: 216, sellPrice: 48,
    toHitBonus: 0, statEffects: fx(),
  },
  {
    slug: 'swiftvine_extract', name: 'Swiftvine Extract',
    description: 'Pressed juice of swiftvine. Grants a burst of agility when consumed.',
    itemType: ItemType.INGREDIENT, materialType: MaterialType.ESSENCE,
    weight: 0.1, cost: 90, buyPrice: 162, sellPrice: 36,
    toHitBonus: 0, statEffects: fx(),
  },
  {
    slug: 'nightshade_extract', name: 'Nightshade Extract',
    description: 'A controlled extract of nightshade berries. Toxic in excess; builds resistance in small doses.',
    itemType: ItemType.INGREDIENT, materialType: MaterialType.ESSENCE,
    weight: 0.1, cost: 150, buyPrice: 270, sellPrice: 60,
    toHitBonus: 0, statEffects: fx(),
  },
  {
    slug: 'gold_dust', name: 'Gold Dust',
    description: 'Finely milled flakes of pure gold. Adds a glittering sheen — and fortune — to food.',
    itemType: ItemType.INGREDIENT, materialType: MaterialType.MINERAL,
    weight: 0.05, cost: 200, buyPrice: 360, sellPrice: 80,
    toHitBonus: 0, statEffects: fx(),
  },
  {
    slug: 'emberbark_syrup', name: 'Emberbark Syrup',
    description: 'Reduced emberbark tea thickened with honey. A warm, glowing glaze for baked goods.',
    itemType: ItemType.INGREDIENT, materialType: MaterialType.ESSENCE,
    weight: 0.2, cost: 75, buyPrice: 135, sellPrice: 30,
    toHitBonus: 0, statEffects: fx(),
  },

  // ══════════════════════════════════════════════════════════════════════════
  // ALCHEMY — POTION  (T1 – T3)
  // ══════════════════════════════════════════════════════════════════════════
  {
    slug: 'potion_health_minor', name: 'Minor Health Potion',
    description: 'A small vial of red regenerative liquid. Instantly restores a moderate amount of HP.',
    itemType: ItemType.POTION, materialType: MaterialType.NONE,
    weight: 0.3, cost: 30, buyPrice: 54, sellPrice: 12,
    toHitBonus: 0, statEffects: fx(0, 0, 0, 0, 50),            // HP+50
  },
  {
    slug: 'potion_health_major', name: 'Major Health Potion',
    description: 'A large flask of vivid crimson liquid. Restores a substantial portion of HP instantly.',
    itemType: ItemType.POTION, materialType: MaterialType.NONE,
    weight: 0.3, cost: 200, buyPrice: 360, sellPrice: 80,
    toHitBonus: 0, statEffects: fx(0, 0, 0, 0, 200),           // HP+200
  },
  {
    slug: 'potion_mana_minor', name: 'Minor Mana Potion',
    description: 'A small vial of deep-blue liquid. Restores a portion of spent Mana.',
    itemType: ItemType.POTION, materialType: MaterialType.NONE,
    weight: 0.3, cost: 35, buyPrice: 63, sellPrice: 14,
    toHitBonus: 0, statEffects: fx(0, 0, 0, 0, 0, 50),         // MP+50
  },
  {
    slug: 'potion_mana_major', name: 'Major Mana Potion',
    description: 'A large flask of radiant cobalt blue. Restores a substantial portion of Mana.',
    itemType: ItemType.POTION, materialType: MaterialType.NONE,
    weight: 0.3, cost: 220, buyPrice: 396, sellPrice: 88,
    toHitBonus: 0, statEffects: fx(0, 0, 0, 0, 0, 200),        // MP+200
  },
  {
    slug: 'potion_strength', name: 'Potion of Strength',
    description: 'An orange, viscous draught smelling of blood and iron. Surges Strength temporarily.',
    itemType: ItemType.POTION, materialType: MaterialType.NONE,
    weight: 0.3, cost: 150, buyPrice: 270, sellPrice: 60,
    toHitBonus: 0, statEffects: fx(8, 0, 0, 0, 20),            // STR+8 HP+20
  },
  {
    slug: 'potion_swiftness', name: 'Potion of Swiftness',
    description: 'A pale-green liquid that tingles on the tongue. Grants a burst of speed and agility.',
    itemType: ItemType.POTION, materialType: MaterialType.NONE,
    weight: 0.3, cost: 140, buyPrice: 252, sellPrice: 56,
    toHitBonus: 0, statEffects: fx(0, 8, 0, 0, 0, 0, 0, 5),   // DEX+8 dodge+5
  },
  {
    slug: 'potion_antidote', name: 'Antidote',
    description: 'A cloudy yellow concoction of cures and neutralisers. Removes most poison and curse effects.',
    itemType: ItemType.POTION, materialType: MaterialType.NONE,
    weight: 0.3, cost: 80, buyPrice: 144, sellPrice: 32,
    toHitBonus: 0, statEffects: fx(0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 5), // CON+4 SR+5
  },
  {
    slug: 'potion_invisibility', name: 'Potion of Invisibility',
    description: 'A shimmering, near-transparent liquid. Renders the drinker invisible for a brief time.',
    itemType: ItemType.POTION, materialType: MaterialType.NONE,
    weight: 0.3, cost: 500, buyPrice: 900, sellPrice: 200,
    toHitBonus: 0, statEffects: fx(0, 10, 0, 0, 0, 0, 0, 15), // DEX+10 dodge+15
  },

  // -------------------------
  // ALCHEMY INGREDIENT
  // -------------------------
  { slug: "healing_potion", name: "Healing Potion", description: "Restores health.",
    itemType: ItemType.DRINK, materialType: MaterialType.LIQUID,
    weight: 0.2, cost: 10, buyPrice: 20, sellPrice: 4, toHitBonus: 0,
    statEffects: fx(0,0,0,0, 25,0, 0,0, 0,0,0, 0,0, 0, 5, 5) },

  { slug: "mana_potion", name: "Mana Potion", description: "Restores mana.",
    itemType: ItemType.DRINK, materialType: MaterialType.LIQUID,
    weight: 0.2, cost: 12, buyPrice: 24, sellPrice: 5, toHitBonus: 0,
    statEffects: fx(0,0,0,0, 0,25, 0,0, 0,0,0, 0,0, 0, 5, 5) },

  { slug: "stamina_potion", name: "Stamina Potion", description: "Restores stamina.",
    itemType: ItemType.DRINK, materialType: MaterialType.LIQUID,
    weight: 0.2, cost: 12, buyPrice: 24, sellPrice: 5, toHitBonus: 0,
    statEffects: fx(0,1,0,1, 10,0, 0,0, 0,0,0, 0,0, 5, 5, 5) },

  { slug: "antidote", name: "Antidote", description: "Cures poison.",
    itemType: ItemType.DRINK, materialType: MaterialType.LIQUID,
    weight: 0.2, cost: 10, buyPrice: 20, sellPrice: 4, toHitBonus: 0,
    statEffects: fx(0,0,0,0, 0,0, 0,0, 0,0,5, 0,0, 0, 2, 2) },

  // -------------------------
  // ENCHANTING INGREDIENT
  // -------------------------
  { slug: "enchanted_sword", name: "Enchanted Sword", description: "A magically enhanced sword.",
    itemType: ItemType.SWORD, materialType: MaterialType.METAL,
    weight: 3, cost: 60, buyPrice: 120, sellPrice: 24, toHitBonus: 10,
    statEffects: fx(4,2,2,2, 0,10, 10,0, 2,2,2, 2,2, 0,0,0) },

  { slug: "enchanted_bow", name: "Enchanted Bow", description: "A magically enhanced bow.",
    itemType: ItemType.BOW, materialType: MaterialType.WOOD,
    weight: 2, cost: 55, buyPrice: 110, sellPrice: 22, toHitBonus: 8,
    statEffects: fx(2,4,2,1, 0,10, 8,2, 2,2,2, 1,1, 0,0,0) },

  { slug: "enchanted_armor", name: "Enchanted Armor", description: "Magically enhanced armor.",
    itemType: ItemType.ARMOR, materialType: MaterialType.METAL,
    weight: 10, cost: 70, buyPrice: 140, sellPrice: 28, toHitBonus: -1,
    statEffects: fx(3,1,2,4, 40,20, -1,2, 2,2,2, 5,5, 0,0,0) },

  { slug: "pet_charm", name: "Pet Charm", description: "A charm that strengthens pets.",
    itemType: ItemType.FOOD, materialType: MaterialType.PLANT,
    weight: 0.1, cost: 25, buyPrice: 50, sellPrice: 10, toHitBonus: 0,
    statEffects: fx(0,0,0,0, 0,0, 0,0, 0,0,0, 0,0, 0, 5, 5) },

];

// Need scrolls: Scroll of Fire Ball, Scroll of Frost Bolt, Scroll of Healing, Scroll of Stunning.
// Need more POTION: Potion of Giant Strength
