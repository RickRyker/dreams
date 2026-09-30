// server/prisma/seed/monsters.ts

import {AttackType, ElementType, PrismaClient} from '@prisma/client';

export async function seedMonsters(prisma: PrismaClient): Promise<void> {

  const MONSTER_TYPES = [
    { name: 'Banshee', description: 'Undead spirits with powerful area-of-effect magic.', spriteImage: 'assets/monsters/banshee.png' },
    { name: 'Beholder', description: 'Magical floating bosses with multiple ranged beam attacks.', spriteImage: 'assets/monsters/beholder.png' },
    { name: 'Centaur', description: 'High-mobility archers or spear-wielders.', spriteImage: 'assets/monsters/centaur.png' },
    { name: 'Chimera', description: 'Multi-attack melee boss.', spriteImage: 'assets/monsters/chimera.png' },
    { name: 'Cockatrice', description: 'Small creatures that can temporarily petrify players.', spriteImage: 'assets/monsters/cockatrice.png' },
    { name: 'Dragon', description: 'High HP magic/melee hybrid.', spriteImage: 'assets/monsters/dragon.png' },
    { name: 'Fire Imp', description: 'Small ranged casters.', spriteImage: 'assets/monsters/fire_imp.png' },
    { name: 'Frost Giant', description: 'Colossal beings from the frozen wastes, wielding massive ice weapons', spriteImage: 'assets/monsters/frozen_giant.png' },
    { name: 'Frost', description: 'Creatures of the eternal winter.', spriteImage: 'assets/monsters/frost.png' },
    { name: 'Gaoric', description: 'Disciplined warriors and monsters of the Gaoric legion.', spriteImage: 'assets/monsters/gaoric_legion.png' },
    { name: 'Gargoyle', description: 'High defense melee tanks.', spriteImage: 'assets/monsters/gargoyle.png' },
    { name: 'Ghost', description: 'Can move through objects.', spriteImage: 'assets/monsters/ghosts.png' },
    { name: 'Giant', description: 'A massive humanoid of uncommon strength.', spriteImage: 'assets/monsters/giant.png' },
    { name: 'Giant Spider', description: 'Ranged attackers that can slow players.', spriteImage: 'assets/monsters/giant_spider.png' },
    { name: 'Goblin', description: 'Fast, low-HP melee unites.', spriteImage: 'assets/monsters/goblin.png' },
    { name: 'Griffin', description: 'High-dexterity ranged/melee hybrid.', spriteImage: 'assets/monsters/griffon.png' },
    { name: 'Harpy', description: 'Fast, flying melee units that debuff players.', spriteImage: 'assets/monsters/harpy.png' },
    { name: 'Hydra', description: 'Multi-headed boss that regenerates health.', spriteImage: 'assets/monsters/hydra.png' },
    { name: 'Ice', description: 'Creatures of the eternal winter.', spriteImage: 'assets/monsters/ice.png' },
    { name: 'Ice Elemental', description: 'Living constructs of pure glacier, resistant to physical blows.', spriteImage: 'assets/monsters/ice_elemental.png' },
    { name: 'Iron Golem', description: 'Massive, slow melee tanks with extreme physical resistance.', spriteImage: 'assets/monsters/iron_golem.png' },
    { name: 'Lich', description: 'High-tier magic boss.', spriteImage: 'assets/monsters/lich.png' },
    { name: 'Living Armor', description: 'Enchanted suits of mail that resist magic.', spriteImage: 'assets/monsters/living_armor.png' },
    { name: 'Manticore', description: 'Ranged/melee hybrid with tail spikes.', spriteImage: 'assets/monsters/manticore.png' },
    { name: 'Mimic', description: 'Ambush predators disguised as treasure chests.', spriteImage: 'assets/monsters/mimic.png' },
    { name: 'Minotaur', description: 'Powerful maze-dwelling melee tanks with high HP.', spriteImage: 'assets/monsters/minotaur.png' },
    { name: 'Nature', description: 'Guardians of the forest and wild growth.', spriteImage: 'assets/monsters/nature.png' },
    { name: 'Orc Warrior', description: 'Brute strength melee units.', spriteImage: 'assets/monsters/orc_warrior.png' },
    { name: 'Skeleton', description: 'Standard melee with high resistance.', spriteImage: 'assets/monsters/skeleton.png' },
    { name: 'Treant', description: 'Nature-based tanks that can entangle players.', spriteImage: 'assets/monsters/treant.png' },
    { name: 'Troll', description: 'High-HP melee units that regenerate wounds.', spriteImage: 'assets/monsters/troll.png' },
    { name: 'Water Weird', description: 'Melee attackers with reach.', spriteImage: 'assets/monsters/water_weird.png' },
    { name: 'Wisp', description: 'Floating magic entities that are hard to hit.', spriteImage: 'assets/monsters/wisp.png' },
    { name: 'Wolf', description: 'Pack-based melee attackers.', spriteImage: 'assets/monsters/wolf.png' },
    { name: 'Wraith', description: 'Shadowy entities that drain fatigue or mana.', spriteImage: 'assets/monsters/wraith.png' },
    { name: 'Zombie', description: 'Slow melee with high HP.', spriteImage: 'assets/monsters/zombie.png' },
  ].sort((a: any, b: any) => a.name.localeCompare(b.name));
  /* id, name, description, attackType, baseHp, baseStrength, element, spriteImage */

  for (const mt of MONSTER_TYPES) {
    await prisma.monsterType.upsert({
      where: { name: mt.name },
      update: mt,
      create: mt,
    });
  }

  const MONSTERS = [
    { name: 'Ancient Treant', description: 'A massive sentient tree with stony bark.', monsterTypeName: 'Treant',
      spriteImage: 'assets/monsters/ancient_treant.png', element: ElementType.NATURE, attackType: AttackType.MELEE,
      level: 100, health: 100, mana: 100, strength: 100, dexterity: 100, intelligence: 100, charisma: 100,
      critChance: 0.01, critDamage: 0.01, critResistance: 0.15, damageReduction: 0.05, spellResistance: 0.05,
      minGold: 0, maxGold: 100, invasionMonster: false, isBoss: false, behavior: {},
      loot: [
        { slug: 'water', minQty: 1, maxQty: 2, dropRate: 0.25 },
        { slug: 'bread-standard', minQty: 1, maxQty: 3, dropRate: 0.5 },
        { slug: 'wood', minQty: 1, maxQty: 5, dropRate: 0.35 },
      ]
    },
    { name: 'Forest Sprite', description: 'A tiny, playful, yet dangerous forest guardian.', monsterTypeName: 'Nature',
      spriteImage: 'assets/monsters/forest_sprite.png', element: ElementType.NATURE, attackType: AttackType.MAGIC,
      level: 3, health: 40, mana: 10, strength: 2, dexterity: 25, intelligence: 20, charisma: 10,
      critChance: 0.25, critDamage: 0.10, critResistance: 0.25, damageReduction: 0.20, spellResistance: 0.30,
      minGold: 10, maxGold: 30, invasionMonster: false, isBoss: false, behavior: {},
      loot: [
        { slug: 'wood', minQty: 1, maxQty: 2, dropRate: 0.25 },
        { slug: 'bone-knife', minQty: 1, maxQty: 3, dropRate: 0.5 },
      ]
    },
    { name: 'Gaoric Soldier', description: 'A standard infantryman of the Gaoric Legion', monsterTypeName: 'Gaoric',
      spriteImage: 'assets/monsters/gaoric_soldier.png', element: ElementType.NONE, attackType: AttackType.MELEE,
      health: 120, strength: 15, dexterity: 10, intelligence: 5, spellResistance: 0.0,
      invasionMonster: true, minGold: 20, maxGold: 50, loot: [
        { slug: 'iron-sword', minQty: 1, maxQty: 1, dropRate: 0.15 },
      ]},
    { name: 'Gaoric Archer', description: 'A marksman trained in the Gaoric military.', monsterTypeName: 'Gaoric',
      spriteImage: 'assets/monsters/gaoric_archer.png', element: ElementType.AIR, attackType: AttackType.RANGED,
      health: 80, strength: 10, dexterity: 20, intelligence:8, spellResistance: 0.0,
      invasionMonster: true, minGold: 15, maxGold: 45, loot: [
        { slug: 'wooden-bow', minQty: 1, maxQty: 1, dropRate: 0.15 },
      ]},
    { name: 'Gaoric Mage', description: 'A battle mage wielding Gaoric sorcery.', monsterTypeName: 'Gaoric',
      spriteImage: 'assets/monsters/gaoric_mage.png', element: ElementType.FIRE, attackType: AttackType.MAGIC,
      invasionMonster: true, minGold: 30, maxGold: 80, loot: [
        { slug: 'mage-robe', minQty: 1, maxQty: 1, dropRate: 0.05 },
      ]},
    { name: 'Gaoric Cryomancer', description: 'A Gaoric specialist using freezing magic to immobilize enemies.', monsterTypeName: 'Gaoric',
      spriteImage: 'assets/monsters/gaoric_cryomancer.png', element: ElementType.ICE, attackType: AttackType.MAGIC,
      level: 40, health: 75, strength: 6, dexterity: 12, intelligence: 28, minGold: 30, maxGold: 85,
      invasionMonster: true, loot: [
        { slug: 'mage-robe', minQty: 1, maxQty: 1, dropRate: 0.05 },
      ] },
    { name: 'Gaoric Commander', description: 'A high-ranking officer of the invading Gaoric forces.', monsterTypeName: 'Gaoric',
      spriteImage: 'assets/monsters/gaoric_commander.png', element: ElementType.SPIRIT, attackType: AttackType.MELEE,
      level: 75, health: 300, strength: 30, dexterity: 20, intelligence: 20, spellResistance: 20,
      invasionMonster: true, minGold: 200, maxGold: 500, loot: [
        { slug: 'water', minQty: 1, maxQty: 1, dropRate: 0.5 },
      ]},
    { name: 'Frost Giant Warrior', description: 'A massive warrior from the north.', monsterTypeName: 'Giant',
      spriteImage: 'assets/monsters/frost_giant_warrior.png', element: ElementType.ICE, attackType: AttackType.MELEE,
      level: 15, health: 450, strength: 40, dexterity: 10, intelligence: 10, spellResistance: 15,
      invasionMonster: true, loot: [
        { slug: 'finger-bone', minQty: 1, maxQty: 1, dropRate: 0.1 },
        { slug: 'water', minQty: 1, maxQty: 1, dropRate: 0.5 },
      ]},
    { name: 'Ice Wraith', description: 'A chilling spirit that drains the warmth from its victims.', monsterTypeName: 'Wraith',
      spriteImage: 'assets/monsters/ice_wraith.png', element: ElementType.ICE, attackType: AttackType.MAGIC,
      level: 5, health: 60, strength: 5, dexterity: 20, intelligence: 15, spellResistance: 40,
      invasionMonster: true, loot: [
        { slug: 'water', minQty: 1, maxQty: 1, dropRate: 0.5 },
      ]},
  ];

  for (const m of MONSTERS) {
    const monsterType: any = await prisma.monsterType.findUnique({
      where: { name: m.monsterTypeName },
    });
    if (monsterType) {
      const monster = await prisma.monster.upsert({
        where: { name: m.name },
        update: { name: m.name },
        create: {
          name: m.name,
          description: m.description,
          monsterTypeId: monsterType.id,
          spriteImage: m.spriteImage,
          element: m.element,
          attackType: m.attackType,
          level: 100,
          health: 100,
          mana: 100,
          strength: 100,
          dexterity: 100,
          intelligence: 100,
          charisma: 100,
          minGold: 0,
          maxGold: 100,
          critChance: 0.01,
          critDamage: 0.01,
          critResistance: 0.15,
          damageReduction: 0.05,
          spellResistance: 0.05,
          invasionMonster: false,
          isBoss: false,
          behavior: {},
          // loot[]
        },
      });
      if (m.loot)
      for (const lootTable of m.loot) {
        const item: any = await prisma.item.findUnique({
          where: { slug: lootTable['slug'] },
        });
        if (!item) continue;
        await prisma.monsterLootTable.upsert({
          where: {
            monsterId_itemId: {
              monsterId: monster.id,
              itemId: item.id,
            },
          },
          update: {},
          create: {
            monsterId: monster.id,
            itemId: item.id,
            minQty: lootTable.minQty,
            maxQty: lootTable.maxQty,
            dropRate: lootTable.dropRate,
          },
        });
      }
    }
  }
  console.log('Monsters seeded.');
}
