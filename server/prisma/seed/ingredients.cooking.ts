// server/prisma/seed/ingredients.cooking.ts

import {fx, seedItemFunction, ItemSeed} from './items';
import {ItemType, MaterialType, PrismaClient} from "@prisma/client";

const seedName: string = 'Cooking Ingredient';

// ---------------------------------------------------------------------------
// SEED FUNCTION
// ---------------------------------------------------------------------------
export async function seedCookingIngredients(prisma: PrismaClient): Promise<void> {
  await seedItemFunction(prisma, seedName, data);
}

// ---------------------------------------------------------------------------
// ITEM DATA
// Pricing: sellPrice = cost × 0.40 | buyPrice = cost × 1.80
// All ingredient are non-combat → toHitBonus 0, statEffects fx()
// ---------------------------------------------------------------------------
const data: ItemSeed[] = [

  // ── PANTRY STAPLES ────────────────────────────────────────────────────────
  {
    slug: 'water',
    name: 'Water',
    description: 'Clean, fresh water drawn from a river or well. Required in nearly every recipe.',
    itemType: ItemType.DRINK, materialType: MaterialType.LIQUID,
    weight: 1.0, cost: 1, buyPrice: 2, sellPrice: 0,
    toHitBonus: 0, statEffects: fx(),
  },
  {
    slug: 'crystal_water',
    name: 'Crystal Water',
    description: 'Purified spring water charged with ambient mana. Intensifies magical recipes.',
    itemType: ItemType.INGREDIENT, materialType: MaterialType.MINERAL,
    weight: 0.5, cost: 15, buyPrice: 27, sellPrice: 6,
    toHitBonus: 0, statEffects: fx(),
  },
  {
    slug: 'corn_meal',
    name: 'Corn Meal',
    description: 'Coarsely ground dried corn. Used for biscuits, porridges, and traveller\'s bread.',
    itemType: ItemType.INGREDIENT, materialType: MaterialType.GRAIN,
    weight: 0.5, cost: 2, buyPrice: 4, sellPrice: 1,
    toHitBonus: 0, statEffects: fx(),
  },
  {
    slug: 'flour',
    name: 'Flour',
    description: 'Finely milled wheat flour. The backbone of every baker\'s pantry.',
    itemType: ItemType.INGREDIENT, materialType: MaterialType.GRAIN,
    weight: 0.5, cost: 2, buyPrice: 4, sellPrice: 1,
    toHitBonus: 0, statEffects: fx(),
  },
  {
    slug: 'oats',
    name: 'Oats',
    description: 'Rolled oats, slow to digest and endlessly filling. A staple of northern folk.',
    itemType: ItemType.INGREDIENT, materialType: MaterialType.GRAIN,
    weight: 0.5, cost: 2, buyPrice: 4, sellPrice: 1,
    toHitBonus: 0, statEffects: fx(),
  },
  {
    slug: 'rye_flour',
    name: 'Rye Flour',
    description: 'Coarse, dark flour ground from rye grain. Gives bread its dense, earthy character.',
    itemType: ItemType.INGREDIENT, materialType: MaterialType.GRAIN,
    weight: 0.5, cost: 2, buyPrice: 4, sellPrice: 1,
    toHitBonus: 0, statEffects: fx(),
  },
  {
    slug: 'salt',
    name: 'Salt',
    description: 'Common rock salt. Seasons food, cures meat, and preserves rations.',
    itemType: ItemType.INGREDIENT, materialType: MaterialType.MINERAL,
    weight: 0.1, cost: 1, buyPrice: 2, sellPrice: 0,
    toHitBonus: 0, statEffects: fx(),
  },
  {
    slug: 'sugar',
    name: 'Sugar',
    description: 'Refined cane sugar. Sweetens baked goods and brewed beverages.',
    itemType: ItemType.INGREDIENT, materialType: MaterialType.PLANT,
    weight: 0.2, cost: 3, buyPrice: 5, sellPrice: 1,
    toHitBonus: 0, statEffects: fx(),
  },
  {
    slug: 'yeast',
    name: 'Yeast',
    description: 'A small crock of active yeast culture. Makes dough rise and fermentation happen.',
    itemType: ItemType.INGREDIENT, materialType: MaterialType.PLANT,
    weight: 0.1, cost: 2, buyPrice: 4, sellPrice: 1,
    toHitBonus: 0, statEffects: fx(),
  },
  {
    slug: 'sourdough_starter',
    name: 'Sourdough Starter',
    description: 'A living culture of wild yeast and bacteria. Must be fed daily or it perishes.',
    itemType: ItemType.INGREDIENT, materialType: MaterialType.NONE,
    weight: 0.3, cost: 10, buyPrice: 18, sellPrice: 4,
    toHitBonus: 0, statEffects: fx(),
  },
  {
    slug: 'oil_cooking',
    name: 'Cooking Oil',
    description: 'Pressed sunflower or olive oil. Prevents sticking and carries flavour.',
    itemType: ItemType.INGREDIENT, materialType: MaterialType.LIQUID,
    weight: 0.3, cost: 3, buyPrice: 5, sellPrice: 1,
    toHitBonus: 0, statEffects: fx(),
  },
  {
    slug: 'honey',
    name: 'Honey',
    description: 'Golden wildflower honey harvested from forest hives. Sweet and m flavour.',
    itemType: ItemType.INGREDIENT, materialType: MaterialType.LIQUID,
    weight: 0.3, cost: 3, buyPrice: 5, sellPrice: 1,
    toHitBonus: 0, statEffects: fx(),
  },

  // ── DAIRY & EGGS ──────────────────────────────────────────────────────────
  {
    slug: 'milk', name: 'Milk',
    description: 'Fresh whole milk from a farmstead cow. Rich, creamy, and quick to spoil.',
    itemType: ItemType.INGREDIENT, materialType: MaterialType.NONE,
    weight: 0.5, cost: 2, buyPrice: 4, sellPrice: 1,
    toHitBonus: 0, statEffects: fx(),
  },
  {
    slug: 'butter', name: 'Butter',
    description: 'Churned cream butter, salted for keeping. Essential in fine baking.',
    itemType: ItemType.INGREDIENT, materialType: MaterialType.NONE,
    weight: 0.5, cost: 2, buyPrice: 4, sellPrice: 1,
    toHitBonus: 0, statEffects: fx(),
  },
  {
    slug: 'hard_cheese', name: 'Hard Cheese',
    description: 'A firm, aged wheel of cheese. Sharp in flavour and long-lasting in a pack.',
    itemType: ItemType.INGREDIENT, materialType: MaterialType.NONE,
    weight: 0.3, cost: 8, buyPrice: 14, sellPrice: 3,
    toHitBonus: 0, statEffects: fx(),
  },
  {
    slug: 'egg', name: 'Egg',
    description: 'A large hen\'s egg. Binds doughs, enriches batters, and scrambles in seconds.',
    itemType: ItemType.INGREDIENT, materialType: MaterialType.NONE,
    weight: 0.1, cost: 2, buyPrice: 4, sellPrice: 1,
    toHitBonus: 0, statEffects: fx(),
  },

  // ── PRODUCE & FUNGI ───────────────────────────────────────────────────────
  {
    slug: 'carrot', name: 'Carrot',
    description: 'A plump orange root vegetable. Sweet when roasted, hearty when stewed.',
    itemType: ItemType.INGREDIENT, materialType: MaterialType.PLANT,
    weight: 0.2, cost: 1, buyPrice: 2, sellPrice: 0,
    toHitBonus: 0, statEffects: fx(),
  },
  {
    slug: 'potato', name: 'Potato',
    description: 'A starchy tuber that fills any pot. Foundational to stews and chowders.',
    itemType: ItemType.INGREDIENT, materialType: MaterialType.PLANT,
    weight: 0.3, cost: 1, buyPrice: 2, sellPrice: 0,
    toHitBonus: 0, statEffects: fx(),
  },
  {
    slug: 'onion', name: 'Onion',
    description: 'A pungent bulb that sweetens with heat. Nearly every savoury recipe demands one.',
    itemType: ItemType.INGREDIENT, materialType: MaterialType.PLANT,
    weight: 0.15, cost: 1, buyPrice: 2, sellPrice: 0,
    toHitBonus: 0, statEffects: fx(),
  },
  {
    slug: 'parsnip', name: 'Parsnip',
    description: 'A pale, nutty root vegetable. Adds a subtle sweetness to hearty stews.',
    itemType: ItemType.INGREDIENT, materialType: MaterialType.PLANT,
    weight: 0.2, cost: 2, buyPrice: 4, sellPrice: 1,
    toHitBonus: 0, statEffects: fx(),
  },
  {
    slug: 'turnip', name: 'Turnip',
    description: 'A firm, slightly peppery root. Reliable cold-season crop beloved by farmers.',
    itemType: ItemType.INGREDIENT, materialType: MaterialType.PLANT,
    weight: 0.2, cost: 2, buyPrice: 4, sellPrice: 1,
    toHitBonus: 0, statEffects: fx(),
  },
  {
    slug: 'garlic', name: 'Garlic',
    description: 'A head of pungent garlic cloves. Also rumoured to ward off lesser spirits.',
    itemType: ItemType.INGREDIENT, materialType: MaterialType.PLANT,
    weight: 0.1, cost: 2, buyPrice: 4, sellPrice: 1,
    toHitBonus: 0, statEffects: fx(),
  },
  {
    slug: 'root_vegetables', name: 'Root Vegetables',
    description: 'A mixed bundle of seasonal roots — parsnip, carrot, and turnip.',
    itemType: ItemType.INGREDIENT, materialType: MaterialType.PLANT,
    weight: 0.5, cost: 3, buyPrice: 5, sellPrice: 1,
    toHitBonus: 0, statEffects: fx(),
  },
  {
    slug: 'lemon', name: 'Lemon',
    description: 'A bright, tart citrus fruit. Lifts the flavour of fish and cuts through fat.',
    itemType: ItemType.INGREDIENT, materialType: MaterialType.PLANT,
    weight: 0.1, cost: 2, buyPrice: 4, sellPrice: 1,
    toHitBonus: 0, statEffects: fx(),
  },
  {
    slug: 'sea_vegetable', name: 'Sea Vegetable',
    description: 'Dried coastal kelp and seaweed. Deeply savoury; enhances magical brews.',
    itemType: ItemType.INGREDIENT, materialType: MaterialType.PLANT,
    weight: 0.3, cost: 8, buyPrice: 14, sellPrice: 3,
    toHitBonus: 0, statEffects: fx(),
  },
  {
    slug: 'mushroom', name: 'Mushroom',
    description: 'Common forest button mushroom. Earthy, meaty, and versatile in any pot.',
    itemType: ItemType.INGREDIENT, materialType: MaterialType.PLANT,
    weight: 0.2, cost: 3, buyPrice: 5, sellPrice: 1,
    toHitBonus: 0, statEffects: fx(),
  },
  {
    slug: 'mushroom_rare', name: 'Rare Mushroom',
    description: 'A luminous cap-mushroom found only in old-growth glades. Intensely flavoured.',
    itemType: ItemType.INGREDIENT, materialType: MaterialType.PLANT,
    weight: 0.2, cost: 25, buyPrice: 45, sellPrice: 10,
    toHitBonus: 0, statEffects: fx(),
  },
  {
    slug: 'mushroom_black', name: 'Black Mushroom',
    description: 'A jet-black truffle-like mushroom of deep caverns. Potent and faintly toxic raw.',
    itemType: ItemType.INGREDIENT, materialType: MaterialType.PLANT,
    weight: 0.2, cost: 40, buyPrice: 72, sellPrice: 16,
    toHitBonus: 0, statEffects: fx(),
  },
  {
    slug: 'four_leaf_clover', name: 'Four-Leaf Clover',
    description: 'A rare clover said to concentrate residual luck in its leaves.',
    itemType: ItemType.INGREDIENT, materialType: MaterialType.PLANT,
    weight: 0.05, cost: 20, buyPrice: 36, sellPrice: 8,
    toHitBonus: 0, statEffects: fx(),
  },
  {
    slug: 'seed_mix', name: 'Seed Mix',
    description: 'Sesame, sunflower, and poppy seeds blended for baking toppings.',
    itemType: ItemType.INGREDIENT, materialType: MaterialType.PLANT,
    weight: 0.2, cost: 3, buyPrice: 5, sellPrice: 1,
    toHitBonus: 0, statEffects: fx(),
  },
  {
    slug: 'walnut', name: 'Walnut',
    description: 'A rich, slightly bitter tree nut. Adds depth to breads and pastries.',
    itemType: ItemType.INGREDIENT, materialType: MaterialType.PLANT,
    weight: 0.1, cost: 4, buyPrice: 7, sellPrice: 2,
    toHitBonus: 0, statEffects: fx(),
  },
  {
    slug: 'hazelnut', name: 'Hazelnut',
    description: 'A small, sweet nut foraged from hedgerow bushes. Pairs beautifully with honey.',
    itemType: ItemType.INGREDIENT, materialType: MaterialType.PLANT,
    weight: 0.1, cost: 4, buyPrice: 7, sellPrice: 2,
    toHitBonus: 0, statEffects: fx(),
  },

  // ── SPICES & SEASONINGS ───────────────────────────────────────────────────
  {
    slug: 'pepper_spice', name: 'Black Pepper',
    description: 'Cracked black peppercorns. Adds heat and sharpness to meat dishes.',
    itemType: ItemType.INGREDIENT, materialType: MaterialType.PLANT,
    weight: 0.1, cost: 3, buyPrice: 5, sellPrice: 1,
    toHitBonus: 0, statEffects: fx(),
  },
  {
    slug: 'cinnamon_spice', name: 'Cinnamon',
    description: 'Warm, aromatic bark spice from southern forests. Used in sweet and savoury dishes.',
    itemType: ItemType.INGREDIENT, materialType: MaterialType.PLANT,
    weight: 0.1, cost: 4, buyPrice: 7, sellPrice: 2,
    toHitBonus: 0, statEffects: fx(),
  },
  {
    slug: 'dragon_pepper', name: 'Dragon Pepper',
    description: 'A small, wrinkled pepper that burns like dragonfire. Handle with care.',
    itemType: ItemType.INGREDIENT, materialType: MaterialType.PLANT,
    weight: 0.1, cost: 35, buyPrice: 63, sellPrice: 14,
    toHitBonus: 0, statEffects: fx(),
  },
  {
    slug: 'saffron', name: 'Saffron',
    description: 'Crimson threads of the rarest spice. Precious enough to be traded by the strand.',
    itemType: ItemType.INGREDIENT, materialType: MaterialType.MINERAL,
    weight: 0.05, cost: 50, buyPrice: 90, sellPrice: 20,
    toHitBonus: 0, statEffects: fx(),
  },
  {
    slug: 'caraway_seed', name: 'Caraway Seed',
    description: 'Small, crescent-shaped seeds with a bold anise flavour. Classic in rye bread.',
    itemType: ItemType.INGREDIENT, materialType: MaterialType.PLANT,
    weight: 0.05, cost: 3, buyPrice: 5, sellPrice: 1,
    toHitBonus: 0, statEffects: fx(),
  },

  // ── FORAGED & BREWED ─────────────────────────────────────────────────────
  {
    slug: 'herbs_common', name: 'Common Herbs',
    description: 'A bundle of rosemary, thyme, and sage. Freshly cut from a kitchen garden.',
    itemType: ItemType.INGREDIENT, materialType: MaterialType.PLANT,
    weight: 0.1, cost: 2, buyPrice: 4, sellPrice: 1,
    toHitBonus: 0, statEffects: fx(),
  },
  {
    slug: 'ginger_root', name: 'Ginger Root',
    description: 'A knobbly, fibrous root with fierce heat and medicinal warmth.',
    itemType: ItemType.INGREDIENT, materialType: MaterialType.PLANT,
    weight: 0.2, cost: 4, buyPrice: 7, sellPrice: 2,
    toHitBonus: 0, statEffects: fx(),
  },
  {
    slug: 'chamomile_flower', name: 'Chamomile Flower',
    description: 'Dried daisy-like flowers that steep into a golden, calming tea.',
    itemType: ItemType.INGREDIENT, materialType: MaterialType.PLANT,
    weight: 0.1, cost: 5, buyPrice: 9, sellPrice: 2,
    toHitBonus: 0, statEffects: fx(),
  },
  {
    slug: 'thornberry', name: 'Thornberry',
    description: 'A tart red berry guarded by inch-long thorns. Mildly healing when brewed.',
    itemType: ItemType.INGREDIENT, materialType: MaterialType.PLANT,
    weight: 0.1, cost: 8, buyPrice: 14, sellPrice: 3,
    toHitBonus: 0, statEffects: fx(),
  },
  {
    slug: 'moonleaf', name: 'Moonleaf',
    description: 'A silver-veined leaf that shimmers in darkness. Found only beneath thorns. Mildly healing when brewed.',
    itemType: ItemType.INGREDIENT, materialType: MaterialType.PLANT,
    weight: 0.1, cost: 8, buyPrice: 14, sellPrice: 3,
    toHitBonus: 0, statEffects: fx(),
  },
  {
    slug: 'emberbark', name: 'Emberbark',
    description: 'Inner bark of the embertree, warm to the touch even when dried.',
    itemType: ItemType.INGREDIENT, materialType: MaterialType.PLANT,
    weight: 0.3, cost: 30, buyPrice: 54, sellPrice: 12,
    toHitBonus: 0, statEffects: fx(),
  },
  {
    slug: 'frost_thistle', name: 'Frost Thistle',
    description: 'A pale-blue thistle found at altitude. Ice-cold to the touch, never melts.',
    itemType: ItemType.INGREDIENT, materialType: MaterialType.PLANT,
    weight: 0.1, cost: 45, buyPrice: 81, sellPrice: 18,
    toHitBonus: 0, statEffects: fx(),
  },
  {
    slug: 'sages_herb', name: 'Sage\'s Herb',
    description: 'A legendary seven-petaled herb said to grow only at ley-line crossings.',
    itemType: ItemType.INGREDIENT, materialType: MaterialType.PLANT,
    weight: 0.1, cost: 60, buyPrice: 108, sellPrice: 24,
    toHitBonus: 0, statEffects: fx(),
  },
  {
    slug: 'cherry_wood_chips', name: 'Cherry Wood Chips',
    description: 'Fragrant chips of cherry wood used to cold-smoke meat and fish.',
    itemType: ItemType.INGREDIENT, materialType: MaterialType.WOOD,
    weight: 0.5, cost: 5, buyPrice: 9, sellPrice: 2,
    toHitBonus: 0, statEffects: fx(),
  },
  // ── RAW MEAT & SEAFOOD ───────────────────────────────────────────────────
  {
    slug: 'meat_raw', name: 'Raw Meat',
    description: 'Generic cuts of unspecified game meat. Useful meat recipe.',
    itemType: ItemType.INGREDIENT, materialType: MaterialType.MEAT,
    weight: 0.5, cost: 5, buyPrice: 9, sellPrice: 2,
    toHitBonus: 0, statEffects: fx(),
  },
  {
    slug: 'chicken_raw', name: 'Raw Chicken',
    description: 'A whole plucked chicken ready for the spit. Mild flavour, widely available.',
    itemType: ItemType.INGREDIENT, materialType: MaterialType.MEAT,
    weight: 1.0, cost: 6, buyPrice: 11, sellPrice: 2,
    toHitBonus: 0, statEffects: fx(),
  },
  {
    slug: 'boar_meat_raw', name: 'Raw Boar Meat',
    description: 'Thick, dark cuts from a forest boar. Rich and gamey, prized by hunters.',
    itemType: ItemType.INGREDIENT, materialType: MaterialType.MEAT,
    weight: 1.5, cost: 10, buyPrice: 18, sellPrice: 4,
    toHitBonus: 0, statEffects: fx(),
  },
  {
    slug: 'venison_raw', name: 'Raw Venison',
    description: 'Lean, rosy cuts of deer haunch. Tender and delicate with a grassy finish.',
    itemType: ItemType.INGREDIENT, materialType: MaterialType.MEAT,
    weight: 1.5, cost: 12, buyPrice: 22, sellPrice: 5,
    toHitBonus: 0, statEffects: fx(),
  },
  {
    slug: 'wolf_meat_raw', name: 'Raw Wolf Meat',
    description: 'Coarse, iron-rich meat from a slain wolf. Only the bold dare cook it.',
    itemType: ItemType.INGREDIENT, materialType: MaterialType.MEAT,
    weight: 1.0, cost: 15, buyPrice: 27, sellPrice: 6,
    toHitBonus: 0, statEffects: fx(),
  },
  {
    slug: 'bear_meat_raw', name: 'Raw Bear Meat',
    description: 'Enormous, fatty cuts from a hill bear. Requires hours of slow cooking.',
    itemType: ItemType.INGREDIENT, materialType: MaterialType.MEAT,
    weight: 2.0, cost: 20, buyPrice: 36, sellPrice: 8,
    toHitBonus: 0, statEffects: fx(),
  },
  {
    slug: 'rabbit_meat_raw', name: 'Raw Rabbit',
    description: 'Small, lean rabbit carcass. Quick-cooking and mild. A scout\'s reliable meal.',
    itemType: ItemType.INGREDIENT, materialType: MaterialType.MEAT,
    weight: 0.5, cost: 5, buyPrice: 9, sellPrice: 2,
    toHitBonus: 0, statEffects: fx(),
  },
  {
    slug: 'ox_meat_raw', name: 'Raw Ox Meat',
    description: 'Massive slabs of working-ox beef. Unmatched in richness; yields enormous portions.',
    itemType: ItemType.INGREDIENT, materialType: MaterialType.MEAT,
    weight: 3.0, cost: 25, buyPrice: 45, sellPrice: 10,
    toHitBonus: 0, statEffects: fx(),
  },
  {
    slug: 'lamb_meat_raw', name: 'Raw Lamb',
    description: 'Tender cuts of young lamb. Pairs beautifully with warm spices and saffron.',
    itemType: ItemType.INGREDIENT, materialType: MaterialType.MEAT,
    weight: 1.2, cost: 12, buyPrice: 22, sellPrice: 5,
    toHitBonus: 0, statEffects: fx(),
  },
  {
    slug: 'serpent_meat_raw', name: 'Raw Serpent Meat',
    description: 'Lean, pale meat from a pit viper. Slightly toxic raw; must be cooked thoroughly.',
    itemType: ItemType.INGREDIENT, materialType: MaterialType.MEAT,
    weight: 0.8, cost: 18, buyPrice: 32, sellPrice: 7,
    toHitBonus: 0, statEffects: fx(),
  },
  {
    slug: 'fish_raw', name: 'Raw Fish',
    description: 'A freshly caught river fish, scaled and gutted. Light and quick to cook.',
    itemType: ItemType.INGREDIENT, materialType: MaterialType.MEAT,
    weight: 0.8, cost: 4, buyPrice: 7, sellPrice: 2,
    toHitBonus: 0, statEffects: fx(),
  },
  {
    slug: 'clam', name: 'Clam',
    description: 'A briny shellfish pried from rocky tidal pools. Sweet when steamed, rich in chowder.',
    itemType: ItemType.INGREDIENT, materialType: MaterialType.MEAT,
    weight: 0.3, cost: 4, buyPrice: 7, sellPrice: 2,
    toHitBonus: 0, statEffects: fx(),
  },

  // ── MISC CRAFTING INPUTS ──────────────────────────────────────────────────
  {
    slug: 'wine_red', name: 'Red Wine',
    description: 'A corked bottle of dry red wine. Deglazes pans and enriches braises.',
    itemType: ItemType.INGREDIENT, materialType: MaterialType.NONE,
    weight: 0.75, cost: 10, buyPrice: 18, sellPrice: 4,
    toHitBonus: 0, statEffects: fx(),
  },
  {
    slug: 'bone', name: 'Bone',
    description: 'Large animal bones yielded from a carcass. Boiled for stock or ground to meal.',
    itemType: ItemType.INGREDIENT, materialType: MaterialType.BONE,
    weight: 0.5, cost: 3, buyPrice: 5, sellPrice: 1,
    toHitBonus: 0, statEffects: fx(),
  },
  {
    slug: 'bone_meal', name: 'Bone Meal',
    description: 'Finely ground and dried bone powder. Adds minerals and body to specialty breads.',
    itemType: ItemType.INGREDIENT, materialType: MaterialType.BONE,
    weight: 0.2, cost: 5, buyPrice: 9, sellPrice: 2,
    toHitBonus: 0, statEffects: fx(),
  },
  {
    slug: 'bread_scraps', name: 'Bread Scraps',
    description: 'Stale bread ends and crusts. Thicken soups or form the base of a peasant stew.',
    itemType: ItemType.INGREDIENT, materialType: MaterialType.GRAIN,
    weight: 0.3, cost: 1, buyPrice: 2, sellPrice: 0,
    toHitBonus: 0, statEffects: fx(),
  },

  // ── BREADS & BAKED GOODS ──────────────────────────────────────────────────
  {
    slug: 'plain_bread', name: 'Plain Bread',
    description: 'A simple loaf baked from flour and water. Staple food of the common folk.',
    itemType: ItemType.FOOD, materialType: MaterialType.GRAIN,
    weight: 0.3, cost: 5, buyPrice: 9, sellPrice: 2,
    toHitBonus: 0, statEffects: fx(),
  },
  {
    slug: 'wheat_loaf', name: 'Wheat Loaf',
    description: 'A soft, full-wheat loaf risen with yeast. Favoured by farmers and soldiers alike.',
    itemType: ItemType.FOOD, materialType: MaterialType.GRAIN,
    weight: 0.4, cost: 8, buyPrice: 14, sellPrice: 3,
    toHitBonus: 0, statEffects: fx(),
  },
  {
    slug: 'rye_bread', name: 'Rye Bread',
    description: 'Dense and hearty, this dark bread keeps a traveller full through long marches.',
    itemType: ItemType.FOOD, materialType: MaterialType.GRAIN,
    weight: 0.4, cost: 8, buyPrice: 14, sellPrice: 3,
    toHitBonus: 0, statEffects: fx(),
  },
  {
    slug: 'herb_flatbread', name: 'Herb Flatbread',
    description: 'Thin, crispy flatbread infused with aromatic herbs. Quick to make over a campfire.',
    itemType: ItemType.FOOD, materialType: MaterialType.GRAIN,
    weight: 0.2, cost: 12, buyPrice: 22, sellPrice: 5,
    toHitBonus: 0, statEffects: fx(),
  },
  {
    slug: 'seeded_bun', name: 'Seeded Bun',
    description: 'A soft bun topped with sesame and sunflower seeds. Popular at market stalls.',
    itemType: ItemType.FOOD, materialType: MaterialType.GRAIN,
    weight: 0.1, cost: 5, buyPrice: 9, sellPrice: 2,
    toHitBonus: 0, statEffects: fx(),
  },
  {
    slug: 'corn-biscuit', name: 'Corn Biscuit',
    description: 'A crumbly golden biscuit of coarse corn meal. Stores well on long journeys.',
    itemType: ItemType.FOOD, materialType: MaterialType.GRAIN,
    weight: 0.1, cost: 4, buyPrice: 7, sellPrice: 2,
    toHitBonus: 0, statEffects: fx(),
  },
  {
    slug: 'hardtack', name: 'Hardtack',
    description: 'An iron-hard campaign biscuit that lasts indefinitely. Beloved by sailors and mercenaries.',
    itemType: ItemType.FOOD, materialType: MaterialType.GRAIN,
    weight: 0.15, cost: 3, buyPrice: 5, sellPrice: 1,
    toHitBonus: 0, statEffects: fx(),
  },
  {
    slug: 'sweet_roll', name: 'Sweet Roll',
    description: 'A pillowy roll glazed with honey and dusted with cinnamon. Irresistible to all ages.',
    itemType: ItemType.FOOD, materialType: MaterialType.GRAIN,
    weight: 0.15, cost: 10, buyPrice: 18, sellPrice: 4,
    toHitBonus: 0, statEffects: fx(),
  },
  {
    slug: 'nut_bread', name: 'Nut Bread',
    description: 'A dense loaf studded with roasted walnuts and hazelnuts. Rich and sustaining.',
    itemType: ItemType.FOOD, materialType: MaterialType.GRAIN,
    weight: 0.4, cost: 20, buyPrice: 36, sellPrice: 8,
    toHitBonus: 0, statEffects: fx(),
  },
  {
    slug: 'sourdough_loaf', name: 'Sourdough Loaf',
    description: 'A master baker\'s pride — tangy, chewy crust. Requires a live starter and days of patience.',
    itemType: ItemType.FOOD, materialType: MaterialType.GRAIN,
    weight: 0.5, cost: 35, buyPrice: 63, sellPrice: 14,
    toHitBonus: 0, statEffects: fx(),
  },

  // ── COOKED MEAT ─────────────────────────────────────────────────────────
  {
    slug: 'roasted_chicken', name: 'Roasted Chicken',
    description: 'A whole chicken roasted over an open flame until golden and fragrant.',
    itemType: ItemType.MEAT, materialType: MaterialType.NONE,
    weight: 0.8, cost: 18, buyPrice: 32, sellPrice: 7,
    toHitBonus: 0, statEffects: fx(1),                          // STR+1
  },
  {
    slug: 'grilled_boar', name: 'rant.',
    description: 'Thick cuts of boar meat char-grilled over coals. Smoky, satisfying, and fortifying.',
    itemType: ItemType.MEAT, materialType: MaterialType.NONE,
    weight: 1.0, cost: 25, buyPrice: 45, sellPrice: 10,
    toHitBonus: 0, statEffects: fx(1, 0, 0, 1),                // STR+1 CON+1
  },
  {
    slug: 'smoked_venison', name: 'Smoked Venison',
    description: 'Venison slow-smoked over cherry wood. Rich, dark, and deeply aromatic.',
    itemType: ItemType.MEAT, materialType: MaterialType.NONE,
    weight: 1.0, cost: 40, buyPrice: 72, sellPrice: 16,
    toHitBonus: 0, statEffects: fx(2),                          // STR+2
  },
  {
    slug: 'seared_wolf_steak', name: 'Seared Wolf Steak',
    description: 'A thick slab of wolf meat seared on a cast-iron skillet. Grants a predator\'s edge.',
    itemType: ItemType.MEAT, materialType: MaterialType.NONE,
    weight: 0.8, cost: 45, buyPrice: 81, sellPrice: 18,
    toHitBonus: 0, statEffects: fx(2, 1),                       // STR+2 DEX+1
  },
  {
    slug: 'baked_fish', name: 'Baked Fish',
    description: 'A whole river fish baked in clay with lemon and herbs until perfectly tender.',
    itemType: ItemType.MEAT, materialType: MaterialType.NONE,
    weight: 0.6, cost: 15, buyPrice: 27, sellPrice: 6,
    toHitBonus: 0, statEffects: fx(0, 0, 1),                    // INT+1
  },
  {
    slug: 'bear_roast', name: 'Bear Roast',
    description: 'A massive haunch of bear meat slow-roasted for hours. Only experienced cooks attempt it.',
    itemType: ItemType.MEAT, materialType: MaterialType.NONE,
    weight: 2.0, cost: 80, buyPrice: 144, sellPrice: 32,
    toHitBonus: 0, statEffects: fx(3, 0, 0, 2),                // STR+3 CON+2
  },
  {
    slug: 'rabbit_skewer', name: 'Rabbit Skewer',
    description: 'Rabbit pieces threaded on a skewer and cooked over a campfire. Quick and filling.',
    itemType: ItemType.MEAT, materialType: MaterialType.NONE,
    weight: 0.4, cost: 8, buyPrice: 14, sellPrice: 3,
    toHitBonus: 0, statEffects: fx(0, 1),                       // DEX+1
  },
  {
    slug: 'dried_jerky', name: 'Dried Jerky',
    description: 'Strips of cured, dried meat that last for weeks without spoiling.',
    itemType: ItemType.MEAT, materialType: MaterialType.NONE,
    weight: 0.2, cost: 10, buyPrice: 18, sellPrice: 4,
    toHitBonus: 0, statEffects: fx(1),                          // STR+1
  },
  {
    slug: 'charred_serpent', name: 'Charred Serpent',
    description: 'A pit-viper roasted whole over embers. Gamey and tough, but prized by scouts for its resilience.',
    itemType: ItemType.MEAT, materialType: MaterialType.NONE,
    weight: 0.5, cost: 55, buyPrice: 99, sellPrice: 22,
    toHitBonus: 0, statEffects: fx(0, 0, 0, 2),                // CON+2
  },
  {
    slug: 'slow_cooked_ox', name: 'Slow-Cooked Ox',
    description: 'An entire ox shank braised for a full day. Rich, sticky, and magnificently restorative.',
    itemType: ItemType.MEAT, materialType: MaterialType.NONE,
    weight: 3.0, cost: 150, buyPrice: 270, sellPrice: 60,
    toHitBonus: 0, statEffects: fx(4, 0, 0, 3, 20),           // STR+4 CON+3 HP+20
  },

  // ── STEWS & SOUPS ─────────────────────────────────────────────────────────
  {
    slug: 'simple_stew', name: 'Simple Stew',
    description: 'A thin broth with root vegetables and scraps of meat. Hot and honest.',
    itemType: ItemType.FOOD, materialType: MaterialType.NONE,
    weight: 0.5, cost: 10, buyPrice: 18, sellPrice: 4,
    toHitBonus: 0, statEffects: fx(),
  },
  {
    slug: 'hearty_stew', name: 'Hearty Stew',
    description: 'A thick, robust stew packed with meat, vegetables, and seasoning.',
    itemType: ItemType.FOOD, materialType: MaterialType.NONE,
    weight: 0.6, cost: 25, buyPrice: 45, sellPrice: 10,
    toHitBonus: 0, statEffects: fx(0, 0, 0, 1, 10),           // CON+1 HP+10
  },
  {
    slug: 'mushroom_soup', name: 'Mushroom Soup',
    description: 'A velvety broth thick with forest mushrooms and wild herbs.',
    itemType: ItemType.FOOD, materialType: MaterialType.NONE,
    weight: 0.5, cost: 15, buyPrice: 27, sellPrice: 6,
    toHitBonus: 0, statEffects: fx(0, 0, 1),                    // INT+1
  },
  {
    slug: 'meat_and_root_stew', name: 'Meat and Root Stew',
    description: 'Braised boar chunks with parsnips and turnips in a dark, rich gravy.',
    itemType: ItemType.FOOD, materialType: MaterialType.NONE,
    weight: 0.7, cost: 35, buyPrice: 63, sellPrice: 14,
    toHitBonus: 0, statEffects: fx(1, 0, 0, 1),                // STR+1 CON+1
  },
  {
    slug: 'spiced_lamb_stew', name: 'Spiced Lamb Stew',
    description: 'A fragrant southern-style stew of tender lamb, saffron, and warming spices.',
    itemType: ItemType.FOOD, materialType: MaterialType.NONE,
    weight: 0.7, cost: 60, buyPrice: 108, sellPrice: 24,
    toHitBonus: 0, statEffects: fx(2, 0, 0, 1, 15),           // STR+2 CON+1 HP+15
  },
  {
    slug: 'bone_broth_stew', name: 'Bone Broth Stew',
    description: 'A restorative broth simmered from marrow bones for many hours.',
    itemType: ItemType.FOOD, materialType: MaterialType.NONE,
    weight: 0.6, cost: 30, buyPrice: 54, sellPrice: 12,
    toHitBonus: 0, statEffects: fx(0, 0, 0, 2, 10),           // CON+2 HP+10
  },
  {
    slug: 'seafood_chowder', name: 'Seafood Chowder',
    description: 'A creamy chowder thick with fish, shellfish, and potatoes.',
    itemType: ItemType.FOOD, materialType: MaterialType.NONE,
    weight: 0.7, cost: 65, buyPrice: 117, sellPrice: 26,
    toHitBonus: 0, statEffects: fx(0, 0, 2, 0, 15),           // INT+2 HP+15
  },
  {
    slug: 'wild_mushroom_stew', name: 'Wild Mushroom Stew',
    description: 'Three kinds of wild mushroom braised in red wine and herbs. Deeply umami and arcane.',
    itemType: ItemType.FOOD, materialType: MaterialType.NONE,
    weight: 0.7, cost: 80, buyPrice: 144, sellPrice: 32,
    toHitBonus: 0, statEffects: fx(0, 0, 2, 0, 0, 15),       // INT+2 MP+15
  },
  {
    slug: 'peasant_stew', name: 'Peasant Stew',
    description: 'Whatever\'s left in the pantry thrown in a pot. Reliable, humble, and comforting.',
    itemType: ItemType.FOOD, materialType: MaterialType.NONE,
    weight: 0.5, cost: 5, buyPrice: 9, sellPrice: 2,
    toHitBonus: 0, statEffects: fx(),
  },
  {
    slug: 'dragon_pepper_stew', name: 'Dragon Pepper Stew',
    description: 'An eye-watering stew laced with dragon pepper. Only fire-resistant tongues need apply.',
    itemType: ItemType.FOOD, materialType: MaterialType.NONE,
    weight: 0.6, cost: 120, buyPrice: 216, sellPrice: 48,
    toHitBonus: 0, statEffects: fx(3, 0, 0, 2, 20),           // STR+3 CON+2 HP+20
  },

  // ── TEAS & BREWED DRINK ──────────────────────────────────────────────────
  {
    slug: 'herbal_tea', name: 'Herbal Tea',
    description: 'A gentle blend of dried herbs steeped in hot water. Calming and mildly restorative.',
    itemType: ItemType.DRINK, materialType: MaterialType.NONE,
    weight: 0.3, cost: 5, buyPrice: 9, sellPrice: 2,
    toHitBonus: 0, statEffects: fx(0, 0, 0, 0, 5),            // HP+5
  },
  {
    slug: 'ginger_root_tea', name: 'Ginger Root Tea',
    description: 'Hot ginger-root tea that warms the body from core to extremity.',
    itemType: ItemType.DRINK, materialType: MaterialType.NONE,
    weight: 0.3, cost: 10, buyPrice: 18, sellPrice: 4,
    toHitBonus: 0, statEffects: fx(0, 0, 0, 1, 5),            // CON+1 HP+5
  },
  {
    slug: 'chamomile_tea', name: 'Chamomile Tea',
    description: 'A mild, golden infusion of chamomile flowers. Eases tension and restores focus.',
    itemType: ItemType.DRINK, materialType: MaterialType.NONE,
    weight: 0.3, cost: 12, buyPrice: 22, sellPrice: 5,
    toHitBonus: 0, statEffects: fx(0, 0, 0, 0, 0, 5),         // MP+5
  },
  {
    slug: 'thornberry_tea', name: 'Thornberry Tea',
    description: 'A tart, ruby-red tea brewed from dried thornberries. Mildly healing.',
    itemType: ItemType.DRINK, materialType: MaterialType.NONE,
    weight: 0.3, cost: 18, buyPrice: 32, sellPrice: 7,
    toHitBonus: 0, statEffects: fx(0, 0, 0, 0, 10),           // HP+10
  },
  {
    slug: 'moonleaf_tea', name: 'Moonleaf Tea',
    description: 'A silvery, faintly glowing tea of moonleaf. Quietly restores mental clarity and mana.',
    itemType: ItemType.DRINK, materialType: MaterialType.NONE,
    weight: 0.3, cost: 55, buyPrice: 99, sellPrice: 22,
    toHitBonus: 0, statEffects: fx(0, 0, 2, 0, 0, 20),        // INT+2 MP+20
  },
  {
    slug: 'emberbark_tea', name: 'Emberbark Tea',
    description: 'Brewed from the inner bark of the embertree. Warms the drinker in the bitterest cold.',
    itemType: ItemType.DRINK, materialType: MaterialType.NONE,
    weight: 0.3, cost: 45, buyPrice: 81, sellPrice: 18,
    toHitBonus: 0, statEffects: fx(0, 0, 0, 2, 15),           // CON+2 HP+15
  },
  {
    slug: 'frost_thistle_tea', name: 'Frost Thistle Tea',
    description: 'A pale-blue icy brew of frost thistle. Grants brief resistance to scorching heat.',
    itemType: ItemType.DRINK, materialType: MaterialType.NONE,
    weight: 0.3, cost: 65, buyPrice: 117, sellPrice: 26,
    toHitBonus: 0, statEffects: fx(0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 3), // CON+2 SR+3
  },
  {
    slug: 'sages_brew', name: 'Sage\'s Brew',
    description: 'An ancient alchemist\'s tea of seven herbs. Sharpens perception and amplifies spell focus.',
    itemType: ItemType.DRINK, materialType: MaterialType.NONE,
    weight: 0.3, cost: 200, buyPrice: 360, sellPrice: 80,
    toHitBonus: 0, statEffects: fx(0, 0, 4, 0, 0, 40, 0, 0, 0, 0, 0, 0, 5), // INT+4 MP+40 SR+5
  },

  // ── MEAL & PLATTERS ──────────────────────────────────────────────────────
  {
    slug: 'grain_porridge', name: 'Grain Porridge',
    description: 'Slow-simmered oats and grains. A wholesome morning meal for long days ahead.',
    itemType: ItemType.MEAL, materialType: MaterialType.NONE,
    weight: 0.5, cost: 6, buyPrice: 11, sellPrice: 2,
    toHitBonus: 0, statEffects: fx(0, 0, 0, 1),                // CON+1
  },
  {
    slug: 'travelers_ration', name: 'Traveller\'s Ration',
    description: 'A wrapped bundle of dried meat, hard cheese, and biscuit for long journeys.',
    itemType: ItemType.MEAL, materialType: MaterialType.NONE,
    weight: 0.4, cost: 20, buyPrice: 36, sellPrice: 8,
    toHitBonus: 0, statEffects: fx(0, 0, 0, 1, 5),            // CON+1 HP+5
  },
  {
    slug: 'vegetable_medley', name: 'Vegetable Medley',
    description: 'A colourful plate of roasted seasonal vegetables drizzled with herb oil.',
    itemType: ItemType.MEAL, materialType: MaterialType.NONE,
    weight: 0.5, cost: 15, buyPrice: 27, sellPrice: 6,
    toHitBonus: 0, statEffects: fx(0, 0, 0, 1, 5),            // CON+1 HP+5
  },
  {
    slug: 'hunters_feast', name: 'Hunter\'s Feast',
    description: 'A full spread of game meat, roasted vegetables, and fresh bread. Fit for a hunting party.',
    itemType: ItemType.MEAL, materialType: MaterialType.NONE,
    weight: 1.5, cost: 120, buyPrice: 216, sellPrice: 48,
    toHitBonus: 0, statEffects: fx(3, 2, 0, 0, 25),           // STR+3 DEX+2 HP+25
  },
  {
    slug: 'fishermans_platter', name: 'Fisherman\'s Platter',
    description: 'A seaside spread of baked fish, chowder, and fresh rolls. Restores stamina and focus.',
    itemType: ItemType.MEAL, materialType: MaterialType.NONE,
    weight: 1.2, cost: 110, buyPrice: 198, sellPrice: 44,
    toHitBonus: 0, statEffects: fx(0, 2, 2, 0, 20, 15),       // DEX+2 INT+2 HP+20 MP+15
  },
  {
    slug: 'feast_of_kings', name: 'Feast of Kings',
    description: 'A legendary banquet platter requiring a master cook. Bestows powerful group buffs for hours.',
    itemType: ItemType.MEAL, materialType: MaterialType.NONE,
    weight: 5.0, cost: 2000, buyPrice: 3600, sellPrice: 800,
    toHitBonus: 0, statEffects: fx(5, 5, 5, 5, 100, 100, 5, 5, 5, 5),
    // STR+5 DEX+5 INT+5 CON+5 HP+100 MP+100 toHit+5 dodge+5 critChance+5 critDamage+5
  },

  // ── BUFF FOOD ────────────────────────────────────────────────────────────
  {
    slug: 'strength_biscuit', name: 'Strength Biscuit',
    description: 'A dense, iron-rich biscuit fortified with ironroot extract. Temporarily boosts Strength.',
    itemType: ItemType.MEAL, materialType: MaterialType.NONE,
    weight: 0.15, cost: 80, buyPrice: 144, sellPrice: 32,
    toHitBonus: 0, statEffects: fx(4),                          // STR+4
  },
  {
    slug: 'swiftfoot_jerky', name: 'Swiftfoot Jerky',
    description: 'Rabbit and swiftvine jerky dried to perfection. Grants a burst of movement speed.',
    itemType: ItemType.MEAL, materialType: MaterialType.NONE,
    weight: 0.1, cost: 75, buyPrice: 135, sellPrice: 30,
    toHitBonus: 0, statEffects: fx(0, 4, 0, 0, 0, 0, 0, 3),  // DEX+4 dodge+3
  },
  {
    slug: 'sharpened_mind_soup', name: 'Sharpened Mind Soup',
    description: 'A crystal-clear broth of moonleaf and sea vegetables. Enhances Intelligence and spell power.',
    itemType: ItemType.MEAL, materialType: MaterialType.NONE,
    weight: 0.4, cost: 110, buyPrice: 198, sellPrice: 44,
    toHitBonus: 0, statEffects: fx(0, 0, 5, 0, 0, 40),        // INT+5 MP+40
  },
  {
    slug: 'iron_gut_steak', name: 'Iron Gut Steak',
    description: 'A slab of bear meat marinated in ironroot brine and grilled. Boosts Defense and HP regen.',
    itemType: ItemType.MEAL, materialType: MaterialType.NONE,
    weight: 0.8, cost: 130, buyPrice: 234, sellPrice: 52,
    toHitBonus: 0, statEffects: fx(0, 0, 0, 4, 40, 0, 0, 0, 0, 0, 0, 3), // CON+4 HP+40 DR+3
  },
  {
    slug: 'lucky_cookie', name: 'Lucky Cookie',
    description: 'A suspiciously shiny fortune cookie dusted with gold powder. Raises Luck for one encounter.',
    itemType: ItemType.MEAL, materialType: MaterialType.NONE,
    weight: 0.05, cost: 90, buyPrice: 162, sellPrice: 36,
    toHitBonus: 0, statEffects: fx(0, 0, 0, 0, 0, 0, 5, 0, 5), // toHit+5 critChance+5
  },
  {
    slug: 'viper_stew', name: 'Viper Stew',
    description: 'A potent stew of serpent meat and nightshade herbs. Temporarily grants poison immunity.',
    itemType: ItemType.MEAL, materialType: MaterialType.NONE,
    weight: 0.5, cost: 200, buyPrice: 360, sellPrice: 80,
    toHitBonus: 0, statEffects: fx(0, 0, 0, 5, 0, 0, 0, 0, 0, 0, 0, 2, 8), // CON+5 DR+2 SR+8
  },
  {
    slug: 'battle_bread', name: 'Battle Bread',
    description: 'A rough, charcoal-dusted loaf fortified with bone meal. Raises max HP for the battle ahead.',
    itemType: ItemType.MEAL, materialType: MaterialType.NONE,
    weight: 0.3, cost: 160, buyPrice: 288, sellPrice: 64,
    toHitBonus: 0, statEffects: fx(0, 0, 0, 4, 50, 0, 0, 0, 0, 0, 0, 2), // CON+4 HP+50 DR+2
  },
  {
    slug: 'mana_muffin', name: 'Mana Muffin',
    description: 'A fluffy muffin shimmering with moonleaf essence. Instantly restores a portion of Mana.',
    itemType: ItemType.MEAL, materialType: MaterialType.NONE,
    weight: 0.1, cost: 120, buyPrice: 216, sellPrice: 48,
    toHitBonus: 0, statEffects: fx(0, 0, 3, 0, 0, 60),        // INT+3 MP+60
  },


  // ── PANTRY STAPLES ────────────────────────────────────────────────────────
  {
    slug: 'flour',
    name: 'Flour',
    description: 'Finely milled wheat flour. The backbone of every baker\'s pantry.',
    itemType: ItemType.INGREDIENT, materialType: MaterialType.GRAIN,
    weight: 0.5, cost: 2, buyPrice: 4, sellPrice: 1,
    toHitBonus: 0, statEffects: fx(),
  },
  {
    slug: 'rye_flour',
    name: 'Rye Flour',
    description: 'Coarse, dark flour ground from rye grain. Gives bread its dense, earthy character.',
    itemType: ItemType.INGREDIENT, materialType: MaterialType.GRAIN,
    weight: 0.5, cost: 2, buyPrice: 4, sellPrice: 1,
    toHitBonus: 0, statEffects: fx(),
  },
  {
    slug: 'corn_meal',
    name: 'Corn Meal',
    description: 'Coarsely ground dried corn. Used for biscuits, porridges, and traveller\'s bread.',
    itemType: ItemType.INGREDIENT, materialType: MaterialType.GRAIN,
    weight: 0.5, cost: 2, buyPrice: 4, sellPrice: 1,
    toHitBonus: 0, statEffects: fx(),
  },
  {
    slug: 'oats',
    name: 'Oats',
    description: 'Rolled oats, slow to digest and endlessly filling. A staple of northern folk.',
    itemType: ItemType.INGREDIENT, materialType: MaterialType.GRAIN,
    weight: 0.5, cost: 2, buyPrice: 4, sellPrice: 1,
    toHitBonus: 0, statEffects: fx(),
  },
  {
    slug: 'water',
    name: 'Water',
    description: 'Clean, fresh water drawn from a river or well. Required in nearly every recipe.',
    itemType: ItemType.INGREDIENT, materialType: MaterialType.NONE,
    weight: 1.0, cost: 1, buyPrice: 2, sellPrice: 0,
    toHitBonus: 0, statEffects: fx(),
  },
  {
    slug: 'crystal_water',
    name: 'Crystal Water',
    description: 'Purified spring water charged with ambient mana. Intensifies magical recipes.',
    itemType: ItemType.INGREDIENT, materialType: MaterialType.MINERAL,
    weight: 0.5, cost: 15, buyPrice: 27, sellPrice: 6,
    toHitBonus: 0, statEffects: fx(),
  },
  {
    slug: 'salt',
    name: 'Salt',
    description: 'Common rock salt. Seasons food, cures meat, and preserves rations.',
    itemType: ItemType.INGREDIENT, materialType: MaterialType.MINERAL,
    weight: 0.1, cost: 1, buyPrice: 2, sellPrice: 0,
    toHitBonus: 0, statEffects: fx(),
  },
  {
    slug: 'sugar',
    name: 'Sugar',
    description: 'Refined cane sugar. Sweetens baked goods and brewed beverages.',
    itemType: ItemType.INGREDIENT, materialType: MaterialType.PLANT,
    weight: 0.2, cost: 3, buyPrice: 5, sellPrice: 1,
    toHitBonus: 0, statEffects: fx(),
  },
  {
    slug: 'yeast',
    name: 'Yeast',
    description: 'A small crock of active yeast culture. Makes dough rise and fermentation happen.',
    itemType: ItemType.INGREDIENT, materialType: MaterialType.PLANT,
    weight: 0.1, cost: 2, buyPrice: 4, sellPrice: 1,
    toHitBonus: 0, statEffects: fx(),
  },
  {
    slug: 'sourdough_starter',
    name: 'Sourdough Starter',
    description: 'A living culture of wild yeast and bacteria. Must be fed daily or it perishes.',
    itemType: ItemType.INGREDIENT, materialType: MaterialType.NONE,
    weight: 0.3, cost: 10, buyPrice: 18, sellPrice: 4,
    toHitBonus: 0, statEffects: fx(),
  },
  {
    slug: 'oil_cooking',
    name: 'Cooking Oil',
    description: 'Pressed sunflower or olive oil. Prevents sticking and carries flavour.',
    itemType: ItemType.INGREDIENT, materialType: MaterialType.PLANT,
    weight: 0.3, cost: 3, buyPrice: 5, sellPrice: 1,
    toHitBonus: 0, statEffects: fx(),
  },
  {
    slug: 'honey',
    name: 'Honey',
    description: 'Golden wildflower honey harvested from forest hives. Sweet and mildly magical.',
    itemType: ItemType.INGREDIENT, materialType: MaterialType.PLANT,
    weight: 0.5, cost: 5, buyPrice: 9, sellPrice: 2,
    toHitBonus: 0, statEffects: fx(),
  },

  // ── DAIRY & EGGS ──────────────────────────────────────────────────────────
  {
    slug: 'milk', name: 'Milk',
    description: 'Fresh whole milk from a farmstead cow. Rich, creamy, and quick to spoil.',
    itemType: ItemType.INGREDIENT, materialType: MaterialType.NONE,
    weight: 0.5, cost: 2, buyPrice: 4, sellPrice: 1,
    toHitBonus: 0, statEffects: fx(),
  },
  {
    slug: 'butter', name: 'Butter',
    description: 'Churned cream butter, salted for keeping. Essential in fine baking.',
    itemType: ItemType.INGREDIENT, materialType: MaterialType.NONE,
    weight: 0.2, cost: 3, buyPrice: 5, sellPrice: 1,
    toHitBonus: 0, statEffects: fx(),
  },
  {
    slug: 'hard_cheese', name: 'Hard Cheese',
    description: 'A firm, aged wheel of cheese. Sharp in flavour and long-lasting in a pack.',
    itemType: ItemType.INGREDIENT, materialType: MaterialType.NONE,
    weight: 0.3, cost: 8, buyPrice: 14, sellPrice: 3,
    toHitBonus: 0, statEffects: fx(),
  },
  {
    slug: 'egg', name: 'Egg',
    description: 'A large hen\'s egg. Binds doughs, enriches batters, and scrambles in seconds.',
    itemType: ItemType.INGREDIENT, materialType: MaterialType.NONE,
    weight: 0.1, cost: 2, buyPrice: 4, sellPrice: 1,
    toHitBonus: 0, statEffects: fx(),
  },

  // ── PRODUCE & FUNGI ───────────────────────────────────────────────────────
  {
    slug: 'carrot', name: 'Carrot',
    description: 'A plump orange root vegetable. Sweet when roasted, hearty when stewed.',
    itemType: ItemType.INGREDIENT, materialType: MaterialType.PLANT,
    weight: 0.2, cost: 1, buyPrice: 2, sellPrice: 0,
    toHitBonus: 0, statEffects: fx(),
  },
  {
    slug: 'potato', name: 'Potato',
    description: 'A starchy tuber that fills any pot. Foundational to stews and chowders.',
    itemType: ItemType.INGREDIENT, materialType: MaterialType.PLANT,
    weight: 0.3, cost: 1, buyPrice: 2, sellPrice: 0,
    toHitBonus: 0, statEffects: fx(),
  },
  {
    slug: 'onion', name: 'Onion',
    description: 'A pungent bulb that sweetens with heat. Nearly every savoury recipe demands one.',
    itemType: ItemType.INGREDIENT, materialType: MaterialType.PLANT,
    weight: 0.15, cost: 1, buyPrice: 2, sellPrice: 0,
    toHitBonus: 0, statEffects: fx(),
  },
  {
    slug: 'parsnip', name: 'Parsnip',
    description: 'A pale, nutty root vegetable. Adds a subtle sweetness to hearty stews.',
    itemType: ItemType.INGREDIENT, materialType: MaterialType.PLANT,
    weight: 0.2, cost: 2, buyPrice: 4, sellPrice: 1,
    toHitBonus: 0, statEffects: fx(),
  },
  {
    slug: 'turnip', name: 'Turnip',
    description: 'A firm, slightly peppery root. Reliable cold-season crop beloved by farmers.',
    itemType: ItemType.INGREDIENT, materialType: MaterialType.PLANT,
    weight: 0.2, cost: 2, buyPrice: 4, sellPrice: 1,
    toHitBonus: 0, statEffects: fx(),
  },
  {
    slug: 'garlic', name: 'Garlic',
    description: 'A head of pungent garlic cloves. Also rumoured to ward off lesser spirits.',
    itemType: ItemType.INGREDIENT, materialType: MaterialType.PLANT,
    weight: 0.1, cost: 2, buyPrice: 4, sellPrice: 1,
    toHitBonus: 0, statEffects: fx(),
  },
  {
    slug: 'lemon', name: 'Lemon',
    description: 'A bright, tart citrus fruit. Lifts the flavour of fish and cuts through fat.',
    itemType: ItemType.INGREDIENT, materialType: MaterialType.PLANT,
    weight: 0.1, cost: 2, buyPrice: 4, sellPrice: 1,
    toHitBonus: 0, statEffects: fx(),
  },
  {
    slug: 'root_vegetables', name: 'Root Vegetables',
    description: 'A mixed bundle of seasonal roots — parsnip, carrot, and turnip.',
    itemType: ItemType.INGREDIENT, materialType: MaterialType.PLANT,
    weight: 0.5, cost: 3, buyPrice: 5, sellPrice: 1,
    toHitBonus: 0, statEffects: fx(),
  },
  {
    slug: 'sea_vegetable', name: 'Sea Vegetable',
    description: 'Dried coastal kelp and seaweed. Deeply savoury; enhances magical brews.',
    itemType: ItemType.INGREDIENT, materialType: MaterialType.PLANT,
    weight: 0.3, cost: 8, buyPrice: 14, sellPrice: 3,
    toHitBonus: 0, statEffects: fx(),
  },
  {
    slug: 'mushroom', name: 'Mushroom',
    description: 'Common forest button mushroom. Earthy, meaty, and versatile in any pot.',
    itemType: ItemType.INGREDIENT, materialType: MaterialType.PLANT,
    weight: 0.2, cost: 3, buyPrice: 5, sellPrice: 1,
    toHitBonus: 0, statEffects: fx(),
  },
  {
    slug: 'mushroom_rare', name: 'Rare Mushroom',
    description: 'A luminous cap-mushroom found only in old-growth glades. Intensely flavoured.',
    itemType: ItemType.INGREDIENT, materialType: MaterialType.PLANT,
    weight: 0.2, cost: 25, buyPrice: 45, sellPrice: 10,
    toHitBonus: 0, statEffects: fx(),
  },
  {
    slug: 'mushroom_black', name: 'Black Mushroom',
    description: 'A jet-black truffle-like mushroom of deep caverns. Potent and faintly toxic raw.',
    itemType: ItemType.INGREDIENT, materialType: MaterialType.PLANT,
    weight: 0.2, cost: 40, buyPrice: 72, sellPrice: 16,
    toHitBonus: 0, statEffects: fx(),
  },
  {
    slug: 'four_leaf_clover', name: 'Four-Leaf Clover',
    description: 'A rare clover said to concentrate residual luck in its leaves.',
    itemType: ItemType.INGREDIENT, materialType: MaterialType.PLANT,
    weight: 0.05, cost: 20, buyPrice: 36, sellPrice: 8,
    toHitBonus: 0, statEffects: fx(),
  },
  {
    slug: 'seed_mix', name: 'Seed Mix',
    description: 'Sesame, sunflower, and poppy seeds blended for baking toppings.',
    itemType: ItemType.INGREDIENT, materialType: MaterialType.PLANT,
    weight: 0.2, cost: 3, buyPrice: 5, sellPrice: 1,
    toHitBonus: 0, statEffects: fx(),
  },
  {
    slug: 'walnut', name: 'Walnut',
    description: 'A rich, slightly bitter tree nut. Adds depth to breads and pastries.',
    itemType: ItemType.INGREDIENT, materialType: MaterialType.PLANT,
    weight: 0.1, cost: 4, buyPrice: 7, sellPrice: 2,
    toHitBonus: 0, statEffects: fx(),
  },
  {
    slug: 'hazelnut', name: 'Hazelnut',
    description: 'A small, sweet nut foraged from hedgerow bushes. Pairs beautifully with honey.',
    itemType: ItemType.INGREDIENT, materialType: MaterialType.PLANT,
    weight: 0.1, cost: 4, buyPrice: 7, sellPrice: 2,
    toHitBonus: 0, statEffects: fx(),
  },

  // ── SPICES & SEASONINGS ───────────────────────────────────────────────────
  {
    slug: 'pepper_spice', name: 'Black Pepper',
    description: 'Cracked black peppercorns. Adds heat and sharpness to meat dishes.',
    itemType: ItemType.INGREDIENT, materialType: MaterialType.PLANT,
    weight: 0.1, cost: 3, buyPrice: 5, sellPrice: 1,
    toHitBonus: 0, statEffects: fx(),
  },
  {
    slug: 'cinnamon_spice', name: 'Cinnamon',
    description: 'Warm, aromatic bark spice from southern forests. Used in sweet and savoury dishes.',
    itemType: ItemType.INGREDIENT, materialType: MaterialType.PLANT,
    weight: 0.1, cost: 4, buyPrice: 7, sellPrice: 2,
    toHitBonus: 0, statEffects: fx(),
  },
  {
    slug: 'dragon_pepper', name: 'Dragon Pepper',
    description: 'A small, wrinkled pepper that burns like dragonfire. Handle with care.',
    itemType: ItemType.INGREDIENT, materialType: MaterialType.PLANT,
    weight: 0.1, cost: 35, buyPrice: 63, sellPrice: 14,
    toHitBonus: 0, statEffects: fx(),
  },
  {
    slug: 'saffron', name: 'Saffron',
    description: 'Crimson threads of the rarest spice. Precious enough to be traded by the strand.',
    itemType: ItemType.INGREDIENT, materialType: MaterialType.MINERAL,
    weight: 0.05, cost: 50, buyPrice: 90, sellPrice: 20,
    toHitBonus: 0, statEffects: fx(),
  },
  {
    slug: 'caraway_seed', name: 'Caraway Seed',
    description: 'Small, crescent-shaped seeds with a bold anise flavour. Classic in rye bread.',
    itemType: ItemType.INGREDIENT, materialType: MaterialType.PLANT,
    weight: 0.05, cost: 3, buyPrice: 5, sellPrice: 1,
    toHitBonus: 0, statEffects: fx(),
  },

  // ── FORAGED & BREWED ─────────────────────────────────────────────────────
  {
    slug: 'herbs_common', name: 'Common Herbs',
    description: 'A bundle of rosemary, thyme, and sage. Freshly cut from a kitchen garden.',
    itemType: ItemType.INGREDIENT, materialType: MaterialType.PLANT,
    weight: 0.1, cost: 2, buyPrice: 4, sellPrice: 1,
    toHitBonus: 0, statEffects: fx(),
  },
  {
    slug: 'ginger_root', name: 'Ginger Root',
    description: 'A knobbly, fibrous root with fierce heat and medicinal warmth.',
    itemType: ItemType.INGREDIENT, materialType: MaterialType.PLANT,
    weight: 0.2, cost: 4, buyPrice: 7, sellPrice: 2,
    toHitBonus: 0, statEffects: fx(),
  },
  {
    slug: 'chamomile_flower', name: 'Chamomile Flower',
    description: 'Dried daisy-like flowers that steep into a golden, calming tea.',
    itemType: ItemType.INGREDIENT, materialType: MaterialType.PLANT,
    weight: 0.1, cost: 5, buyPrice: 9, sellPrice: 2,
    toHitBonus: 0, statEffects: fx(),
  },
  {
    slug: 'thornberry', name: 'Thornberry',
    description: 'A tart red berry guarded by inch-long thorns. Mildly healing when brewed.',
    itemType: ItemType.INGREDIENT, materialType: MaterialType.PLANT,
    weight: 0.1, cost: 8, buyPrice: 14, sellPrice: 3,
    toHitBonus: 0, statEffects: fx(),
  },
  {
    slug: 'moonleaf', name: 'Moonleaf',
    description: 'A silver-veined leaf that shimmers in darkness. Found only beneath a new moon.',
    itemType: ItemType.INGREDIENT, materialType: MaterialType.PLANT,
    weight: 0.1, cost: 40, buyPrice: 72, sellPrice: 16,
    toHitBonus: 0, statEffects: fx(),
  },
  {
    slug: 'emberbark', name: 'Emberbark',
    description: 'Inner bark of the embertree, warm to the touch even when dried.',
    itemType: ItemType.INGREDIENT, materialType: MaterialType.PLANT,
    weight: 0.3, cost: 30, buyPrice: 54, sellPrice: 12,
    toHitBonus: 0, statEffects: fx(),
  },
  {
    slug: 'frost_thistle', name: 'Frost Thistle',
    description: 'A pale-blue thistle found at altitude. Ice-cold to the touch, never melts.',
    itemType: ItemType.INGREDIENT, materialType: MaterialType.PLANT,
    weight: 0.1, cost: 45, buyPrice: 81, sellPrice: 18,
    toHitBonus: 0, statEffects: fx(),
  },
  {
    slug: 'sages_herb', name: 'Sage\'s Herb',
    description: 'A legendary seven-petaled herb said to grow only at ley-line crossings.',
    itemType: ItemType.INGREDIENT, materialType: MaterialType.PLANT,
    weight: 0.1, cost: 60, buyPrice: 108, sellPrice: 24,
    toHitBonus: 0, statEffects: fx(),
  },
  {
    slug: 'cherry_wood_chips', name: 'Cherry Wood Chips',
    description: 'Fragrant chips of cherry wood used to cold-smoke meat and fish.',
    itemType: ItemType.INGREDIENT, materialType: MaterialType.WOOD,
    weight: 0.5, cost: 5, buyPrice: 9, sellPrice: 2,
    toHitBonus: 0, statEffects: fx(),
  },

  // ── RAW MEAT & SEAFOOD ───────────────────────────────────────────────────
  {
    slug: 'meat_raw', name: 'Raw Meat',
    description: 'Generic cuts of unspecified game meat. Useful as a base for any meat recipe.',
    itemType: ItemType.INGREDIENT, materialType: MaterialType.MEAT,
    weight: 0.5, cost: 5, buyPrice: 9, sellPrice: 2,
    toHitBonus: 0, statEffects: fx(),
  },
  {
    slug: 'chicken_raw', name: 'Raw Chicken',
    description: 'A whole plucked chicken ready for the spit. Mild flavour, widely available.',
    itemType: ItemType.INGREDIENT, materialType: MaterialType.MEAT,
    weight: 1.0, cost: 6, buyPrice: 11, sellPrice: 2,
    toHitBonus: 0, statEffects: fx(),
  },
  {
    slug: 'boar_meat_raw', name: 'Raw Boar Meat',
    description: 'Thick, dark cuts from a forest boar. Rich and gamey, prized by hunters.',
    itemType: ItemType.INGREDIENT, materialType: MaterialType.MEAT,
    weight: 1.5, cost: 10, buyPrice: 18, sellPrice: 4,
    toHitBonus: 0, statEffects: fx(),
  },
  {
    slug: 'venison_raw', name: 'Raw Venison',
    description: 'Lean, rosy cuts of deer haunch. Tender and delicate with a grassy finish.',
    itemType: ItemType.INGREDIENT, materialType: MaterialType.MEAT,
    weight: 1.5, cost: 12, buyPrice: 22, sellPrice: 5,
    toHitBonus: 0, statEffects: fx(),
  },
  {
    slug: 'wolf_meat_raw', name: 'Raw Wolf Meat',
    description: 'Coarse, iron-rich meat from a slain wolf. Only the bold dare cook it.',
    itemType: ItemType.INGREDIENT, materialType: MaterialType.MEAT,
    weight: 1.0, cost: 15, buyPrice: 27, sellPrice: 6,
    toHitBonus: 0, statEffects: fx(),
  },
  {
    slug: 'bear_meat_raw', name: 'Raw Bear Meat',
    description: 'Enormous, fatty cuts from a hill bear. Requires hours of slow cooking.',
    itemType: ItemType.INGREDIENT, materialType: MaterialType.MEAT,
    weight: 2.0, cost: 20, buyPrice: 36, sellPrice: 8,
    toHitBonus: 0, statEffects: fx(),
  },
  {
    slug: 'rabbit_meat_raw', name: 'Raw Rabbit',
    description: 'Small, lean rabbit carcass. Quick-cooking and mild. A scout\'s reliable meal.',
    itemType: ItemType.INGREDIENT, materialType: MaterialType.MEAT,
    weight: 0.5, cost: 5, buyPrice: 9, sellPrice: 2,
    toHitBonus: 0, statEffects: fx(),
  },
  {
    slug: 'ox_meat_raw', name: 'Raw Ox Meat',
    description: 'Massive slabs of working-ox beef. Unmatched in richness; yields enormous portions.',
    itemType: ItemType.INGREDIENT, materialType: MaterialType.MEAT,
    weight: 3.0, cost: 25, buyPrice: 45, sellPrice: 10,
    toHitBonus: 0, statEffects: fx(),
  },
  {
    slug: 'lamb_meat_raw', name: 'Raw Lamb',
    description: 'Tender cuts of young lamb. Pairs beautifully with warm spices and saffron.',
    itemType: ItemType.INGREDIENT, materialType: MaterialType.MEAT,
    weight: 1.2, cost: 12, buyPrice: 22, sellPrice: 5,
    toHitBonus: 0, statEffects: fx(),
  },
  {
    slug: 'serpent_meat_raw', name: 'Raw Serpent Meat',
    description: 'Lean, pale meat from a pit viper. Slightly toxic raw; must be cooked thoroughly.',
    itemType: ItemType.INGREDIENT, materialType: MaterialType.MEAT,
    weight: 0.8, cost: 18, buyPrice: 32, sellPrice: 7,
    toHitBonus: 0, statEffects: fx(),
  },
  {
    slug: 'fish_raw', name: 'Raw Fish',
    description: 'A freshly caught river fish, scaled and gutted. Light and quick to cook.',
    itemType: ItemType.INGREDIENT, materialType: MaterialType.MEAT,
    weight: 0.8, cost: 4, buyPrice: 7, sellPrice: 2,
    toHitBonus: 0, statEffects: fx(),
  },
  {
    slug: 'clam', name: 'Clam',
    description: 'A briny shellfish pried from rocky tidal pools. Sweet when steamed, rich in chowder.',
    itemType: ItemType.INGREDIENT, materialType: MaterialType.MEAT,
    weight: 0.3, cost: 4, buyPrice: 7, sellPrice: 2,
    toHitBonus: 0, statEffects: fx(),
  },

  // ── MISC CRAFTING INPUTS ──────────────────────────────────────────────────
  {
    slug: 'wine_red', name: 'Red Wine',
    description: 'A corked bottle of dry red wine. Deglazes pans and enriches braises.',
    itemType: ItemType.INGREDIENT, materialType: MaterialType.NONE,
    weight: 0.75, cost: 10, buyPrice: 18, sellPrice: 4,
    toHitBonus: 0, statEffects: fx(),
  },
  {
    slug: 'bone', name: 'Bone',
    description: 'Large animal bones yielded from a carcass. Boiled for stock or ground to meal.',
    itemType: ItemType.INGREDIENT, materialType: MaterialType.BONE,
    weight: 0.5, cost: 3, buyPrice: 5, sellPrice: 1,
    toHitBonus: 0, statEffects: fx(),
  },
  {
    slug: 'bone_meal', name: 'Bone Meal',
    description: 'Finely ground and dried bone powder. Adds minerals and body to specialty breads.',
    itemType: ItemType.INGREDIENT, materialType: MaterialType.BONE,
    weight: 0.2, cost: 5, buyPrice: 9, sellPrice: 2,
    toHitBonus: 0, statEffects: fx(),
  },
  {
    slug: 'bread_scraps', name: 'Bread Scraps',
    description: 'Stale bread ends and crusts. Thicken soups or form the base of a peasant stew.',
    itemType: ItemType.INGREDIENT, materialType: MaterialType.GRAIN,
    weight: 0.3, cost: 1, buyPrice: 2, sellPrice: 0,
    toHitBonus: 0, statEffects: fx(),
  },

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
  {
    slug: 'berserkers_roast',
    name: 'Berserker\'s Roast',
    description: 'Massive wolf and boar cuts spiked with dragon pepper. Unleashes fury — STR, attack speed, and crits surge at the cost of composure.',
    itemType: ItemType.FOOD,
    materialType: MaterialType.NONE,
    weight: 1.5, cost: 350, buyPrice: 630, sellPrice: 140,
    toHitBonus: 0, statEffects: fx(8, 4, 0, 0, 20, 0, 5, 0, 8, 10),
    // STR+8 DEX+4 HP+20 toHit+5 critChance+8 critDamage+10
  },

  // -------------------------
  // BASIC COOKING INGREDIENT
  // -------------------------
  { slug: "grain", name: "Grain", description: "Raw grain.", itemType: ItemType.INGREDIENT, materialType: MaterialType.PLANT,
    weight: 0.1, cost: 1, buyPrice: 2, sellPrice: 0, toHitBonus: 0, statEffects: fx(0,0,0,0, 0,0, 0,0, 0,0,0, 0,0, 0, 2, 0) },

  { slug: "water", name: "Water", description: "Clean drinking water.", itemType: ItemType.INGREDIENT, materialType: MaterialType.LIQUID,
    weight: 0.5, cost: 1, buyPrice: 2, sellPrice: 0, toHitBonus: 0, statEffects: fx(0,0,0,0, 0,0, 0,0, 0,0,0, 0,0, 0, 0, 5) },

  { slug: "raw_meat", name: "Raw Meat", description: "Uncooked meat.", itemType: ItemType.INGREDIENT, materialType: MaterialType.MEAT,
    weight: 0.3, cost: 2, buyPrice: 4, sellPrice: 1, toHitBonus: 0, statEffects: fx(0,0,0,0, 0,0, 0,0, 0,0,0, 0,0, 0, 1, 0) },

  { slug: "egg", name: "Egg", description: "A fresh egg.", itemType: ItemType.INGREDIENT, materialType: MaterialType.MEAT,
    weight: 0.1, cost: 1, buyPrice: 2, sellPrice: 0, toHitBonus: 0, statEffects: fx(0,0,0,0, 0,0, 0,0, 0,0,0, 0,0, 0, 1, 0) },

  { slug: "carrot", name: "Carrot", description: "A crunchy carrot.", itemType: ItemType.INGREDIENT, materialType: MaterialType.PLANT,
    weight: 0.1, cost: 1, buyPrice: 2, sellPrice: 0, toHitBonus: 0, statEffects: fx(0,0,0,0, 0,0, 0,0, 0,0,0, 0,0, 0, 2, 1) },

  { slug: "onion", name: "Onion", description: "A pungent onion.", itemType: ItemType.INGREDIENT, materialType: MaterialType.PLANT,
    weight: 0.1, cost: 1, buyPrice: 2, sellPrice: 0, toHitBonus: 0, statEffects: fx(0,0,0,0, 0,0, 0,0, 0,0,0, 0,0, 0, 2, 0) },

  { slug: "raw_fish", name: "Raw Fish", description: "Freshly caught fish.", itemType: ItemType.INGREDIENT, materialType: MaterialType.MEAT,
    weight: 0.3, cost: 2, buyPrice: 4, sellPrice: 1, toHitBonus: 0, statEffects: fx(0,0,0,0, 0,0, 0,0, 0,0,0, 0,0, 0, 1, 1) },

  { slug: "berries", name: "Berries", description: "Sweet wild berries.", itemType: ItemType.INGREDIENT, materialType: MaterialType.PLANT,
    weight: 0.1, cost: 1, buyPrice: 2, sellPrice: 0, toHitBonus: 0, statEffects: fx(0,0,0,0, 0,0, 0,0, 0,0,0, 0,0, 0, 3, 1) },

  { slug: "sugar", name: "Sugar", description: "Refined sweetener.", itemType: ItemType.INGREDIENT, materialType: MaterialType.PLANT,
    weight: 0.05, cost: 2, buyPrice: 4, sellPrice: 1, toHitBonus: 0, statEffects: fx(0,0,0,0, 0,0, 0,0, 0,0,0, 0,0, 0, 1, 0) },

  { slug: "mushroom", name: "Mushroom", description: "Edible mushroom.", itemType: ItemType.INGREDIENT, materialType: MaterialType.PLANT,
    weight: 0.1, cost: 1, buyPrice: 2, sellPrice: 0, toHitBonus: 0, statEffects: fx(0,0,0,0, 0,0, 0,0, 0,0,0, 0,0, 0, 2, 1) },

  { slug: "hot_pepper", name: "Hot Pepper", description: "Spicy pepper.", itemType: ItemType.INGREDIENT, materialType: MaterialType.PLANT,
    weight: 0.05, cost: 2, buyPrice: 4, sellPrice: 1, toHitBonus: 0, statEffects: fx(0,0,0,0, 0,0, 0,0, 0,0,0, 0,0, 0, 1, 0) },

  { slug: "garlic", name: "Garlic", description: "Strong-smelling garlic.", itemType: ItemType.INGREDIENT, materialType: MaterialType.PLANT,
    weight: 0.05, cost: 1, buyPrice: 2, sellPrice: 0, toHitBonus: 0, statEffects: fx(0,0,0,0, 0,0, 0,0, 0,0,0, 0,0, 0, 1, 0) },

  { slug: "herb", name: "Herb", description: "Medicinal herb.", itemType: ItemType.INGREDIENT, materialType: MaterialType.PLANT,
    weight: 0.05, cost: 2, buyPrice: 4, sellPrice: 1, toHitBonus: 0, statEffects: fx(0,0,0,0, 0,0, 0,0, 0,0,0, 0,0, 0, 1, 1) },

  { slug: "potato", name: "Potato", description: "A hearty potato.", itemType: ItemType.INGREDIENT, materialType: MaterialType.PLANT,
    weight: 0.2, cost: 1, buyPrice: 2, sellPrice: 0, toHitBonus: 0, statEffects: fx(0,0,0,0, 0,0, 0,0, 0,0,0, 0,0, 0, 3, 0) },

  { slug: "salt", name: "Salt", description: "Basic seasoning.", itemType: ItemType.INGREDIENT, materialType: MaterialType.MINERAL,
    weight: 0.05, cost: 1, buyPrice: 2, sellPrice: 0, toHitBonus: 0, statEffects: fx(0,0,0,0, 0,0, 0,0, 0,0,0, 0,0, 0, 0, 0) },

  { slug: "arcane_dust", name: "Arcane Dust", description: "Magical residue.", itemType: ItemType.INGREDIENT, materialType: MaterialType.DUST,
    weight: 0.05, cost: 5, buyPrice: 10, sellPrice: 2, toHitBonus: 0, statEffects: fx(0,0,1,0, 0,5, 0,0, 0,0,0, 0,0, 0, 0, 0) },

  // -------------------------
  // CRAFTED FOOD INGREDIENT
  // -------------------------

  { slug: "cooked_meat", name: "Cooked Meat", description: "Freshly cooked meat.", itemType: ItemType.FOOD, materialType: MaterialType.MEAT,
    weight: 0.3, cost: 5, buyPrice: 10, sellPrice: 2, toHitBonus: 0, statEffects: fx(0,0,0,0, 10,0, 0,0, 0,0,0, 0,0, 0, 5, 2) },

  { slug: "vegetable_broth", name: "Vegetable Broth", description: "Warm vegetable broth.", itemType: ItemType.FOOD, materialType: MaterialType.LIQUID,
    weight: 0.3, cost: 4, buyPrice: 8, sellPrice: 1, toHitBonus: 0, statEffects: fx(0,0,0,0, 5,0, 0,0, 0,0,0, 0,0, 0, 4, 4) },

  { slug: "meat_stew", name: "Meat Stew", description: "Hearty meat stew.", itemType: ItemType.FOOD, materialType: MaterialType.MEAT,
    weight: 0.5, cost: 8, buyPrice: 16, sellPrice: 3, toHitBonus: 0, statEffects: fx(1,0,0,1, 15,0, 0,0, 0,0,0, 0,0, 0, 8, 4) },

  { slug: "fish_stew", name: "Fish Stew", description: "Savory fish stew.", itemType: ItemType.FOOD, materialType: MaterialType.MEAT,
    weight: 0.5, cost: 8, buyPrice: 16, sellPrice: 3, toHitBonus: 0, statEffects: fx(0,1,0,0, 12,0, 0,0, 0,0,0, 0,0, 0, 8, 4) },

  { slug: "berry_pie", name: "Berry Pie", description: "Sweet berry pie.", itemType: ItemType.FOOD, materialType: MaterialType.PLANT,
    weight: 0.4, cost: 6, buyPrice: 12, sellPrice: 2, toHitBonus: 0, statEffects: fx(0,0,0,0, 10,0, 0,0, 0,0,0, 0,0, 0, 10, 2) },

  { slug: "mushroom_soup", name: "Mushroom Soup", description: "Warm mushroom soup.", itemType: ItemType.FOOD, materialType: MaterialType.PLANT,
    weight: 0.4, cost: 6, buyPrice: 12, sellPrice: 2, toHitBonus: 0, statEffects: fx(0,0,0,0, 8,0, 0,0, 0,0,0, 0,0, 0, 6, 6) },

  { slug: "warrior_stew", name: "Warrior Stew", description: "A powerful strength stew.", itemType: ItemType.FOOD, materialType: MaterialType.MEAT,
    weight: 0.6, cost: 12, buyPrice: 24, sellPrice: 4, toHitBonus: 0, statEffects: fx(2,0,0,2, 20,0, 1,0, 0,0,0, 0,0, 0, 10, 5) },

  { slug: "hunter_feast", name: "Hunter Feast", description: "A feast for hunters.", itemType: ItemType.FOOD, materialType: MaterialType.MEAT,
    weight: 0.6, cost: 12, buyPrice: 24, sellPrice: 4, toHitBonus: 0, statEffects: fx(1,2,0,1, 18,0, 1,1, 0,0,0, 0,0, 0, 10, 5) },

  { slug: "mage_brew", name: "Mage Brew", description: "A magical brew.", itemType: ItemType.FOOD, materialType: MaterialType.LIQUID,
    weight: 0.3, cost: 10, buyPrice: 20, sellPrice: 4, toHitBonus: 0, statEffects: fx(0,0,2,0, 0,15, 0,0, 0,0,0, 0,0, 0, 5, 5) },

  { slug: "stamina_stew", name: "Stamina Stew", description: "Boosts endurance.", itemType: ItemType.FOOD, materialType: MaterialType.PLANT,
    weight: 0.5, cost: 10, buyPrice: 20, sellPrice: 4, toHitBonus: 0, statEffects: fx(0,1,0,2, 15,0, 0,0, 0,0,0, 0,0, 0, 12, 4) },

  { slug: "grand_feast", name: "Grand Feast", description: "A massive feast.", itemType: ItemType.FOOD, materialType: MaterialType.MEAT,
    weight: 1.0, cost: 20, buyPrice: 40, sellPrice: 8, toHitBonus: 0, statEffects: fx(2,2,1,2, 30,10, 1,1, 1,1,1, 1,1, 0, 20, 10) },

  { slug: "arcane_feast", name: "Arcane Feast", description: "A feast of magical power.", itemType: ItemType.FOOD, materialType: MaterialType.ORGANIC,
    weight: 1.0, cost: 20, buyPrice: 40, sellPrice: 8, toHitBonus: 0, statEffects: fx(0,0,3,0, 10,25, 0,0, 1,1,1, 0,1, 0, 15, 10) },

  { slug: "beastmaster_feast", name: "Beastmaster Feast", description: "Favored by beast tamers.", itemType: ItemType.FOOD, materialType: MaterialType.MEAT,
    weight: 1.0, cost: 20, buyPrice: 40, sellPrice: 8, toHitBonus: 0, statEffects: fx(2,1,0,2, 25,0, 1,1, 0,0,0, 0,0, 0, 15, 10) },

];
