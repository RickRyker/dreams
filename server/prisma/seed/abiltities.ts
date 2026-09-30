// server/prisma/seed/abiltities.ts


import {Ability, EffectType, ElementType, PrismaClient, TelegraphShape} from '@prisma/client';

type AbilitySeed = {
  slug: string;
  name: string;
  school: string;
  effectType: EffectType;
  resourceCost: number;
  castTimeMs: number;
  cooldownMs: number;
  range: number;
  isInstant: boolean;
  isChannel: boolean;
  baseAmount: number;
  durationMs: number;
  tickIntervalMs: number;
  telegraph: any;
  element: ElementType;
  tags: string[];
};

const seedFn = (...args: any[]): AbilitySeed => {
  const [
    slug = "",
    name = "",
    baseDamage = 0,
    baseHeal = 0,
    resourceCost = 0,
    castTimeMs = 0,
    cooldownMs = 0,
    school = "",
    effectType = EffectType.OTHER,
    magnitude = 0,
    durationMs = 0,
    tickIntervalMs = 0,
    range = 0,
    isInstant = false,
    isChannel = false,
    telegraph = null,
    element = ElementType.NONE,
    tags = [],
  ] = args;

  return {
    slug,
    name,
    school,
    effectType,
    resourceCost,
    castTimeMs,
    cooldownMs,
    range,
    isInstant,
    isChannel,
    baseAmount: baseDamage || baseHeal || magnitude,
    durationMs,
    tickIntervalMs,
    telegraph,
    element,
    tags,
  };
};

const DATA: AbilitySeed[] = [
  seedFn("fireball", "Fireball", 40, 0, 20, 0, 3000,
    "FIRE", EffectType.OTHER, 20, 0, 3000, 2, true, false, 40, 0, 0,
    { shape: TelegraphShape.CIRCLE, radius: 2 },
    ElementType.FIRE, ["DAMAGE"]),

  seedFn("frost-bolt", "Frost Bolt", 30, 0, 15, 0, 2500,
    "ICE", EffectType.SLOW, 15, 0, 2500, 4, true, false, 30, 4000, 0,
    { shape: TelegraphShape.CIRCLE, radius: 1 },
    ElementType.ICE, ["DAMAGE", "DEBUFF"]),

  seedFn("fire-shield", "Fire Shield", 0, 0, 20, 0, 8000,
    "FIRE", EffectType.SHIELD, 20, 0, 8000, 0, true, false, 150, 10000, 0,
    { shape: TelegraphShape.CIRCLE, radius: 0 },
    ElementType.FIRE, ["BUFF"]),

  seedFn("ice-barrier", "Ice Barrier", 0, 0, 20, 0, 8000,
    "ICE", EffectType.SHIELD, 20, 0, 8000, 0, true, false, 150, 8000, 0,
    { shape: TelegraphShape.CIRCLE, radius: 0 },
    ElementType.ICE, ["BUFF"]),

  seedFn("lesser-heal", "Lesser Heal", 0, 35, 15, 1500, 2500,
    "SPIRIT", EffectType.OTHER, 15, 1500, 2500, 1, true, false, 35, 0, 0,
    { shape: TelegraphShape.CIRCLE, radius: 0 },
    ElementType.SPIRIT, ["HEAL"]),

  seedFn("lightning-strike", "Lightning Strike", 45, 0, 25, 0, 3500,
    "LIGHTNING", EffectType.OTHER, 25, 0, 3500, 3, true, false, 45, 0, 0,
    { shape: TelegraphShape.CIRCLE, radius: 0 },
    ElementType.LIGHTNING, ["DAMAGE"]),

  seedFn("melee-attack", "Melee Attack", 10, 0, 0, 0, 0,
    "NONE", EffectType.OTHER, 0, 0, 0, 1, true, false, 10, 0, 0,
    { shape: TelegraphShape.CIRCLE, radius: 0 },
    ElementType.NONE, ["DAMAGE"]),

  seedFn("poison-sting", "Poison Sting", 0, 0, 10, 0, 2000,
    "POISON", EffectType.DOT, 10, 0, 2000, 2, true, false, 5, 10000, 2000,
    { shape: TelegraphShape.CIRCLE, radius: 0 },
    ElementType.POISON, ["DOT"]),

  seedFn("regeneration-aura", "Regeneration Aura", 0, 25, 25, 0, 8000,
    "NATURE", EffectType.HOT, 25, 0, 8000, 0, false, true, 6, 10000, 2000,
    { shape: TelegraphShape.CIRCLE, radius: 0 },
    ElementType.NATURE, ["HOT", "BUFF"]),

  seedFn("taunt", "Taunt", 0, 0, 0, 0, 6000,
    "NONE", EffectType.TAUNT, 0, 0, 6000, 0, true, false, 0, 0, 0,
    { shape: TelegraphShape.CIRCLE, radius: 0 },
    ElementType.NONE, ["TAUNT", "DEBUFF"]),
];

export async function seedAbilities(prisma: PrismaClient): Promise<void> {
  for (const record of DATA) {
    const ability: Ability = await prisma.ability.upsert({
      where: { slug: record.slug },
      update: {
        slug: record.slug,
        name: record.name,
        school: record.school,
        effectType: record.effectType,
        castTimeMs: record.castTimeMs,
        cooldownMs: record.cooldownMs,
        resourceCost: record.resourceCost,
        range: record.range,
        isInstant: record.isInstant,
        isChannel: record.isChannel,
        baseAmount: record.baseAmount,
        durationMs: record.durationMs,
        tickIntervalMs: record.tickIntervalMs,
        telegraph: record.telegraph,
      //element: record.element,
        tags: record.tags,
      //version: record.version,
      },
      create: {
        slug: record.slug,
        name: record.name,
        school: record.school,
        effectType: record.effectType,
        castTimeMs: record.castTimeMs,
        cooldownMs: record.cooldownMs,
        resourceCost: record.resourceCost,
        range: record.range,
        isInstant: record.isInstant,
        isChannel: record.isChannel,
        baseAmount: record.baseAmount,
        durationMs: record.durationMs,
        tickIntervalMs: record.tickIntervalMs,
        telegraph: record.telegraph,
      //element: record.element,
        tags: record.tags,
      //version: record.version,
      },
    });
    console.log("Ability: ", ability.slug, ability.name);
  }

  console.log("Abilities seeded.");
}
