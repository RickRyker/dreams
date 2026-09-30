# Crafting (Player Perspective)

This is how crafting currently behaves in code.

## Crafting data model

Crafting is recipe-driven:

- `Recipe` defines:
  - Result item (`resultItemId`)
  - Difficulty
  - Skill tag (`skillSlug`)
  - Ingredient list (`ingredients` JSON)
- `PlayerRecipe` tracks which recipes a player has learned.

## Crafting flow

Current crafting service behavior:

1. Load recipe and player inventory.
2. Check required ingredients by slug/quantity.
3. Remove required ingredients in a transaction.
4. Add the crafted result item to inventory.
5. Record activity (`RECIPE_CRAFTED`) for progression hooks.

## Learning and listing recipes

Implemented operations include:

- Learn recipe (`PlayerRecipe` upsert)
- List player’s known recipes
- List all recipes

## XP integration

There is an additional crafting service flow (`server/src/crafting/CraftingService.ts`) that applies XP gain, including event-based XP multipliers through `BuffService`.

## Current implementation notes

- Crafting APIs are implemented in both `modules/crafting` and `crafting/CraftingRouter.ts`.
- In the active server bootstrap route tree, crafting routes are not mounted by default.
- Ingredient checking/removal is currently intentionally simple (“naive”) and marked for future hardening in service comments.