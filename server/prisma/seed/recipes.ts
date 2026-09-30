// server/prisma/seed/recipes.ts

import {PrismaClient} from "@prisma/client";
import {foodRecipe, RecipeSeed, seedRecipeFunction} from './items';

const seedName: string = 'Recipe';

// ---------------------------------------------------------------------------
// SEED FUNCTION
// ---------------------------------------------------------------------------
export async function seedRecipes(prisma: PrismaClient): Promise<void> {
  await seedRecipeFunction(prisma, seedName, data);
}

// ---------------------------------------------------------------------------
// ITEM DATA
// ---------------------------------------------------------------------------
const data: RecipeSeed[] = [

  // -------------------------
  // TIER 1 — BASIC FOODS
  // -------------------------
  foodRecipe("bread", "Bread", 2, "bread",
    [{ slug: "grain", qty: 2 }, { slug: "water", qty: 1 }]),

  foodRecipe("cooked_meat", "Cooked Meat", 2, "cooked_meat",
    [{ slug: "raw_meat", qty: 1 }]),

  foodRecipe("boiled_egg", "Boiled Egg", 1, "boiled_egg",
    [{ slug: "egg", qty: 1 }, { slug: "water", qty: 1 }]),

  foodRecipe("vegetable_broth", "Vegetable Broth", 2, "vegetable_broth",
    [{ slug: "carrot", qty: 1 }, { slug: "onion", qty: 1 }, { slug: "water", qty: 1 }]),


  // -------------------------
  // TIER 2 — MEALS
  // -------------------------
  foodRecipe("meat_stew", "Meat Stew", 4, "meat_stew",
    [
      { slug: "cooked_meat", qty: 1 },
      { slug: "potato", qty: 2 },
      { slug: "carrot", qty: 1 },
      { slug: "water", qty: 1 }
    ]),

  foodRecipe("fish_stew", "Fish Stew", 4, "fish_stew",
    [
      { slug: "raw_fish", qty: 2 },
      { slug: "onion", qty: 1 },
      { slug: "water", qty: 1 }
    ]),

  foodRecipe("berry_pie", "Berry Pie", 3, "berry_pie",
    [
      { slug: "berries", qty: 3 },
      { slug: "grain", qty: 1 },
      { slug: "sugar", qty: 1 }
    ]),

  foodRecipe("mushroom_soup", "Mushroom Soup", 3, "mushroom_soup",
    [
      { slug: "mushroom", qty: 3 },
      { slug: "water", qty: 1 }
    ]),


  // -------------------------
  // TIER 3 — BUFF FOODS
  // -------------------------
  foodRecipe("warrior_stew", "Warrior Stew", 6, "warrior_stew",
    [
      { slug: "meat_stew", qty: 1 },
      { slug: "hot_pepper", qty: 2 },
      { slug: "garlic", qty: 1 }
    ]),

  foodRecipe("hunter_feast", "Hunter Feast", 6, "hunter_feast",
    [
      { slug: "cooked_meat", qty: 2 },
      { slug: "berries", qty: 2 },
      { slug: "herb", qty: 1 }
    ]),

  foodRecipe("mage_brew", "Mage Brew", 5, "mage_brew",
    [
      { slug: "mushroom_soup", qty: 1 },
      { slug: "arcane_dust", qty: 1 },
      { slug: "herb", qty: 2 }
    ]),

  foodRecipe("stamina_stew", "Stamina Stew", 5, "stamina_stew",
    [
      { slug: "potato", qty: 3 },
      { slug: "carrot", qty: 2 },
      { slug: "salt", qty: 1 }
    ]),


  // -------------------------
  // TIER 4 — FEASTS
  // -------------------------
  foodRecipe("grand_feast", "Grand Feast", 10, "grand_feast",
    [
      { slug: "meat_stew", qty: 2 },
      { slug: "fish_stew", qty: 1 },
      { slug: "berry_pie", qty: 1 },
      { slug: "vegetable_broth", qty: 2 }
    ]),

  foodRecipe("arcane_feast", "Arcane Feast", 10, "arcane_feast",
    [
      { slug: "mage_brew", qty: 2 },
      { slug: "mushroom_soup", qty: 2 },
      { slug: "arcane_dust", qty: 2 }
    ]),

  foodRecipe("beastmaster_feast", "Beastmaster Feast", 10, "beastmaster_feast",
    [
      { slug: "hunter_feast", qty: 2 },
      { slug: "cooked_meat", qty: 3 },
      { slug: "herb", qty: 3 }
    ]),
];
