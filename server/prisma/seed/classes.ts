// server/prisma/seed/classes.ts


import { PrismaClient, StatType, WeaponType } from '@prisma/client';

export async function seedClasses(prisma: PrismaClient): Promise<void> {

  // Combat Classes
  const data: any[] = [
    { name: 'Cavalier', description: 'Mounted combat expert with high mobility and defense.', primaryStat: StatType.STR, bonuses: { attackBonus: 0.15 }, favoredWeapon: WeaponType.SWORDS },
    { name: 'Marauder', description: 'Fierce frontline warrior focused on raw damage.', primaryStat: StatType.STR, bonuses: { attackBonus: 0.20 }, favoredWeapon: WeaponType.AXES },
    { name: 'Mage', description: 'Scholar of the arcane, capable of powerful area attacks.', primaryStat: StatType.INT, bonuses: { attackBonus: 0.25 }, favoredWeapon: WeaponType.SCROLLS },
    { name: 'Rogue', description: 'Master of stealth and precision strikes.', primaryStat: StatType.DEX, bonuses: { attackBonus: 0.15 }, favoredWeapon: WeaponType.KNIVES },
    { name: 'Archer', description: 'Long-range specialist with unmatched accuracy.', primaryStat: StatType.DEX, bonuses: { attackBonus: 0.15 }, favoredWeapon: WeaponType.BOWS },
    { name: 'Beastmaster', description: 'Commander of loyal pets and wild creatures.', primaryStat: StatType.CHA, bonuses: { attackBonus: 0.10 }, favoredWeapon: WeaponType.PETS },
  ];

  for (const c of data) {
    await prisma.class.upsert({
      where: { name: c.name },
      update: {
        description: c.description,
        primaryStat: c.primaryStat,
        bonuses: c.bonuses,
        favoredWeapon: c.favoredWeapon,
      },
      create:  {
        name: c.name,
        description: c.description,
        primaryStat: c.primaryStat,
        bonuses: c.bonuses,
        favoredWeapon: c.favoredWeapon,
      },
    })
  }

  console.log('Classes seeded.');
}

