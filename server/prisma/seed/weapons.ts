// server/prisma/seed/weapons.ts

import { PrismaClient, MaterialType, ItemType } from '@prisma/client';
import {fx, seedItemFunction, ItemSeed} from './items';

const seedName: string = 'Weapons';

// ---------------------------------------------------------------------------
// SEED FUNCTION
// ---------------------------------------------------------------------------
export async function seedWeapons(prisma: PrismaClient): Promise<void> {
  await seedItemFunction(prisma, seedName, data);
}

// ---------------------------------------------------------------------------
// ITEM DATA
// ---------------------------------------------------------------------------
const data: ItemSeed[] = [

  // =========================================================================
  // DAGGERS
  // =========================================================================

  // --- Tier 1 ---------------------------------------------------------------
  {
    slug: 'iron-dagger',
    name: 'Iron Dagger',
    description: 'A simple iron dagger with a short double-edged blade. The grip is wrapped in rough leather. Standard-issue among city guards and novice adventurers.',
    itemType: ItemType.KNIFE,
    materialType: MaterialType.METAL,
    weight: 0.5,
    cost: 80,
    buyPrice: 120,
    sellPrice: 32,
    toHitBonus: 3,
    statEffects: fx(0, 1, 0, 0, 0, 0, 2, 1, 1, 0, 0, 0, 0),
  },
  {
    slug: 'bone-stiletto',
    name: 'Bone Stiletto',
    description: 'Carved from the shin-bone of a dire wolf, this thin piercing blade is surprisingly resilient. Favoured by tribal scouts for its eerie silence.',
    itemType: ItemType.KNIFE,
    materialType: MaterialType.BONE,
    weight: 0.3,
    cost: 150,
    buyPrice: 225,
    sellPrice: 60,
    toHitBonus: 4,
    statEffects: fx(0, 2, 0, 0, 0, 0, 3, 2, 2, 0, 0, 0, 0),
  },

  // --- Tier 2 ---------------------------------------------------------------
  {
    slug: 'steel-rondel',
    name: 'Steel Rondel',
    description: 'A heavy steel dagger with a distinctive disc guard designed to punch through gaps in plate armour. The slender blade glows faintly from a basic tempering enchantment.',
    itemType: ItemType.KNIFE,
    materialType: MaterialType.METAL,
    weight: 0.7,
    cost: 800,
    buyPrice: 1200,
    sellPrice: 320,
    toHitBonus: 7,
    statEffects: fx(1, 3, 0, 0, 0, 0, 4, 2, 3, 5, 0, 1, 0),
  },
  {
    slug: 'shadowfang-dirk',
    name: 'Shadowfang Dirk',
    description: 'Forged from shadow-infused steel, this dirk seems to absorb nearby candlelight. Assassins prize it for the bonus it grants when striking from concealment.',
    itemType: ItemType.KNIFE,
    materialType: MaterialType.METAL,
    weight: 0.6,
    cost: 1800,
    buyPrice: 2700,
    sellPrice: 720,
    toHitBonus: 9,
    statEffects: fx(0, 5, 0, 0, 0, 0, 5, 4, 5, 8, 0, 0, 0),
  },

  // --- Tier 3 ---------------------------------------------------------------
  {
    slug: 'mithril-fang',
    name: 'Mithril Fang',
    description: 'Hammered from a single bar of sky-blue mithril, the Mithril Fang is almost weightless yet impossibly sharp. Its edge can part chainmail like silk.',
    itemType: ItemType.KNIFE,
    materialType: MaterialType.METAL,
    weight: 0.4,
    cost: 5500,
    buyPrice: 8250,
    sellPrice: 2200,
    toHitBonus: 13,
    statEffects: fx(0, 7, 2, 0, 0, 20, 7, 5, 6, 10, 1, 0, 2),
  },
  {
    slug: 'venomweave-kris',
    name: 'Venomweave Kris',
    description: 'The wavy darkwood-core blade of this kris channels venomous magic through silver-inlaid channels. Each strike has a chance to inject an arcane toxin.',
    itemType: ItemType.KNIFE,
    materialType: MaterialType.WOOD,
    weight: 0.5,
    cost: 7000,
    buyPrice: 10500,
    sellPrice: 2800,
    toHitBonus: 12,
    statEffects: fx(0, 6, 4, 0, 0, 30, 6, 4, 7, 12, 0, 0, 3),
  },

  // --- Tier 4 ---------------------------------------------------------------
  {
    slug: 'void-piercer',
    name: 'Void Piercer',
    description: 'Crystallised from solidified void-energy, this translucent black blade ignores 20 % of target armour. It hums at a frequency just below human hearing.',
    itemType: ItemType.KNIFE,
    materialType: MaterialType.UNKNOWN,
    weight: 0.3,
    cost: 28000,
    buyPrice: 42000,
    sellPrice: 11200,
    toHitBonus: 18,
    statEffects: fx(0, 10, 5, 0, 0, 40, 10, 8, 10, 18, 2, 0, 5),
  },
  {
    slug: 'soulreaver-shard',
    name: 'Soulreaver Shard',
    description: "A jagged sliver of adamantine inscribed with soul-binding runes. Critical strikes drain a portion of the target's life essence, healing the wielder.",
    itemType: ItemType.KNIFE,
    materialType: MaterialType.METAL,
    weight: 0.6,
    cost: 35000,
    buyPrice: 52500,
    sellPrice: 14000,
    toHitBonus: 20,
    statEffects: fx(2, 10, 3, 2, 60, 30, 10, 7, 12, 20, 3, 2, 3),
  },

  // --- Tier 5 ---------------------------------------------------------------
  {
    slug: 'celestial-needle',
    name: 'Celestial Needle',
    description: 'Gifted by a fallen star, the Celestial Needle passes through mundane wards as though they do not exist. Its hilt is carved from pure moonstone and never needs polishing.',
    itemType: ItemType.KNIFE,
    materialType: MaterialType.UNKNOWN,
    weight: 0.2,
    cost: 120000,
    buyPrice: 180000,
    sellPrice: 48000,
    toHitBonus: 28,
    statEffects: fx(2, 15, 8, 2, 80, 80, 15, 12, 15, 30, 5, 2, 8),
  },
  {
    slug: 'infernal-fang',
    name: 'Infernal Fang',
    description: 'Quenched in the blood of a pit fiend, the Infernal Fang burns with hellfire along its edge. Its strikes leave wounds that resist magical healing.',
    itemType: ItemType.KNIFE,
    materialType: MaterialType.UNKNOWN,
    weight: 0.5,
    cost: 160000,
    buyPrice: 240000,
    sellPrice: 64000,
    toHitBonus: 30,
    statEffects: fx(3, 14, 6, 3, 60, 60, 14, 10, 18, 35, 6, 3, 6),
  },

  // =========================================================================
  // SWORDS
  // =========================================================================

  // --- Tier 1 ---------------------------------------------------------------
  {
    slug: 'iron-shortsword',
    name: 'Iron Shortsword',
    description: 'A reliable iron shortsword with a straight single-edged blade. Mass-produced for militias across the realm, its balance is adequate if uninspiring.',
    itemType: ItemType.SWORD,
    materialType: MaterialType.METAL,
    weight: 1.5,
    cost: 200,
    buyPrice: 300,
    sellPrice: 80,
    toHitBonus: 3,
    statEffects: fx(1, 1, 0, 0, 5, 0, 2, 0, 0, 0, 0, 0, 0),
  },
  {
    slug: 'steel-longsword',
    name: 'Steel Longsword',
    description: 'The workhorse of any seasoned warrior. This double-edged steel longsword features a cruciform hilt and a blade tempered for durability over razor sharpness.',
    itemType: ItemType.SWORD,
    materialType: MaterialType.METAL,
    weight: 2.5,
    cost: 1200,
    buyPrice: 1800,
    sellPrice: 480,
    toHitBonus: 6,
    statEffects: fx(2, 1, 0, 1, 15, 0, 3, 0, 1, 5, 1, 1, 0),
  },

  // --- Tier 2 ---------------------------------------------------------------
  {
    slug: 'ashwood-cutlass',
    name: 'Ashwood Cutlass',
    description: 'A nautical blade with a forward-curving ashwood-cored edge. Sea captains favour the cutlass for its devastating slashing arcs in close-quarter deck fights.',
    itemType: ItemType.SWORD,
    materialType: MaterialType.OTHER,
    weight: 1.8,
    cost: 900,
    buyPrice: 1350,
    sellPrice: 360,
    toHitBonus: 5,
    statEffects: fx(2, 2, 0, 0, 10, 0, 4, 1, 2, 6, 0, 0, 0),
  },
  {
    slug: 'runed-broadsword',
    name: 'Runed Broadsword',
    description: 'Ancient combat runes etched along this broad steel blade flare blue when an enemy casts a spell, providing a modest spell resistance bonus to the wielder.',
    itemType: ItemType.SWORD,
    materialType: MaterialType.METAL,
    weight: 3.0,
    cost: 2200,
    buyPrice: 3300,
    sellPrice: 880,
    toHitBonus: 8,
    statEffects: fx(3, 0, 1, 1, 20, 10, 4, 0, 1, 8, 1, 1, 4),
  },

  // --- Tier 3 ---------------------------------------------------------------
  {
    slug: 'mithril-rapier',
    name: 'Mithril Rapier',
    description: 'An elegant duelling blade drawn from a single mithril billet. The swept hilt is engraved with flourishing vines. Speed-focused fighters adore its feather-light thrust.',
    itemType: ItemType.SWORD,
    materialType: MaterialType.METAL,
    weight: 1.2,
    cost: 6500,
    buyPrice: 9750,
    sellPrice: 2600,
    toHitBonus: 14,
    statEffects: fx(1, 8, 2, 0, 20, 30, 9, 6, 7, 12, 1, 0, 3),
  },
  {
    slug: 'darkwood-claymore',
    name: 'Darkwood Claymore',
    description: 'The heartwood core of this massive two-handed claymore stores arcane energy with each strike. At full charge, the blade releases a thunderous shockwave.',
    itemType: ItemType.SWORD,
    materialType: MaterialType.WOOD,
    weight: 5.5,
    cost: 8500,
    buyPrice: 12750,
    sellPrice: 3400,
    toHitBonus: 11,
    statEffects: fx(6, 0, 3, 2, 40, 40, 5, 0, 4, 15, 2, 3, 4),
  },

  // --- Tier 4 ---------------------------------------------------------------
  {
    slug: 'adamantine-greatsword',
    name: 'Adamantine Greatsword',
    description: 'Smelted from a meteorite core of pure adamantine, this enormous greatsword shatters shields on contact. Its weight requires exceptional strength but rewards with devastating blows.',
    itemType: ItemType.SWORD,
    materialType: MaterialType.METAL,
    weight: 7.0,
    cost: 38000,
    buyPrice: 57000,
    sellPrice: 15200,
    toHitBonus: 17,
    statEffects: fx(10, 0, 0, 4, 80, 0, 6, 0, 5, 20, 3, 5, 2),
  },
  {
    slug: 'void-edge-katana',
    name: 'Void-Edge Katana',
    description: 'A katana folded ten thousand times in the space between worlds. Its obsidian-black edge phases momentarily out of reality upon impact, bypassing physical armour.',
    itemType: ItemType.SWORD,
    materialType: MaterialType.UNKNOWN,
    weight: 1.8,
    cost: 45000,
    buyPrice: 67500,
    sellPrice: 18000,
    toHitBonus: 22,
    statEffects: fx(5, 10, 5, 0, 50, 50, 12, 9, 12, 22, 3, 0, 6),
  },

  // --- Tier 5 ---------------------------------------------------------------
  {
    slug: 'solarflare-blade',
    name: 'Solarflare Blade',
    description: 'Forged at the heart of a dying sun by a celestial smith, the Solarflare Blade erupts in blinding golden fire upon each strike. Undead and shadow creatures suffer triple damage.',
    itemType: ItemType.SWORD,
    materialType: MaterialType.UNKNOWN,
    weight: 2.2,
    cost: 180000,
    buyPrice: 270000,
    sellPrice: 72000,
    toHitBonus: 30,
    statEffects: fx(12, 8, 10, 5, 150, 100, 15, 10, 15, 35, 6, 5, 12),
  },
  {
    slug: 'abyssal-reaper',
    name: 'Abyssal Reaper',
    description: 'A two-handed sword imbued with the essence of the Abyss. Every kill has a 15 % chance to summon a shade that fights alongside the wielder for one minute.',
    itemType: ItemType.SWORD,
    materialType: MaterialType.UNKNOWN,
    weight: 6.0,
    cost: 220000,
    buyPrice: 330000,
    sellPrice: 88000,
    toHitBonus: 32,
    statEffects: fx(15, 5, 8, 6, 120, 80, 14, 8, 18, 40, 7, 6, 8),
  },

  // =========================================================================
  // BOWS
  // =========================================================================

  // --- Tier 1 ---------------------------------------------------------------
  {
    slug: 'ash-shortbow',
    name: 'Ash Shortbow',
    description: 'A compact recurve bow whittled from a single stave of white ash. Perfect for hunting rabbits and harassing goblin skirmishers from the treeline.',
    itemType: ItemType.BOW,
    materialType: MaterialType.OTHER,
    weight: 1.0,
    cost: 120,
    buyPrice: 180,
    sellPrice: 48,
    toHitBonus: 4,
    statEffects: fx(0, 2, 0, 0, 0, 0, 3, 2, 2, 3, 0, 0, 0),
  },
  {
    slug: 'ironbound-longbow',
    name: 'Ironbound Longbow',
    description: 'A tall war-bow reinforced with iron tip and nock. Its heavy draw weight translates into arrow velocity sufficient to pierce light plate at sixty paces.',
    itemType: ItemType.BOW,
    materialType: MaterialType.METAL,
    weight: 1.8,
    cost: 450,
    buyPrice: 675,
    sellPrice: 180,
    toHitBonus: 5,
    statEffects: fx(1, 2, 0, 0, 0, 0, 4, 1, 2, 5, 0, 0, 0),
  },

  // --- Tier 2 ---------------------------------------------------------------
  {
    slug: 'bone-composite-bow',
    name: 'Bone Composite Bow',
    description: 'Layered bone laminate gives this composite bow its characteristic creamy white colour and surprising spring. Steppe nomads developed the design for mounted archery.',
    itemType: ItemType.BOW,
    materialType: MaterialType.BONE,
    weight: 1.4,
    cost: 1400,
    buyPrice: 2100,
    sellPrice: 560,
    toHitBonus: 8,
    statEffects: fx(0, 4, 0, 0, 0, 0, 6, 3, 4, 8, 0, 0, 0),
  },

  // --- Tier 3 ---------------------------------------------------------------
  {
    slug: 'darkwood-recurve',
    name: 'Darkwood Recurve',
    description: 'The dense, slightly magical grain of darkwood stores energy between shots, granting the Darkwood Recurve a self-loading sensation. Each draw feels smoother than the last.',
    itemType: ItemType.BOW,
    materialType: MaterialType.WOOD,
    weight: 1.3,
    cost: 5000,
    buyPrice: 7500,
    sellPrice: 2000,
    toHitBonus: 13,
    statEffects: fx(0, 7, 3, 0, 0, 30, 8, 5, 7, 14, 1, 0, 3),
  },
  {
    slug: 'mithril-war-bow',
    name: 'Mithril War Bow',
    description: 'Mithril limbs give this war-bow an unnatural draw speed. Its arrows travel faster than the eye can follow, and its enchanted string never frays.',
    itemType: ItemType.BOW,
    materialType: MaterialType.METAL,
    weight: 1.6,
    cost: 9000,
    buyPrice: 13500,
    sellPrice: 3600,
    toHitBonus: 15,
    statEffects: fx(1, 9, 2, 0, 10, 20, 10, 6, 8, 16, 1, 0, 2),
  },

  // --- Tier 4 ---------------------------------------------------------------
  {
    slug: 'voidstring-crossbow',
    name: 'Voidstring Crossbow',
    description: 'The void-woven string of this heavy crossbow flings bolts wrapped in anti-magic energy. Targets struck suffer a 10-second spell-silence debuff.',
    itemType: ItemType.BOW,
    materialType: MaterialType.UNKNOWN,
    weight: 4.5,
    cost: 32000,
    buyPrice: 48000,
    sellPrice: 12800,
    toHitBonus: 19,
    statEffects: fx(0, 8, 6, 0, 0, 50, 11, 7, 10, 18, 2, 0, 7),
  },

  // --- Tier 5 ---------------------------------------------------------------
  {
    slug: 'celestial-starburst-bow',
    name: 'Celestial Starburst Bow',
    description: 'A bow strung with a filament of captured starlight. Each arrow loosed bursts into a constellation of homing shards on impact, striking nearby enemies for splash damage.',
    itemType: ItemType.BOW,
    materialType: MaterialType.UNKNOWN,
    weight: 1.1,
    cost: 200000,
    buyPrice: 300000,
    sellPrice: 80000,
    toHitBonus: 35,
    statEffects: fx(2, 18, 10, 2, 60, 100, 18, 14, 20, 38, 5, 0, 10),
  },

  // =========================================================================
  // CLUBS
  // =========================================================================

  // --- Tier 1 ---------------------------------------------------------------
  {
    slug: 'wooden-club',
    name: 'Wooden Club',
    description: 'A length of gnarled hardwood, more or less straight and undeniably heavy. No craftsmanship to speak of, but effective at breaking skulls in a pinch.',
    itemType: ItemType.CLUB,
    materialType: MaterialType.OTHER,
    weight: 2.0,
    cost: 50,
    buyPrice: 75,
    sellPrice: 20,
    toHitBonus: 2,
    statEffects: fx(2, 0, 0, 1, 10, 0, 1, 0, 0, 3, 0, 1, 0),
  },
  {
    slug: 'bone-cudgel',
    name: 'Bone Cudgel',
    description: "Fashioned from the femur of a giant, this cudgel is wrapped in dried sinew to prevent slipping. Shamen use it as both a weapon and a ritual focusing implement.",
    itemType: ItemType.CLUB,
    materialType: MaterialType.BONE,
    weight: 2.5,
    cost: 200,
    buyPrice: 300,
    sellPrice: 80,
    toHitBonus: 3,
    statEffects: fx(3, 0, 1, 1, 15, 10, 1, 0, 0, 4, 0, 1, 1),
  },

  // --- Tier 2 ---------------------------------------------------------------
  {
    slug: 'steel-morningstar',
    name: 'Steel Morningstar',
    description: 'A spiked steel ball chained to an ashwood handle. The morningstar excels at bypassing shields through its unpredictable flail-like arc.',
    itemType: ItemType.CLUB,
    materialType: MaterialType.METAL,
    weight: 3.0,
    cost: 1600,
    buyPrice: 2400,
    sellPrice: 640,
    toHitBonus: 7,
    statEffects: fx(4, 0, 0, 2, 25, 0, 3, 0, 2, 10, 1, 2, 0),
  },

  // --- Tier 3 ---------------------------------------------------------------
  {
    slug: 'mithril-mace',
    name: 'Mithril Mace',
    description: 'A flanged mithril mace that vibrates at a magical frequency, causing each blow to disorient the target for two seconds. Clerics prize it as a blessed implement.',
    itemType: ItemType.CLUB,
    materialType: MaterialType.METAL,
    weight: 2.8,
    cost: 7500,
    buyPrice: 11250,
    sellPrice: 3000,
    toHitBonus: 12,
    statEffects: fx(5, 1, 3, 2, 50, 40, 6, 0, 3, 12, 2, 3, 5),
  },

  // --- Tier 4 ---------------------------------------------------------------
  {
    slug: 'void-sceptre',
    name: 'Void Sceptre',
    description: "A ceremonial sceptre whose crystalline head contains a miniature void singularity. Each strike pulls at the target's life force, reducing their maximum HP for 30 seconds.",
    itemType: ItemType.CLUB,
    materialType: MaterialType.UNKNOWN,
    weight: 2.2,
    cost: 40000,
    buyPrice: 60000,
    sellPrice: 16000,
    toHitBonus: 18,
    statEffects: fx(4, 2, 8, 2, 60, 80, 8, 4, 6, 15, 3, 2, 8),
  },

  // --- Tier 5 ---------------------------------------------------------------
  {
    slug: 'infernal-warlord-mace',
    name: "Infernal Warlord's Mace",
    description: 'The war-mace of a vanquished arch-devil, its head still smoulders with hellfire. Enemies struck are wreathed in brimstone flames that tick for infernal damage for 10 seconds.',
    itemType: ItemType.CLUB,
    materialType: MaterialType.UNKNOWN,
    weight: 5.0,
    cost: 190000,
    buyPrice: 285000,
    sellPrice: 76000,
    toHitBonus: 29,
    statEffects: fx(14, 0, 7, 7, 130, 60, 12, 4, 14, 32, 7, 7, 7),
  },

  // =========================================================================
  // AXES
  // =========================================================================

  // --- Tier 1 ---------------------------------------------------------------
  {
    slug: 'iron-hatchet',
    name: 'Iron Hatchet',
    description: 'A compact iron hatchet equally at home felling timber or splitting goblin helms. The varnished hickory handle is a step above the rest of the crude ironwork.',
    itemType: ItemType.AXE,
    materialType: MaterialType.METAL,
    weight: 1.2,
    cost: 160,
    buyPrice: 240,
    sellPrice: 64,
    toHitBonus: 3,
    statEffects: fx(2, 1, 0, 0, 5, 0, 2, 0, 1, 4, 0, 1, 0),
  },
  {
    slug: 'steel-battle-axe',
    name: 'Steel Battle Axe',
    description: 'A broad single-bitted axe with a weighted poll opposite the blade, improving balance for throwing. Veterans notch the spine after every confirmed kill.',
    itemType: ItemType.AXE,
    materialType: MaterialType.METAL,
    weight: 3.5,
    cost: 1100,
    buyPrice: 1650,
    sellPrice: 440,
    toHitBonus: 6,
    statEffects: fx(4, 0, 0, 1, 20, 0, 3, 0, 2, 8, 1, 2, 0),
  },

  // --- Tier 2 ---------------------------------------------------------------
  {
    slug: 'ash-bearded-axe',
    name: 'Ash Bearded Axe',
    description: "A classic bearded axe: the extended lower edge allows hooking an opponent's shield and wrenching it aside. The ash haft absorbs shock remarkably well.",
    itemType: ItemType.AXE,
    materialType: MaterialType.OTHER,
    weight: 2.8,
    cost: 1800,
    buyPrice: 2700,
    sellPrice: 720,
    toHitBonus: 7,
    statEffects: fx(4, 1, 0, 1, 20, 0, 4, 1, 2, 9, 1, 2, 0),
  },

  // --- Tier 3 ---------------------------------------------------------------
  {
    slug: 'darkwood-twin-axe',
    name: 'Darkwood Twin Axe',
    description: 'Two crescent blades of charged darkwood on a central haft allow spinning flourishes that strike up to three adjacent enemies. A favourite of berserker schools.',
    itemType: ItemType.AXE,
    materialType: MaterialType.WOOD,
    weight: 4.0,
    cost: 6800,
    buyPrice: 10200,
    sellPrice: 2720,
    toHitBonus: 12,
    statEffects: fx(7, 2, 1, 2, 40, 20, 6, 1, 5, 15, 2, 3, 2),
  },
  {
    slug: 'mithril-war-axe',
    name: 'Mithril War Axe',
    description: 'The mithril blade of this war axe is so finely honed that it radiates a blue shimmer in moonlight. It cleaves through armour with almost surgical precision.',
    itemType: ItemType.AXE,
    materialType: MaterialType.METAL,
    weight: 3.2,
    cost: 9500,
    buyPrice: 14250,
    sellPrice: 3800,
    toHitBonus: 14,
    statEffects: fx(8, 2, 0, 2, 50, 10, 7, 1, 5, 16, 2, 4, 1),
  },

  // --- Tier 4 ---------------------------------------------------------------
  {
    slug: 'adamantine-cleaver',
    name: 'Adamantine Cleaver',
    description: 'A massive double-bitted axe forged from meteorite adamantine. Each swing shakes the earth; landed crits send a shockwave that staggers enemies within two metres.',
    itemType: ItemType.AXE,
    materialType: MaterialType.METAL,
    weight: 8.0,
    cost: 42000,
    buyPrice: 63000,
    sellPrice: 16800,
    toHitBonus: 18,
    statEffects: fx(12, 0, 0, 5, 90, 0, 7, 0, 6, 22, 4, 6, 1),
  },

  // --- Tier 5 ---------------------------------------------------------------
  {
    slug: 'celestial-sundering-axe',
    name: 'Celestial Sundering Axe',
    description: 'Borne by the celestial champions who breached the demon fortress at the end of the last age, this axe splits dimensional barriers on its downswing.',
    itemType: ItemType.AXE,
    materialType: MaterialType.UNKNOWN,
    weight: 4.5,
    cost: 210000,
    buyPrice: 315000,
    sellPrice: 84000,
    toHitBonus: 33,
    statEffects: fx(18, 5, 8, 8, 160, 80, 15, 7, 17, 38, 8, 8, 10),
  },

  // =========================================================================
  // HAMMERS
  // =========================================================================

  // --- Tier 1 ---------------------------------------------------------------
  {
    slug: 'iron-warhammer',
    name: 'Iron Warhammer',
    description: 'A blunt-force iron warhammer with a square striking face and a tapered spike on the reverse. The long ash haft delivers impressive leverage with every swing.',
    itemType: ItemType.HAMMER,
    materialType: MaterialType.METAL,
    weight: 3.0,
    cost: 250,
    buyPrice: 375,
    sellPrice: 100,
    toHitBonus: 3,
    statEffects: fx(3, 0, 0, 1, 15, 0, 2, 0, 0, 4, 0, 2, 0),
  },
  {
    slug: 'bone-tenderiser',
    name: 'Bone Tenderiser',
    description: "A primitive but devastating hammer constructed from jaw-bone and wrapped femur. Cultists of the death goddess carry these as symbols of their patron's favour.",
    itemType: ItemType.HAMMER,
    materialType: MaterialType.BONE,
    weight: 2.5,
    cost: 300,
    buyPrice: 450,
    sellPrice: 120,
    toHitBonus: 3,
    statEffects: fx(3, 0, 1, 1, 15, 10, 1, 0, 0, 5, 0, 2, 1),
  },

  // --- Tier 2 ---------------------------------------------------------------
  {
    slug: 'steel-maul',
    name: 'Steel Maul',
    description: 'A two-handed steel maul built for siege crews. In the hands of a warrior, its earthshaking blows shatter shield and destabilise enemy formations.',
    itemType: ItemType.HAMMER,
    materialType: MaterialType.METAL,
    weight: 6.0,
    cost: 2000,
    buyPrice: 3000,
    sellPrice: 800,
    toHitBonus: 6,
    statEffects: fx(5, 0, 0, 2, 30, 0, 3, 0, 1, 10, 2, 3, 0),
  },

  // --- Tier 3 ---------------------------------------------------------------
  {
    slug: 'mithril-runic-hammer',
    name: 'Mithril Runic Hammer',
    description: 'An exquisite mithril hammer engraved with dwarven power runes. Each strike channels a surge of arcane force that can briefly stagger heavily armoured foes.',
    itemType: ItemType.HAMMER,
    materialType: MaterialType.METAL,
    weight: 4.0,
    cost: 8000,
    buyPrice: 12000,
    sellPrice: 3200,
    toHitBonus: 13,
    statEffects: fx(7, 1, 4, 3, 60, 50, 7, 1, 4, 14, 3, 4, 6),
  },
  {
    slug: 'darkwood-shaman-hammer',
    name: 'Darkwood Shaman Hammer',
    description: "Half weapon, half ritual implement. The darkwood head resonates with nature magic; hits have a chance to summon a binding root entanglement at the target's feet.",
    itemType: ItemType.HAMMER,
    materialType: MaterialType.WOOD,
    weight: 3.5,
    cost: 7200,
    buyPrice: 10800,
    sellPrice: 2880,
    toHitBonus: 11,
    statEffects: fx(5, 1, 6, 2, 50, 60, 5, 2, 3, 12, 2, 3, 5),
  },

  // --- Tier 4 ---------------------------------------------------------------
  {
    slug: 'adamantine-juggernaut-hammer',
    name: 'Adamantine Juggernaut Hammer',
    description: 'A two-handed hammer so massive that swinging it creates a visible shockwave. Crits cause a 5-second stun. Requires STR 22 to equip without penalty.',
    itemType: ItemType.HAMMER,
    materialType: MaterialType.METAL,
    weight: 12.0,
    cost: 48000,
    buyPrice: 72000,
    sellPrice: 19200,
    toHitBonus: 17,
    statEffects: fx(14, 0, 0, 6, 100, 0, 6, 0, 5, 20, 4, 8, 1),
  },
  {
    slug: 'void-resonance-hammer',
    name: 'Void Resonance Hammer',
    description: 'The void-stone head of this hammer phases out of reality for a split second upon impact, bypassing all physical damage reduction. A terrifying weapon in siege scenarios.',
    itemType: ItemType.HAMMER,
    materialType: MaterialType.UNKNOWN,
    weight: 5.0,
    cost: 44000,
    buyPrice: 66000,
    sellPrice: 17600,
    toHitBonus: 20,
    statEffects: fx(10, 0, 6, 3, 80, 40, 9, 2, 7, 20, 4, 4, 7),
  },

  // --- Tier 5 ---------------------------------------------------------------
  {
    slug: 'infernal-godsmasher',
    name: 'Infernal Godsmasher',
    description: 'Forged to slay deity-touched beings, the Godsmasher ignores all forms of divine protection. Legends say it cracked the skull of a lesser god in the Sundering War.',
    itemType: ItemType.HAMMER,
    materialType: MaterialType.UNKNOWN,
    weight: 9.0,
    cost: 240000,
    buyPrice: 360000,
    sellPrice: 96000,
    toHitBonus: 33,
    statEffects: fx(20, 0, 8, 10, 180, 60, 13, 4, 16, 40, 9, 10, 8),
  },
  {
    slug: 'celestial-dawnbreaker',
    name: 'Celestial Dawnbreaker',
    description: 'The sacred hammer of the Order of the Rising Sun, reforged from meteoric celestial iron after the God-War. Its head radiates continuous holy light that burns undead.',
    itemType: ItemType.HAMMER,
    materialType: MaterialType.UNKNOWN,
    weight: 4.8,
    cost: 250000,
    buyPrice: 375000,
    sellPrice: 100000,
    toHitBonus: 35,
    statEffects: fx(16, 2, 12, 10, 200, 120, 15, 8, 16, 38, 10, 8, 15),
  },
];
