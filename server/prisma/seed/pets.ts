// server/prisma/seed/pets.ts


import {AttackType, ElementType, PetFamilyType, PetType, PrismaClient} from '@prisma/client';

export const petX = (
  slug = '', name = '', tier = 0, family:PetFamilyType = PetFamilyType.BEAST, hp  = 0, str  = 0,
  attack: AttackType = AttackType.MELEE, element: ElementType = ElementType.NONE,
  evolvesFrom = '', evolvesTo = '', defaultPet = false, mountable = false,
): PetTypeSeed => ({
  slug, name, tier, family, hp, str, attack, element, evolvesFrom, evolvesTo, defaultPet, mountable,
});

export interface PetTypeSeed {
  slug: string;
  name: string;
  tier: number;
  family: PetFamilyType;
  hp: number;
  str: number;
  attack: AttackType;
  element: ElementType;
  evolvesFrom: string;
  evolvesTo: string;
  defaultPet: boolean;
  mountable: boolean;
}

export async function seedPets(prisma: PrismaClient): Promise<void> {

  for (const petType of petTypes) {
    const result: PetType = await prisma.petType.upsert({
      where: { name: petType.name },
      update: {
        name: petType.name,
      },
      create: {
        slug: petType.slug,
        name: petType.name,
        defaultPet: petType.defaultPet,
        isMountable: petType.mountable,
        attackType: petType.attack,
        element: petType.element,
        family: petType.family,
        tier: petType.tier,
        baseHp: petType.hp,
        baseStrength: petType.str,
        // critChance: petType.critChange,
        // critDamage: petType.critDamage,
        // critResistance: petType.critResistance,
        // damageReduction: petType.damageReduction,
        // spellResistance: petType.spellResistance,
        spriteImage: '/assets/pets/' + petType.slug + '.png',
        evolvesFrom: petType.evolvesFrom,
        evolvesTo: petType.evolvesTo,
      },
    });
    console.log('Seeded pet type:', petType.slug, petType.name);
  }

  console.log('Pet types seeded.');
}

