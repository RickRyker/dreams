// server/prisma/seed/ingredients.smithing.ts

import {fx, seedItemFunction, ItemSeed} from './items';
import {ItemType, MaterialType, PrismaClient} from "@prisma/client";

const seedName: string = 'Smithing Ingredient';

// ---------------------------------------------------------------------------
// SEED FUNCTION
// ---------------------------------------------------------------------------
export async function seedSmithingIngredients(prisma: PrismaClient): Promise<void> {
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
  // SMITHING — INGOT  (T1 – T7)
  // ══════════════════════════════════════════════════════════════════════════
  {
    slug: 'bronze_ingot', name: 'Bronze Ingot',
    description: 'A rough alloy of copper and tin. The first metal most apprentice smiths ever cast.',
    itemType: ItemType.INGOT, materialType: MaterialType.METAL,
    weight: 1.0, cost: 30, buyPrice: 54, sellPrice: 12,
    toHitBonus: 0, statEffects: fx(),
  },
  {
    slug: 'iron_ingot', name: 'Iron Ingot',
    description: 'A bar of smelted iron, dull grey and dependable. The backbone of civilisation.',
    itemType: ItemType.INGOT, materialType: MaterialType.METAL,
    weight: 1.0, cost: 50, buyPrice: 90, sellPrice: 20,
    toHitBonus: 0, statEffects: fx(),
  },
  {
    slug: 'steel_ingot', name: 'Steel Ingot',
    description: 'Iron refined with carbon and quenched. Harder, sharper, and more reliable.',
    itemType: ItemType.INGOT, materialType: MaterialType.METAL,
    weight: 1.0, cost: 300, buyPrice: 540, sellPrice: 120,
    toHitBonus: 0, statEffects: fx(),
  },
  {
    slug: 'darksteel_ingot', name: 'Darksteel Ingot',
    description: 'A brooding, near-black alloy tempered in shadow-water. Holds an enchantment well.',
    itemType: ItemType.INGOT, materialType: MaterialType.METAL,
    weight: 1.2, cost: 800, buyPrice: 1440, sellPrice: 320,
    toHitBonus: 0, statEffects: fx(),
  },
  {
    slug: 'mithril_ingot', name: 'Mithril Ingot',
    description: 'A shimmering silver ingot impossibly light for its strength. Elvish smiths pay fortunes for it.',
    itemType: ItemType.INGOT, materialType: MaterialType.METAL,
    weight: 0.8, cost: 3000, buyPrice: 5400, sellPrice: 1200,
    toHitBonus: 0, statEffects: fx(),
  },
  {
    slug: 'adamantine_ingot', name: 'Adamantine Ingot',
    description: 'The hardest naturally occurring metal. Even dragon fire cannot soften it.',
    itemType: ItemType.INGOT, materialType: MaterialType.METAL,
    weight: 1.5, cost: 15000, buyPrice: 27000, sellPrice: 6000,
    toHitBonus: 0, statEffects: fx(),
  },
  {
    slug: 'void_ingot', name: 'Void Ingot',
    description: 'Metal drawn from collapsed stars beyond the veil. Absorbs light and radiates cold.',
    itemType: ItemType.INGOT, materialType: MaterialType.METAL,
    weight: 1.0, cost: 35000, buyPrice: 63000, sellPrice: 14000,
    toHitBonus: 0, statEffects: fx(),
  },
  {
    slug: 'infernal_ingot', name: 'Infernal Ingot',
    description: 'Ore mined from deep within infernal planes, eternally warm to the touch.',
    itemType: ItemType.INGOT, materialType: MaterialType.UNKNOWN,
    weight: 1.2, cost: 100000, buyPrice: 180000, sellPrice: 40000,
    toHitBonus: 0, statEffects: fx(),
  },
  {
    slug: 'celestial_ingot', name: 'Celestial Ingot',
    description: 'Condensed starlight hammered into solid form by celestial forgemasters. Hums faintly.',
    itemType: ItemType.INGOT, materialType: MaterialType.UNKNOWN,
    weight: 0.8, cost: 120000, buyPrice: 216000, sellPrice: 48000,
    toHitBonus: 0, statEffects: fx(),
  },
  {
    slug: 'godsteel_ingot', name: 'Godsteel Ingot',
    description: 'A metal of unknown origin, recovered from the ruins of a fallen god. Defies classification.',
    itemType: ItemType.INGOT, materialType: MaterialType.UNKNOWN,
    weight: 0.5, cost: 800000, buyPrice: 1440000, sellPrice: 320000,
    toHitBonus: 0, statEffects: fx(),
  },

  // ══════════════════════════════════════════════════════════════════════════
  // SMITHING — WEAPONS  (T2 – T8)
  // toHitBonus = weapon accuracy (1–35) | StatEffects.toHit = equip bonus (0–25)
  // ══════════════════════════════════════════════════════════════════════════
  {
    slug: 'iron_dagger', name: 'Iron Dagger',
    description: 'A short, double-edged iron blade. Light and quick — a rogue\'s first companion.',
    itemType: ItemType.KNIFE, materialType: MaterialType.METAL,
    weight: 0.8, cost: 80, buyPrice: 144, sellPrice: 32,
    toHitBonus: 5, statEffects: fx(0, 3, 0, 0, 0, 0, 5, 0, 4),
    // DEX+3 toHit+5 critChance+4
  },
  {
    slug: 'iron_sword', name: 'Iron Sword',
    description: 'A dependable straight-bladed iron sword. The workhorse of the militia.',
    itemType: ItemType.SWORD, materialType: MaterialType.METAL,
    weight: 2.0, cost: 100, buyPrice: 180, sellPrice: 40,
    toHitBonus: 3, statEffects: fx(2, 0, 0, 0, 0, 0, 3, 0, 2),
    // STR+2 toHit+3 critChance+2
  },
  {
    slug: 'iron_axe', name: 'Iron Axe',
    description: 'A heavy single-bit iron axe. Brutal on impact, less precise than a sword.',
    itemType: ItemType.AXE, materialType: MaterialType.METAL,
    weight: 2.5, cost: 120, buyPrice: 216, sellPrice: 48,
    toHitBonus: 4, statEffects: fx(3, 0, 0, 0, 0, 0, 4),
    // STR+3 toHit+4
  },
  {
    slug: 'steel_sword', name: 'Steel Sword',
    description: 'A finely balanced steel longsword. Holds a sharper edge far longer than iron.',
    itemType: ItemType.SWORD, materialType: MaterialType.METAL,
    weight: 2.0, cost: 600, buyPrice: 1080, sellPrice: 240,
    toHitBonus: 7, statEffects: fx(4, 0, 0, 0, 0, 0, 7, 0, 3, 5),
    // STR+4 toHit+7 critChance+3 critDamage+5
  },
  {
    slug: 'steel_axe', name: 'Steel Axe',
    description: 'A broad-bladed steel axe with a weighted head. Shatters shield as readily as flesh.',
    itemType: ItemType.AXE, materialType: MaterialType.METAL,
    weight: 2.8, cost: 700, buyPrice: 1260, sellPrice: 280,
    toHitBonus: 6, statEffects: fx(5, 0, 0, 0, 0, 0, 6, 0, 0, 8),
    // STR+5 toHit+6 critDamage+8
  },
  {
    slug: 'steel_mace', name: 'Steel Mace',
    description: 'A flanged steel mace designed to defeat plate armour through blunt trauma.',
    itemType: ItemType.HAMMER, materialType: MaterialType.METAL,
    weight: 3.0, cost: 650, buyPrice: 1170, sellPrice: 260,
    toHitBonus: 6, statEffects: fx(5, 0, 0, 1, 0, 0, 6, 0, 0, 0, 0, 2),
    // STR+5 CON+1 toHit+6 DR+2
  },
  {
    slug: 'steel_spear', name: 'Steel Spear',
    description: 'A long steel-tipped spear with reach advantage. Excellent for keeping enemies at bay.',
    itemType: ItemType.SPEAR, materialType: MaterialType.METAL,
    weight: 3.5, cost: 750, buyPrice: 1350, sellPrice: 300,
    toHitBonus: 8, statEffects: fx(3, 2, 0, 0, 0, 0, 8, 0, 4),
    // STR+3 DEX+2 toHit+8 critChance+4
  },
  {
    slug: 'mithril_sword', name: 'Mithril Sword',
    description: 'A gleaming mithril blade light as a feather yet nearly unbreakable. A warrior\'s dream.',
    itemType: ItemType.SWORD, materialType: MaterialType.METAL,
    weight: 1.5, cost: 4000, buyPrice: 7200, sellPrice: 1600,
    toHitBonus: 12, statEffects: fx(6, 2, 0, 0, 0, 0, 12, 0, 6, 10),
    // STR+6 DEX+2 toHit+12 critChance+6 critDamage+10
  },
  {
    slug: 'mithril_dagger', name: 'Mithril Dagger',
    description: 'A needle-thin mithril blade that finds every gap in armour. Assassins pay dearly for one.',
    itemType: ItemType.KNIFE, materialType: MaterialType.METAL,
    weight: 0.6, cost: 3500, buyPrice: 6300, sellPrice: 1400,
    toHitBonus: 14, statEffects: fx(0, 8, 0, 0, 0, 0, 14, 0, 10, 12),
    // DEX+8 toHit+14 critChance+10 critDamage+12
  },
  {
    slug: 'adamantine_greataxe', name: 'Adamantine Greataxe',
    description: 'A two-handed axe of raw adamantine. Each swing reshapes the battlefield — and the warriors in it.',
    itemType: ItemType.AXE, materialType: MaterialType.METAL,
    weight: 6.0, cost: 20000, buyPrice: 36000, sellPrice: 8000,
    toHitBonus: 15, statEffects: fx(10, 0, 0, 0, 0, 0, 15, 0, 0, 20, 0, 2),
    // STR+10 toHit+15 critDamage+20 DR+2
  },
  {
    slug: 'void_blade', name: 'Void Blade',
    description: 'A sword forged from void metal. Its edge exists partially outside reality, bypassing some armour.',
    itemType: ItemType.SWORD, materialType: MaterialType.METAL,
    weight: 2.0, cost: 40000, buyPrice: 72000, sellPrice: 16000,
    toHitBonus: 20, statEffects: fx(8, 6, 4, 0, 0, 0, 20, 0, 12, 20, 0, 0, 5),
    // STR+8 DEX+6 INT+4 toHit+20 critChance+12 critDamage+20 SR+5
  },
  {
    slug: 'void_dagger', name: 'Void Dagger',
    description: 'A whisper-thin void-metal blade. Strikes land before the victim perceives the hand that drew it.',
    itemType: ItemType.KNIFE, materialType: MaterialType.METAL,
    weight: 0.7, cost: 38000, buyPrice: 68400, sellPrice: 15200,
    toHitBonus: 22, statEffects: fx(0, 12, 4, 0, 0, 0, 22, 0, 15, 18, 0, 0, 4),
    // DEX+12 INT+4 toHit+22 critChance+15 critDamage+18 SR+4
  },
  {
    slug: 'infernal_axe', name: 'Infernal Axe',
    description: 'A great axe forged in infernal flame, eternally hot to the touch. Wounds it inflicts resist magical healing.',
    itemType: ItemType.AXE, materialType: MaterialType.UNKNOWN,
    weight: 3.5, cost: 120000, buyPrice: 216000, sellPrice: 48000,
    toHitBonus: 26, statEffects: fx(15, 0, 0, 4, 0, 0, 22, 0, 10, 30, 0, 4),
    // STR+15 CON+4 toHit+22 critChance+10 critDamage+30 DR+4
  },
  {
    slug: 'celestial_sword', name: 'Celestial Sword',
    description: 'A blade of pure celestial light given physical form. Deals holy damage resistant to all resistances.',
    itemType: ItemType.SWORD, materialType: MaterialType.UNKNOWN,
    weight: 1.8, cost: 150000, buyPrice: 270000, sellPrice: 60000,
    toHitBonus: 28, statEffects: fx(12, 6, 6, 0, 0, 0, 20, 0, 15, 25, 0, 3, 10),
    // STR+12 DEX+6 INT+6 toHit+20 critChance+15 critDamage+25 DR+3 SR+10
  },
  {
    slug: 'godsteel_greatsword', name: 'Godsteel Greatsword',
    description: 'A colossal greatsword of godsteel. Mere mortals require exceptional strength just to lift it.',
    itemType: ItemType.SWORD, materialType: MaterialType.UNKNOWN,
    weight: 4.0, cost: 1000000, buyPrice: 1800000, sellPrice: 400000,
    toHitBonus: 33, statEffects: fx(20, 10, 0, 5, 0, 0, 25, 0, 20, 35, 0, 5, 10),
    // STR+20 DEX+10 CON+5 toHit+25 critChance+20 critDamage+35 DR+5 SR+10
  },
  {
    slug: 'mythblade', name: 'Mythblade',
    description: 'A weapon of pure myth. No smith claims to have forged it. It simply exists, waiting to be found.',
    itemType: ItemType.SWORD, materialType: MaterialType.UNKNOWN,
    weight: 1.5, cost: 8000000, buyPrice: 14400000, sellPrice: 3200000,
    toHitBonus: 35, statEffects: fx(25, 15, 10, 10, 0, 0, 25, 0, 25, 40, 0, 8, 15),
    // STR+25 DEX+15 INT+10 CON+10 toHit+25 critChance+25 critDamage+40 DR+8 SR+15
  },

  // ══════════════════════════════════════════════════════════════════════════
  // SMITHING — PLATE ARMOR  (T2 – T6)
  // ══════════════════════════════════════════════════════════════════════════
  {
    slug: 'iron_helm', name: 'Iron Helm',
    description: 'A simple iron pot-helm. Offers basic head protection for new recruits.',
    itemType: ItemType.ARMOR, materialType: MaterialType.METAL,
    weight: 2.5, cost: 80, buyPrice: 144, sellPrice: 32,
    toHitBonus: 0, statEffects: fx(0, 0, 0, 1, 15, 0, 0, 0, 0, 0, 0, 1),
    // CON+1 HP+15 DR+1
  },
  {
    slug: 'iron_chestplate', name: 'Iron Chestplate',
    description: 'A heavy iron breastplate hammered to fit. Slows movement but stops most blows.',
    itemType: ItemType.ARMOR, materialType: MaterialType.METAL,
    weight: 6.0, cost: 150, buyPrice: 270, sellPrice: 60,
    toHitBonus: 0, statEffects: fx(0, 0, 0, 2, 30, 0, 0, 0, 0, 0, 0, 2),
    // CON+2 HP+30 DR+2
  },
  {
    slug: 'steel_helm', name: 'Steel Helm',
    description: 'A well-crafted steel helm with cheek guards. Standard issue for professional soldiers.',
    itemType: ItemType.ARMOR, materialType: MaterialType.METAL,
    weight: 2.5, cost: 500, buyPrice: 900, sellPrice: 200,
    toHitBonus: 0, statEffects: fx(0, 0, 0, 3, 40, 0, 0, 0, 0, 0, 3, 3),
    // CON+3 HP+40 critResistance+3 DR+3
  },
  {
    slug: 'steel_chestplate', name: 'Steel Chestplate',
    description: 'A layered steel breastplate with articulated shoulder guards. The armour of champions.',
    itemType: ItemType.ARMOR, materialType: MaterialType.METAL,
    weight: 6.0, cost: 900, buyPrice: 1620, sellPrice: 360,
    toHitBonus: 0, statEffects: fx(0, 0, 0, 4, 70, 0, 0, 0, 0, 0, 3, 4),
    // CON+4 HP+70 critResistance+3 DR+4
  },
  {
    slug: 'mithril_helm', name: 'Mithril Helm',
    description: 'A sleek mithril helm that feels almost weightless. Provides exceptional protection.',
    itemType: ItemType.ARMOR, materialType: MaterialType.METAL,
    weight: 1.8, cost: 3500, buyPrice: 6300, sellPrice: 1400,
    toHitBonus: 0, statEffects: fx(0, 0, 0, 5, 80, 0, 0, 0, 0, 0, 5, 5),
    // CON+5 HP+80 critResistance+5 DR+5
  },
  {
    slug: 'mithril_chestplate', name: 'Mithril Chestplate',
    description: 'A shimmering mithril breastplate of exceptional craftsmanship. Light, tough, and prestigious.',
    itemType: ItemType.ARMOR, materialType: MaterialType.METAL,
    weight: 4.5, cost: 6000, buyPrice: 10800, sellPrice: 2400,
    toHitBonus: 0, statEffects: fx(0, 0, 0, 7, 140, 0, 0, 0, 0, 0, 7, 7),
    // CON+7 HP+140 critResistance+7 DR+7
  },
  {
    slug: 'adamantine_chestplate', name: 'Adamantine Chestplate',
    description: 'A fortress of adamantine. The hardest armour a mortal craftsman can produce.',
    itemType: ItemType.ARMOR, materialType: MaterialType.METAL,
    weight: 7.0, cost: 22000, buyPrice: 39600, sellPrice: 8800,
    toHitBonus: 0, statEffects: fx(0, 0, 0, 10, 200, 0, 0, 0, 0, 0, 10, 10),
    // CON+10 HP+200 critResistance+10 DR+10
  },
  {
    slug: 'void_chestplate', name: 'Void Chestplate',
    description: 'Armour of void-metal that drink in spells directed at its wearer.',
    itemType: ItemType.ARMOR, materialType: MaterialType.METAL,
    weight: 5.0, cost: 42000, buyPrice: 75600, sellPrice: 16800,
    toHitBonus: 0, statEffects: fx(0, 0, 0, 8, 180, 0, 0, 0, 0, 0, 8, 9, 6),
    // CON+8 HP+180 critResistance+8 DR+9 SR+6
  },
  {
    slug: 'celestial_chestplate', name: 'Celestial Chestplate',
    description: 'Armour woven from celestial starlight and divine grace. It hums hymns in battle.',
    itemType: ItemType.ARMOR, materialType: MaterialType.UNKNOWN,
    weight: 4.0, cost: 180000, buyPrice: 324000, sellPrice: 72000,
    toHitBonus: 0, statEffects: fx(0, 0, 0, 15, 350, 0, 0, 0, 0, 0, 15, 14, 12),
    // CON+15 HP+350 critResistance+15 DR+14 SR+12
  },

  // -------------------------
  // SMITHING INGREDIENT
  // -------------------------
  { slug: "iron_ore", name: "Iron Ore", description: "Unrefined iron ore.",
    itemType: ItemType.ORE, materialType: MaterialType.MINERAL,
    weight: 1, cost: 3, buyPrice: 6, sellPrice: 1, toHitBonus: 0,
    statEffects: fx() },

  { slug: "coal", name: "Coal", description: "A combustible mineral used in smelting.",
    itemType: ItemType.ORE, materialType: MaterialType.MINERAL,
    weight: 0.5, cost: 2, buyPrice: 4, sellPrice: 1, toHitBonus: 0,
    statEffects: fx() },

  { slug: "iron_ingot", name: "Iron Ingot", description: "Refined iron bar.",
    itemType: ItemType.INGOT, materialType: MaterialType.METAL,
    weight: 1, cost: 8, buyPrice: 16, sellPrice: 3, toHitBonus: 0,
    statEffects: fx() },

  { slug: "steel_ingot", name: "Steel Ingot", description: "Refined steel bar.",
    itemType: ItemType.INGOT, materialType: MaterialType.METAL,
    weight: 1, cost: 12, buyPrice: 24, sellPrice: 5, toHitBonus: 0,
    statEffects: fx() },

  { slug: "iron_sword", name: "Iron Sword", description: "A basic iron sword.",
    itemType: ItemType.SWORD, materialType: MaterialType.METAL,
    weight: 3, cost: 20, buyPrice: 40, sellPrice: 8, toHitBonus: 5,
    statEffects: fx(2,1,0,1, 0,0, 5,0, 0,0,0, 0,0, 0,0,0) },

  { slug: "steel_sword", name: "Steel Sword", description: "A stronger steel sword.",
    itemType: ItemType.SWORD, materialType: MaterialType.METAL,
    weight: 3, cost: 30, buyPrice: 60, sellPrice: 12, toHitBonus: 7,
    statEffects: fx(3,1,0,1, 0,0, 7,0, 0,0,0, 0,0, 0,0,0) },

  { slug: "iron_armor", name: "Iron Armor", description: "Heavy iron armor.",
    itemType: ItemType.ARMOR, materialType: MaterialType.METAL,
    weight: 12, cost: 40, buyPrice: 80, sellPrice: 16, toHitBonus: -2,
    statEffects: fx(2,0,0,3, 25,0, -2,0, 0,0,0, 5,2, 0,0,0) },



];
