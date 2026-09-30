// server/prisma/seed/blueprints.ts

import {PrismaClient} from "@prisma/client";
import {blueprint, ItemSeed, RecipeSeed, seedItemFunction, seedRecipeFunction} from "./items";

const seedName = 'Blueprints';

export async function seedBlueprints(prisma: PrismaClient): Promise<void> {
  await seedItemFunction(prisma, seedName, data);
  await seedRecipeFunction(prisma, seedName, blueprintData);
}

const data: ItemSeed[] = [
  // You can define the actual item stats for these result items here
  // (iron_ingot, steel_ingot, iron_sword, etc.) or in your main items seed.
];

export const blueprintData: RecipeSeed[] = [
  // -------------------------
  // SMITHING
  // -------------------------
  blueprint("iron_ingot", "Iron Ingot", "smithing", 5, "iron_ingot",
    [{ slug: "iron_ore", qty: 3 }, { slug: "coal", qty: 1 }]),

  blueprint("steel_ingot", "Steel Ingot", "smithing", 8, "steel_ingot",
    [{ slug: "iron_ingot", qty: 2 }, { slug: "coal", qty: 2 }]),

  blueprint("iron_sword", "Iron Sword", "smithing", 7, "iron_sword",
    [{ slug: "iron_ingot", qty: 3 }, { slug: "wood_handle", qty: 1 }]),

  blueprint("steel_sword", "Steel Sword", "smithing", 10, "steel_sword",
    [{ slug: "steel_ingot", qty: 3 }, { slug: "wood_handle", qty: 1 }]),

  blueprint("iron_armor", "Iron Armor", "smithing", 10, "iron_armor",
    [{ slug: "iron_ingot", qty: 5 }, { slug: "leather_strip", qty: 3 }]),

  // -------------------------
  // WOODWORKING
  // -------------------------
  blueprint("oak_plank", "Oak Plank", "woodworking", 3, "oak_plank",
    [{ slug: "oak_log", qty: 1 }]),

  blueprint("wood_handle", "Wood Handle", "woodworking", 3, "wood_handle",
    [{ slug: "oak_plank", qty: 1 }]),

  blueprint("bow", "Bow", "woodworking", 6, "bow",
    [{ slug: "oak_plank", qty: 2 }, { slug: "string", qty: 1 }]),

  blueprint("wooden_shield", "Wooden Shield", "woodworking", 6, "wooden_shield",
    [{ slug: "oak_plank", qty: 3 }, { slug: "iron_ingot", qty: 1 }]),

  blueprint("staff", "Staff", "woodworking", 7, "staff",
    [{ slug: "oak_plank", qty: 2 }, { slug: "arcane_dust", qty: 1 }]),

  // -------------------------
  // LEATHERWORKING
  // -------------------------
  blueprint("leather_strip", "Leather Strip", "leatherworking", 3, "leather_strip",
    [{ slug: "raw_hide", qty: 1 }]),

  blueprint("leather_armor", "Leather Armor", "leatherworking", 6, "leather_armor",
    [{ slug: "leather_strip", qty: 4 }, { slug: "thread", qty: 2 }]),

  blueprint("leather_boot", "Leather Boot", "leatherworking", 5, "leather_boot",
    [{ slug: "leather_strip", qty: 3 }, { slug: "thread", qty: 1 }]),

  blueprint("quiver", "Quiver", "leatherworking", 4, "quiver",
    [{ slug: "leather_strip", qty: 2 }, { slug: "oak_plank", qty: 1 }]),

  // -------------------------
  // ALCHEMY
  // -------------------------
  blueprint("healing_potion", "Healing Potion", "alchemy", 4, "healing_potion",
    [{ slug: "herb", qty: 2 }, { slug: "water", qty: 1 }]),

  blueprint("mana_potion", "Mana Potion", "alchemy", 5, "mana_potion",
    [{ slug: "herb", qty: 1 }, { slug: "arcane_dust", qty: 1 }, { slug: "water", qty: 1 }]),

  blueprint("stamina_potion", "Stamina Potion", "alchemy", 5, "stamina_potion",
    [{ slug: "herb", qty: 2 }, { slug: "grain", qty: 1 }, { slug: "water", qty: 1 }]),

  blueprint("antidote", "Antidote", "alchemy", 6, "antidote",
    [{ slug: "herb", qty: 2 }, { slug: "mushroom", qty: 2 }]),

  // -------------------------
  // ENCHANTING
  // -------------------------
  blueprint("enchanted_sword", "Enchanted Sword", "enchanting", 10, "enchanted_sword",
    [{ slug: "steel_sword", qty: 1 }, { slug: "arcane_dust", qty: 3 }, { slug: "mana_potion", qty: 1 }]),

  blueprint("enchanted_bow", "Enchanted Bow", "enchanting", 10, "enchanted_bow",
    [{ slug: "bow", qty: 1 }, { slug: "arcane_dust", qty: 3 }, { slug: "mana_potion", qty: 1 }]),

  blueprint("enchanted_armor", "Enchanted Armor", "enchanting", 10, "enchanted_armor",
    [{ slug: "iron_armor", qty: 1 }, { slug: "arcane_dust", qty: 4 }, { slug: "healing_potion", qty: 1 }]),

  blueprint("pet_charm", "Pet Charm", "enchanting", 9, "pet_charm",
    [{ slug: "arcane_dust", qty: 2 }, { slug: "beastmaster_feast", qty: 1 }]),
];