const petTypes: PetTypeSeed[] = [
  // Tier 0
  petX('armadillo', 'Armadillo', 0, PetFamilyType.BEAST, 120, 8, AttackType.MELEE, ElementType.EARTH),
  petX('camel', 'Camel', 0, PetFamilyType.BEAST, 180, 10, AttackType.MELEE, ElementType.EARTH),
  petX('chicken', 'Chicken', 0, PetFamilyType.BEAST, 20, 2, AttackType.MELEE, ElementType.NONE),
  petX('duck', 'Duck', 0, PetFamilyType.BEAST, 25, 3, AttackType.RANGED, ElementType.WATER),
  petX('flying-pig', 'Flying Pig', 0, PetFamilyType.BEAST, 60, 8, AttackType.RANGED, ElementType.AIR),
  petX('pebble', 'Pebble', 0, PetFamilyType.BEAST, 40, 2, AttackType.MELEE, ElementType.EARTH),
  petX('rabbit', 'Rabbit', 0, PetFamilyType.BEAST, 15, 1, AttackType.MELEE, ElementType.EARTH),
  petX('slime', 'Slime', 0, PetFamilyType.BEAST, 50, 4, AttackType.MELEE, ElementType.WATER),
  petX('spider', 'Spider', 0, PetFamilyType.BEAST, 80, 12, AttackType.RANGED, ElementType.EARTH),
  petX('squirrel', 'Squirrel', 0, PetFamilyType.BEAST, 20, 3, AttackType.RANGED, ElementType.EARTH),
  petX('turtle', 'Turtle', 0, PetFamilyType.BEAST, 100, 5, AttackType.MELEE, ElementType.WATER),

  // Tier 1
  petX('bat', 'Bat', 1, PetFamilyType.BEAST, 30, 5, AttackType.MAGIC, ElementType.AIR, '', '', true),
  petX('cat', 'Cat', 1, PetFamilyType.BEAST, 30, 3, AttackType.MELEE, ElementType.NONE, '', '', true),
  petX('dog', 'Dog', 1, PetFamilyType.BEAST, 50, 5, AttackType.MELEE, ElementType.NONE, '', '', true),
  petX('pig', 'Pig', 1, PetFamilyType.BEAST, 40, 2, AttackType.MELEE, ElementType.NONE, '', '', true),
  petX('rat', 'Rat', 1, PetFamilyType.BEAST, 15, 1, AttackType.MELEE, ElementType.NONE, '', '', true),

  // NEW Tier 1
  petX('mole', 'Mole', 1, PetFamilyType.BEAST, 35, 3, AttackType.MELEE, ElementType.EARTH, '', 'mudling'),
  petX('hedgehog', 'Hedgehog', 1, PetFamilyType.BEAST, 25, 2, AttackType.MELEE, ElementType.NONE, '', 'bramble-sprite'),
  petX('goat', 'Goat', 1, PetFamilyType.BEAST, 45, 4, AttackType.MELEE, ElementType.NONE, '', 'thunderhoof'),

  // Tier 2
  petX('dewdrop', 'Dewdrop', 2, PetFamilyType.ELEMENTAL, 25, 4, AttackType.MAGIC, ElementType.WATER),
  petX('ember', 'Ember', 2, PetFamilyType.ELEMENTAL, 25, 6, AttackType.MAGIC, ElementType.FIRE),
  petX('frog', 'Frog', 2, PetFamilyType.BEAST, 60, 5, AttackType.MELEE, ElementType.WATER),
  petX('owl', 'Owl', 2, PetFamilyType.BEAST, 25, 4, AttackType.MELEE, ElementType.NONE),
  petX('salamander', 'Salamander', 2, PetFamilyType.ELEMENTAL, 60, 10, AttackType.MAGIC, ElementType.FIRE),

  // NEW Tier 2
  petX('sparkling-gecko', 'Sparkling Gecko', 2, PetFamilyType.ELEMENTAL, 30, 6, AttackType.MAGIC, ElementType.LIGHTNING, 'lizard', 'gale-drake'),
  petX('mudling', 'Mudling', 2, PetFamilyType.ELEMENTAL, 40, 5, AttackType.MELEE, ElementType.EARTH, 'mole', 'mireback'),
  petX('bramble-sprite', 'Bramble Sprite', 2, PetFamilyType.ELEMENTAL, 35, 5, AttackType.MAGIC, ElementType.NATURE, 'hedgehog', 'mireback'),

  // Tier 3
  petX('bear', 'Bear', 3, PetFamilyType.BEAST, 250, 20, AttackType.MELEE, ElementType.EARTH),
  petX('lion', 'Lion', 3, PetFamilyType.BEAST, 200, 25, AttackType.MELEE, ElementType.NONE),
  petX('shark', 'Shark', 3, PetFamilyType.BEAST, 220, 22, AttackType.MELEE, ElementType.WATER),
  petX('tortoise', 'Tortoise', 3, PetFamilyType.BEAST, 350, 15, AttackType.MELEE, ElementType.EARTH),
  petX('unicorn', 'Unicorn', 3, PetFamilyType.BEAST, 200, 18, AttackType.MAGIC, ElementType.NATURE, '', '', false, true),

  // NEW Tier 3
  petX('dire-wolf', 'Dire Wolf', 3, PetFamilyType.BEAST, 120, 15, AttackType.MELEE, ElementType.NONE, 'dog', 'nightmare'),
  petX('basilisk', 'Basilisk', 3, PetFamilyType.BEAST, 150, 18, AttackType.MAGIC, ElementType.POISON, 'lizard', 'leviathan'),
  petX('mireback', 'Mireback', 3, PetFamilyType.BEAST, 180, 14, AttackType.MELEE, ElementType.EARTH, 'mudling', 'mammoth'),

  // Tier 4
  petX('falcon', 'Falcon', 4, PetFamilyType.FLYING, 40, 12, AttackType.RANGED, ElementType.AIR),
  petX('ghost', 'Ghost', 4, PetFamilyType.SPIRIT, 40, 8, AttackType.RANGED, ElementType.SPIRIT),
  petX('raven', 'Raven', 4, PetFamilyType.FLYING, 35, 6, AttackType.RANGED, ElementType.NONE),
  petX('wisp', 'Wisp', 4, PetFamilyType.SPIRIT, 15, 2, AttackType.RANGED, ElementType.SPIRIT),

  // NEW Tier 4
  petX('stormwing', 'Stormwing', 4, PetFamilyType.FLYING, 60, 14, AttackType.RANGED, ElementType.LIGHTNING, 'sparkling-gecko', 'drakehorse'),
  petX('shade-owl', 'Shade Owl', 4, PetFamilyType.FLYING, 45, 10, AttackType.RANGED, ElementType.SHADOW, 'owl', 'nightmare'),
  petX('gale-drake', 'Gale Drake', 4, PetFamilyType.FLYING, 70, 16, AttackType.MAGIC, ElementType.AIR, 'sparkling-gecko', 'griffin'),

  // Tier 5
  petX('donkey', 'Donkey', 5, PetFamilyType.MOUNT, 120, 6, AttackType.MELEE, ElementType.NONE, '', '', false, true),
  petX('hippogriff', 'Hippogriff', 5, PetFamilyType.MOUNT, 180, 15, AttackType.RANGED, ElementType.AIR, '', '', false, true),
  petX('horse', 'Horse', 5, PetFamilyType.MOUNT, 150, 10, AttackType.MELEE, ElementType.NONE, '', '', false, true),
  petX('ox', 'Ox', 5, PetFamilyType.MOUNT, 300, 18, AttackType.MELEE, ElementType.EARTH, '', '', false, true),
  petX('zebra', 'Zebra', 5, PetFamilyType.MOUNT, 160, 12, AttackType.MELEE, ElementType.NONE, '', '', false, true),

  // NEW Tier 5
  petX('chimera', 'Chimera', 5, PetFamilyType.MOUNT, 220, 22, AttackType.MAGIC, ElementType.FIRE, 'lion', 'archgriffin', false, true),
  petX('thunderhoof', 'Thunderhoof', 5, PetFamilyType.MOUNT, 200, 20, AttackType.MELEE, ElementType.LIGHTNING, 'goat', 'behemoth', false, true),
  petX('drakehorse', 'Drakehorse', 5, PetFamilyType.MOUNT, 240, 22, AttackType.MAGIC, ElementType.FIRE, 'stormwing', 'dragon', false, true),
  petX('nightmare', 'Nightmare', 5, PetFamilyType.MOUNT, 210, 20, AttackType.MAGIC, ElementType.SHADOW, 'shade-owl', 'ifrit', false, true),
  petX('mammoth', 'Mammoth', 5, PetFamilyType.MOUNT, 350, 25, AttackType.MELEE, ElementType.EARTH, 'mireback', 'behemoth', false, true),
  petX('griffin', 'Griffin', 5, PetFamilyType.MOUNT, 260, 24, AttackType.RANGED, ElementType.AIR, 'gale-drake', 'archgriffin', false, true),

  // Tier 6
  petX('dragon', 'Dragon', 6, PetFamilyType.LEGENDARY, 500, 40, AttackType.MAGIC, ElementType.FIRE, '', '', false, true),
  petX('leviathan', 'Leviathan', 6, PetFamilyType.LEGENDARY, 480, 38, AttackType.MAGIC, ElementType.WATER, 'basilisk'),
  petX('behemoth', 'Behemoth', 6, PetFamilyType.LEGENDARY, 520, 42, AttackType.MELEE, ElementType.EARTH, 'mammoth'),
  petX('archgriffin', 'Archgriffin', 6, PetFamilyType.LEGENDARY, 450, 36, AttackType.RANGED, ElementType.AIR, 'griffin'),
  petX('ifrit', 'Ifrit', 6, PetFamilyType.LEGENDARY, 460, 38, AttackType.MAGIC, ElementType.FIRE, 'nightmare'),
];
