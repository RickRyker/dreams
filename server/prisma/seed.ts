// server/prisma/seed.ts

import 'dotenv/config';
import {PrismaClient} from '@prisma/client';
import {PrismaPg} from '@prisma/adapter-pg';
import {Pool} from 'pg';

import {seedAccounts} from './seed/accounts';
import {seedAbilities} from './seed/abiltities';
import {seedArmor} from './seed/armor';
import {seedAvatars} from './seed/avatars';
import {seedChatBots} from './seed/bots';
import {seedBlueprints} from './seed/blueprints';
import {seedClasses} from './seed/classes';
import {seedEggs} from './seed/eggs';
import {seedHolidays} from './seed/holidays';
import {seedAlchemicalIngredients} from './seed/ingredients.alchemy';
import {seedCookingIngredients} from './seed/ingredients.cooking';
import {seedEnchantingIngredients} from './seed/ingredients.enchanting';
import {seedLeatherWorkingIngredients} from "./seed/ingredients.leatherworking";
import {seedSmithingIngredients} from './seed/ingredients.smithing';
import {seedToolMakingIngredients} from './seed/ingredients.tools';
import {seedWoodworkingIngredients} from './seed/ingredients.woodworking';
import {seedItems} from './seed/items';
import {seedMaps} from './seed/maps';
import {seedMonsters} from './seed/monsters';
import {seedPets} from './seed/pets';
import {seedPlayers} from './seed/players';
import {seedProfanity} from './seed/profanity';
import {seedRecipes} from './seed/recipes';
import {seedRoles} from './seed/roles';
import {seedSacrifices} from './seed/sacrifices';
import {seedSkills} from './seed/skills';
import {seedSpells} from './seed/spells';
import {seedTitles} from './seed/titles';
import {seedWeapons} from './seed/weapons';
import {seedWorld} from './seed/world';

console.log("DATABASE_URL:", process.env.DATABASE_URL);

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({
  adapter,
  log: [
    { level: "query", emit: "event" },
    { level: "error", emit: "stdout" },
    { level: "warn", emit: "stdout" }
  ]
});

prisma.$on("query", (e) => {
  console.log(`\n🟦 Prisma Query: ${e.query}`)
  if (e.params !== "[]") console.log(`🟨 Params: ${e.params}`)
  console.log(`🕒 Duration: ${e.duration}ms\n`)
})

async function main() {
  console.log("Seeding database...");

  await seedAccounts(prisma);
  await seedPlayers(prisma);
  await seedRoles(prisma);

  await seedAvatars(prisma);
  await seedChatBots(prisma);
  await seedClasses(prisma);
  await seedProfanity(prisma);
  await seedSkills(prisma);
  await seedSpells(prisma);
  await seedTitles(prisma);

  await seedItems(prisma);
  await seedAlchemicalIngredients(prisma);
  await seedCookingIngredients(prisma);
  await seedEnchantingIngredients(prisma);
  await seedLeatherWorkingIngredients(prisma);
  await seedSmithingIngredients(prisma);
  await seedToolMakingIngredients(prisma);
  await seedWoodworkingIngredients(prisma);
  await seedArmor(prisma);
  await seedWeapons(prisma);

  await seedRecipes(prisma);
  await seedBlueprints(prisma);

  await seedAbilities(prisma);
  await seedMonsters(prisma);
  await seedPets(prisma);
  await seedEggs(prisma);
  await seedSacrifices(prisma);

  await seedHolidays(prisma);
  await seedMaps(prisma);
  await seedWorld(prisma);
}

main()
  .then(() => {
    console.log('Seeding complete');
    process.exit(0);
  })
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
