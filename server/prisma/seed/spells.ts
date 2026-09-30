// server/prisma/seed/spells.ts

import {fx, StatEffects} from './items';
import {AttackType, ElementType, PrismaClient, Spell} from "@prisma/client";

const seedName: string = 'Spells';

// ---------------------------------------------------------------------------
// SEED FUNCTION
// ---------------------------------------------------------------------------
export async function seedSpells(prisma: PrismaClient): Promise<void> {

  for (const record of data) {
    const slugName = record.slug.replace("-", "_");
    const result: Spell = await prisma.spell.upsert({
      where: { slug: slugName },
      update: {
        name:         record.name,
        description:  record.description,
        minLevel:     record.minLevel,
        element:      record.element,
        skillSlug:    record.skillSlug,
        attackType:   record.attackType,
        manaCost:     record.manaCost,
        cooldown:     record.cooldown,
        castTime:     record.castTime,
        range:        record.range,
        areaOfEffect: record.areaOfEffect,
        effect:       record.statEffects,
      },
      create: {
        slug:         slugName,
        name:         record.name,
        description:  record.description,
        minLevel:     record.minLevel,
        element:      record.element,
        skillSlug:    record.skillSlug,
        attackType:   record.attackType,
        manaCost:     record.manaCost,
        cooldown:     record.cooldown,
        castTime:     record.castTime,
        range:        record.range,
        areaOfEffect: record.areaOfEffect,
        effect:       record.statEffects,
      },
    });

    console.log(`  ✅ ${result.name.padEnd(36)} `);
  }
  console.log(`\n🗡️ ${seedName} seeding complete - ${data.length} records upserted.\n`);
}

const seedFn = (
  slug = "", name = "", description = "", minLevel = 0,
  element: ElementType = ElementType.NONE, skillSlug: string = "",
  attackType: AttackType = AttackType.MELEE,
  manaCost = 0, cooldown = 0, castTime = 0, range = 0, areaOfEffect = 0,
  statEffects: StatEffects = fx(),
): SpellSeed => ({
  slug, name, description, minLevel, element, skillSlug, attackType,
  manaCost, cooldown, castTime, range, areaOfEffect, statEffects,
});

export interface SpellSeed {
  slug: string;
  name: string;
  description: string;
  minLevel: number;
  element: ElementType;
  skillSlug: string;
  attackType: AttackType;
  manaCost: number;
  cooldown: number;
  castTime: number;
  range: number;
  areaOfEffect: number;
  statEffects: StatEffects;
}

// ---------------------------------------------------------------------------
// SPELL DATA
// ---------------------------------------------------------------------------
const data: SpellSeed[] = [
  seedFn( "fire-ball", "Fire Ball", "Classic area of effect fire ball spell.",
    1, ElementType.FIRE, "casting", AttackType.MAGIC,
    100, 1000, 0, 4, 2, fx()),
];
