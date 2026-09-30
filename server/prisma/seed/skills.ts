// server/prisma/seed/skills.ts

import { PrismaClient, Skill, SkillType } from "@prisma/client";

const seedName: string = 'Skills';

// ---------------------------------------------------------------------------
// SEED FUNCTION
// ---------------------------------------------------------------------------
export async function seedSkills(prisma: PrismaClient): Promise<void> {
  for (const record of data) {
    const slugName: string = record.slug.replace("-", "_");
    const result: Skill = await prisma.skill.upsert({
      where: { slug: slugName },
      update: {
        slug:         slugName,
        name:         record.name,
        description:  record.description,
        skillType:    record.skillType,
      },
      create: {
        slug:         slugName,
        name:         record.name,
        description:  record.description,
        skillType:    record.skillType,
      },
    });
    console.log(`  ✅ ${result.name.padEnd(36)} `);
  }
  console.log(`\n🗡️ ${seedName} seeding complete - ${data.length} records upserted.\n`);
}

const seedFn = (
  slug = "", name = "", description = "", skillType: SkillType= SkillType.SOCIAL
): SkillSeed => ({
  slug, name, description, skillType,
});

export interface SkillSeed {
  slug: string;
  name: string;
  description: string;
  skillType: SkillType;
}

// ---------------------------------------------------------------------------
// SKILL DATA
// ---------------------------------------------------------------------------
const data: SkillSeed[] = [
  seedFn("armor","Armor Mastery","Mastery of Armor", SkillType.ARMOR),
  seedFn("shield","Shield Mastery","Mastery of Shields", SkillType.ARMOR),
  seedFn("brewing","Brewing","Mastery of Brewing", SkillType.CRAFTING),
  seedFn("cooking","Cooking","Mastery of Cooking", SkillType.CRAFTING),
  seedFn("crafting","Crafting","Mastery of Crafting", SkillType.CRAFTING),
  seedFn("herbalism","Herbalism","Mastery of Herbs", SkillType.CRAFTING),
  seedFn("potion","Potion Making","Mastery of Potion Making", SkillType.CRAFTING),
  seedFn("smithing","Smithing","Mastery of Smithing", SkillType.CRAFTING),
  seedFn("tool","Tool Mastery","Mastery of Tool Use", SkillType.CRAFTING),
  seedFn("woodworking","Woodworking","Mastery of Woodworking", SkillType.CRAFTING),
  seedFn("herbs","Herb Gathering","Mastery of Herb Gathering", SkillType.GATHERING),
  seedFn("mining","Mining","Mastery of Mining", SkillType.GATHERING),
  seedFn("alchemy","Alchemy","Mastery of Alchemy", SkillType.MAGIC),
  seedFn("enchant","Enchanting","Mastery of Enchanting", SkillType.MAGIC),
  seedFn("engrave","Engraving","Mastery of Engraving", SkillType.MAGIC),
  seedFn("casting","Casting Magic","Mastery of Magic", SkillType.MAGIC),
  seedFn("scribe","Scroll Inscription","Mastery of Scroll Inscription", SkillType.MAGIC),
  seedFn("scroll","Scroll Mastery","Mastery of Scroll Use", SkillType.MAGIC),
  seedFn("barter","Bartering","Mastery of Bartering", SkillType.SOCIAL),
  seedFn("husbandry","Husbandry","Mastery of Husbandry", SkillType.SOCIAL),
  seedFn("training","Animal Training","Mastery of Animal Training", SkillType.SOCIAL),
  seedFn("axe","Axe Mastery","Mastery of Axes", SkillType.WEAPON),
  seedFn("bow","Bow Mastery","Mastery of Bows", SkillType.WEAPON),
  seedFn("club","Club Mastery","Mastery of Clubs", SkillType.WEAPON),
  seedFn("crossbow","Crossbow Mastery","Mastery of Crossbows", SkillType.WEAPON),
  seedFn("hammer","Hammer Mastery","Mastery of Hammers", SkillType.WEAPON),
  seedFn("knife","Knife Mastery","Mastery of Knives", SkillType.WEAPON),
  seedFn("sling","Sling Mastery","Mastery of Slings", SkillType.WEAPON),
  seedFn("staff","Staff Mastery","Mastery of Staves", SkillType.WEAPON),
  seedFn("sword","Sword Mastery","Mastery of Swords", SkillType.WEAPON),
  seedFn("wand","Wand Mastery","Mastery of Wands", SkillType.WEAPON),
];
