// server/prisma/seed/sacrifices.ts

import {PrismaClient} from "@prisma/client";

export interface SacrificeSeed {
  slug: string;
  petLevel: number;
  petSlug1: string;
  petSlug2: string;
  petSlug3: string;
  eggSlug: string;
}

export async function seedSacrifices(prisma: PrismaClient): Promise<void> {

  for (const record of data) {
    const pet1 = await prisma.petType.findUnique({ where: { name: record.petSlug1 }});
    const pet2 = await prisma.petType.findUnique({ where: { name: record.petSlug2 }});
    const pet3 = await prisma.petType.findUnique({ where: { name: record.petSlug3 }});

    if (pet1 && pet2 && pet3) {
      const result = await prisma.petSacrifice.upsert({
        where: {slug: record.slug},
        update: {
          petLevel: record.petLevel,
          petType1: pet1.name,
          petType2: pet2.name,
          petType3: pet3.name,
          eggSlug: record.eggSlug,
        },
        create: {
          slug: record.slug,
          petType1: pet1.name,
          petType2: pet2.name,
          petType3: pet3.name,
          eggSlug: record.eggSlug,
        },
      });
      if (result) {
        console.log(`  ✅ [Pet Sacrifice] ${result.slug.padEnd(36)}`);
        // Sort in place and update
        const [petType1, petType2, petType3] = [result.petType1, result.petType2, result.petType3]
          .sort((x,y) => x.localeCompare(y, undefined, {sensitivity: 'base'}));
        result.petType1 = petType1;
        result.petType2 = petType2;
        result.petType3 = petType3;
        await prisma.petSacrifice.update({
          where: { id: result.id },
          data: { petType1, petType2, petType3: petType3 },
        });
      }
    }
  }
  console.log('Pet Sacrifices seeded.');
}

// ---------------------------------------------------------------------------
// SACRIFICE DATA
// ---------------------------------------------------------------------------
const data: SacrificeSeed[] = [

  { slug: 'bat-a1', petLevel: 10, petSlug1: 'Bat', petSlug2: 'Cat', petSlug3: 'Dog', eggSlug: 'bat-egg' },
  { slug: 'bat-a2', petLevel: 10, petSlug1: 'Bat', petSlug2: 'Bat', petSlug3: 'Cat', eggSlug: 'bat-egg' },
  { slug: 'bat-b1', petLevel: 10, petSlug1: 'Dog', petSlug2: 'Pig', petSlug3: 'Bat', eggSlug: 'bat-egg' },
  { slug: 'bat-b2', petLevel: 10, petSlug1: 'Rat', petSlug2: 'Bat', petSlug3: 'Cat', eggSlug: 'bat-egg' },
  { slug: 'bat-c1', petLevel: 10, petSlug1: 'Pig', petSlug2: 'Pig', petSlug3: 'Bat', eggSlug: 'bat-egg' },

  { slug: 'cat-a1', petLevel: 10, petSlug1: 'Cat', petSlug2: 'Dog', petSlug3: 'Pig', eggSlug: 'cat-egg' },
  { slug: 'cat-a2', petLevel: 10, petSlug1: 'Cat', petSlug2: 'Cat', petSlug3: 'Dog', eggSlug: 'cat-egg' },
  { slug: 'cat-b1', petLevel: 10, petSlug1: 'Rat', petSlug2: 'Bat', petSlug3: 'Cat', eggSlug: 'cat-egg' },
  { slug: 'cat-b2', petLevel: 10, petSlug1: 'Pig', petSlug2: 'Cat', petSlug3: 'Pig', eggSlug: 'cat-egg' },
  { slug: 'cat-c1', petLevel: 10, petSlug1: 'Dog', petSlug2: 'Dog', petSlug3: 'Cat', eggSlug: 'cat-egg' },

  { slug: 'dog-a1', petLevel: 10, petSlug1: 'Dog', petSlug2: 'Pig', petSlug3: 'Rat', eggSlug: 'dog-egg' },
  { slug: 'dog-a2', petLevel: 10, petSlug1: 'Dog', petSlug2: 'Dog', petSlug3: 'Pig', eggSlug: 'dog-egg' },
  { slug: 'dog-b1', petLevel: 10, petSlug1: 'Cat', petSlug2: 'Dog', petSlug3: 'Rat', eggSlug: 'dog-egg' },
  { slug: 'dog-b2', petLevel: 10, petSlug1: 'Bat', petSlug2: 'Dog', petSlug3: 'Pig', eggSlug: 'dog-egg' },
  { slug: 'dog-c1', petLevel: 10, petSlug1: 'Pig', petSlug2: 'Pig', petSlug3: 'Dog', eggSlug: 'dog-egg' },

  { slug: 'pig-a1', petLevel: 10, petSlug1: 'Pig', petSlug2: 'Rat', petSlug3: 'Bat', eggSlug: 'pig-egg' },
  { slug: 'pig-a2', petLevel: 10, petSlug1: 'Pig', petSlug2: 'Pig', petSlug3: 'Rat', eggSlug: 'pig-egg' },
  { slug: 'pig-b1', petLevel: 10, petSlug1: 'Dog', petSlug2: 'Pig', petSlug3: 'Cat', eggSlug: 'pig-egg' },
  { slug: 'pig-b2', petLevel: 10, petSlug1: 'Cat', petSlug2: 'Pig', petSlug3: 'Bat', eggSlug: 'pig-egg' },
  { slug: 'pig-c1', petLevel: 10, petSlug1: 'Rat', petSlug2: 'Rat', petSlug3: 'Pig', eggSlug: 'pig-egg' },

  { slug: 'rat-a1', petLevel: 10, petSlug1: 'Rat', petSlug2: 'Bat', petSlug3: 'Cat', eggSlug: 'rat-egg' },
  { slug: 'rat-a2', petLevel: 10, petSlug1: 'Rat', petSlug2: 'Rat', petSlug3: 'Bat', eggSlug: 'rat-egg' },
  { slug: 'rat-b1', petLevel: 10, petSlug1: 'Pig', petSlug2: 'Rat', petSlug3: 'Dog', eggSlug: 'rat-egg' },
  { slug: 'rat-b2', petLevel: 10, petSlug1: 'Dog', petSlug2: 'Rat', petSlug3: 'Cat', eggSlug: 'rat-egg' },
  { slug: 'rat-c1', petLevel: 10, petSlug1: 'Cat', petSlug2: 'Cat', petSlug3: 'Rat', eggSlug: 'rat-egg' },

  { slug: 'ember-a1', petLevel: 20, petSlug1: 'Bat', petSlug2: 'Bat', petSlug3: 'Pig', eggSlug: 'ember-egg' },
  { slug: 'ember-a2', petLevel: 20, petSlug1: 'Dog', petSlug2: 'Cat', petSlug3: 'Bat', eggSlug: 'ember-egg' },
  { slug: 'ember-b1', petLevel: 20, petSlug1: 'Pig', petSlug2: 'Pig', petSlug3: 'Dog', eggSlug: 'ember-egg' },
  { slug: 'ember-b2', petLevel: 20, petSlug1: 'Rat', petSlug2: 'Bat', petSlug3: 'Dog', eggSlug: 'ember-egg' },
  { slug: 'ember-c1', petLevel: 20, petSlug1: 'Cat', petSlug2: 'Cat', petSlug3: 'Pig', eggSlug: 'ember-egg' },
  { slug: 'ember-c2', petLevel: 20, petSlug1: 'Dog', petSlug2: 'Dog', petSlug3: 'Bat', eggSlug: 'ember-egg' },

  { slug: 'salamander-a1', petLevel: 20, petSlug1: 'Dog', petSlug2: 'Pig', petSlug3: 'Pig', eggSlug: 'salamander-egg' },
  { slug: 'salamander-a2', petLevel: 20, petSlug1: 'Pig', petSlug2: 'Rat', petSlug3: 'Dog', eggSlug: 'salamander-egg' },
  { slug: 'salamander-b1', petLevel: 20, petSlug1: 'Cat', petSlug2: 'Dog', petSlug3: 'Pig', eggSlug: 'salamander-egg' },
  { slug: 'salamander-b2', petLevel: 20, petSlug1: 'Dog', petSlug2: 'Dog', petSlug3: 'Rat', eggSlug: 'salamander-egg' },
  { slug: 'salamander-c1', petLevel: 20, petSlug1: 'Pig', petSlug2: 'Pig', petSlug3: 'Cat', eggSlug: 'salamander-egg' },
  { slug: 'salamander-c2', petLevel: 20, petSlug1: 'Rat', petSlug2: 'Rat', petSlug3: 'Dog', eggSlug: 'salamander-egg' },

  { slug: 'dewdrop-a1', petLevel: 20, petSlug1: 'Cat', petSlug2: 'Cat', petSlug3: 'Rat', eggSlug: 'dewdrop-egg' },
  { slug: 'dewdrop-a2', petLevel: 20, petSlug1: 'Pig', petSlug2: 'Dog', petSlug3: 'Cat', eggSlug: 'dewdrop-egg' },
  { slug: 'dewdrop-b1', petLevel: 20, petSlug1: 'Bat', petSlug2: 'Pig', petSlug3: 'Pig', eggSlug: 'dewdrop-egg' },
  { slug: 'dewdrop-b2', petLevel: 20, petSlug1: 'Dog', petSlug2: 'Rat', petSlug3: 'Cat', eggSlug: 'dewdrop-egg' },
  { slug: 'dewdrop-c1', petLevel: 20, petSlug1: 'Rat', petSlug2: 'Rat', petSlug3: 'Pig', eggSlug: 'dewdrop-egg' },
  { slug: 'dewdrop-c2', petLevel: 20, petSlug1: 'Cat', petSlug2: 'Dog', petSlug3: 'Dog', eggSlug: 'dewdrop-egg' },

  { slug: 'frog-a1', petLevel: 20, petSlug1: 'Pig', petSlug2: 'Pig', petSlug3: 'Rat', eggSlug: 'frog-egg' },
  { slug: 'frog-a2', petLevel: 20, petSlug1: 'Dog', petSlug2: 'Dog', petSlug3: 'Pig', eggSlug: 'frog-egg' },
  { slug: 'frog-b1', petLevel: 20, petSlug1: 'Cat', petSlug2: 'Pig', petSlug3: 'Rat', eggSlug: 'frog-egg' },
  { slug: 'frog-b2', petLevel: 20, petSlug1: 'Bat', petSlug2: 'Dog', petSlug3: 'Pig', eggSlug: 'frog-egg' },
  { slug: 'frog-c1', petLevel: 20, petSlug1: 'Rat', petSlug2: 'Cat', petSlug3: 'Cat', eggSlug: 'frog-egg' },
  { slug: 'frog-c2', petLevel: 20, petSlug1: 'Pig', petSlug2: 'Dog', petSlug3: 'Dog', eggSlug: 'frog-egg' },

  { slug: 'owl-a1', petLevel: 20, petSlug1: 'Bat', petSlug2: 'Cat', petSlug3: 'Rat', eggSlug: 'owl-egg' },
  { slug: 'owl-a2', petLevel: 20, petSlug1: 'Cat', petSlug2: 'Cat', petSlug3: 'Dog', eggSlug: 'owl-egg' },
  { slug: 'owl-b1', petLevel: 20, petSlug1: 'Dog', petSlug2: 'Pig', petSlug3: 'Cat', eggSlug: 'owl-egg' },
  { slug: 'owl-b2', petLevel: 20, petSlug1: 'Pig', petSlug2: 'Pig', petSlug3: 'Rat', eggSlug: 'owl-egg' },
  { slug: 'owl-c1', petLevel: 20, petSlug1: 'Rat', petSlug2: 'Dog', petSlug3: 'Dog', eggSlug: 'owl-egg' },
  { slug: 'owl-c2', petLevel: 20, petSlug1: 'Bat', petSlug2: 'Pig', petSlug3: 'Pig', eggSlug: 'owl-egg' },

  { slug: 'lion-a1', petLevel: 30, petSlug1: 'Ember', petSlug2: 'Cat', petSlug3: 'Dog', eggSlug: 'lion-egg' },
  { slug: 'lion-a2', petLevel: 30, petSlug1: 'Salamander', petSlug2: 'Pig', petSlug3: 'Pig', eggSlug: 'lion-egg' },
  { slug: 'lion-b1', petLevel: 30, petSlug1: 'Dewdrop', petSlug2: 'Dog', petSlug3: 'Rat', eggSlug: 'lion-egg' },
  { slug: 'lion-b2', petLevel: 30, petSlug1: 'Frog', petSlug2: 'Cat', petSlug3: 'Cat', eggSlug: 'lion-egg' },
  { slug: 'lion-c1', petLevel: 30, petSlug1: 'Owl', petSlug2: 'Pig', petSlug3: 'Dog', eggSlug: 'lion-egg' },
  { slug: 'lion-c2', petLevel: 30, petSlug1: 'Ember', petSlug2: 'Ember', petSlug3: 'Rat', eggSlug: 'lion-egg' },
  { slug: 'lion-d1', petLevel: 30, petSlug1: 'Salamander', petSlug2: 'Cat', petSlug3: 'Cat', eggSlug: 'lion-egg' },

  { slug: 'bear-a1', petLevel: 30, petSlug1: 'Salamander', petSlug2: 'Dog', petSlug3: 'Dog', eggSlug: 'bear-egg' },
  { slug: 'bear-a2', petLevel: 30, petSlug1: 'Ember', petSlug2: 'Pig', petSlug3: 'Rat', eggSlug: 'bear-egg' },
  { slug: 'bear-b1', petLevel: 30, petSlug1: 'Dewdrop', petSlug2: 'Cat', petSlug3: 'Pig', eggSlug: 'bear-egg' },
  { slug: 'bear-b2', petLevel: 30, petSlug1: 'Frog', petSlug2: 'Rat', petSlug3: 'Dog', eggSlug: 'bear-egg' },
  { slug: 'bear-c1', petLevel: 30, petSlug1: 'Owl', petSlug2: 'Dog', petSlug3: 'Dog', eggSlug: 'bear-egg' },
  { slug: 'bear-c2', petLevel: 30, petSlug1: 'Ember', petSlug2: 'Pig', petSlug3: 'Pig', eggSlug: 'bear-egg' },
  { slug: 'bear-d1', petLevel: 30, petSlug1: 'Salamander', petSlug2: 'Cat', petSlug3: 'Rat', eggSlug: 'bear-egg' },

  { slug: 'shark-a1', petLevel: 30, petSlug1: 'Dewdrop', petSlug2: 'Pig', petSlug3: 'Pig', eggSlug: 'shark-egg' },
  { slug: 'shark-a2', petLevel: 30, petSlug1: 'Frog', petSlug2: 'Dog', petSlug3: 'Dog', eggSlug: 'shark-egg' },
  { slug: 'shark-b1', petLevel: 30, petSlug1: 'Owl', petSlug2: 'Cat', petSlug3: 'Pig', eggSlug: 'shark-egg' },
  { slug: 'shark-b2', petLevel: 30, petSlug1: 'Ember', petSlug2: 'Rat', petSlug3: 'Rat', eggSlug: 'shark-egg' },
  { slug: 'shark-c1', petLevel: 30, petSlug1: 'Salamander', petSlug2: 'Dog', petSlug3: 'Cat', eggSlug: 'shark-egg' },
  { slug: 'shark-c2', petLevel: 30, petSlug1: 'Dewdrop', petSlug2: 'Dewdrop', petSlug3: 'Pig', eggSlug: 'shark-egg' },
  { slug: 'shark-d1', petLevel: 30, petSlug1: 'Frog', petSlug2: 'Cat', petSlug3: 'Rat', eggSlug: 'shark-egg' },

  { slug: 'tortoise-a1', petLevel: 30, petSlug1: 'Frog', petSlug2: 'Pig', petSlug3: 'Pig', eggSlug: 'tortoise-egg' },
  { slug: 'tortoise-a2', petLevel: 30, petSlug1: 'Owl', petSlug2: 'Dog', petSlug3: 'Rat', eggSlug: 'tortoise-egg' },
  { slug: 'tortoise-b1', petLevel: 30, petSlug1: 'Ember', petSlug2: 'Cat', petSlug3: 'Dog', eggSlug: 'tortoise-egg' },
  { slug: 'tortoise-b2', petLevel: 30, petSlug1: 'Salamander', petSlug2: 'Pig', petSlug3: 'Cat', eggSlug: 'tortoise-egg' },
  { slug: 'tortoise-c1', petLevel: 30, petSlug1: 'Dewdrop', petSlug2: 'Rat', petSlug3: 'Rat', eggSlug: 'tortoise-egg' },
  { slug: 'tortoise-c2', petLevel: 30, petSlug1: 'Frog', petSlug2: 'Dog', petSlug3: 'Dog', eggSlug: 'tortoise-egg' },
  { slug: 'tortoise-d1', petLevel: 30, petSlug1: 'Owl', petSlug2: 'Cat', petSlug3: 'Pig', eggSlug: 'tortoise-egg' },

  { slug: 'unicorn-a1', petLevel: 30, petSlug1: 'Owl', petSlug2: 'Cat', petSlug3: 'Cat', eggSlug: 'unicorn-egg' },
  { slug: 'unicorn-a2', petLevel: 30, petSlug1: 'Dewdrop', petSlug2: 'Dog', petSlug3: 'Pig', eggSlug: 'unicorn-egg' },
  { slug: 'unicorn-b1', petLevel: 30, petSlug1: 'Ember', petSlug2: 'Pig', petSlug3: 'Pig', eggSlug: 'unicorn-egg' },
  { slug: 'unicorn-b2', petLevel: 30, petSlug1: 'Salamander', petSlug2: 'Cat', petSlug3: 'Dog', eggSlug: 'unicorn-egg' },
  { slug: 'unicorn-c1', petLevel: 30, petSlug1: 'Frog', petSlug2: 'Rat', petSlug3: 'Rat', eggSlug: 'unicorn-egg' },
  { slug: 'unicorn-c2', petLevel: 30, petSlug1: 'Owl', petSlug2: 'Pig', petSlug3: 'Dog', eggSlug: 'unicorn-egg' },
  { slug: 'unicorn-d1', petLevel: 30, petSlug1: 'Dewdrop', petSlug2: 'Cat', petSlug3: 'Cat', eggSlug: 'unicorn-egg' },

  { slug: 'falcon-a1', petLevel: 40, petSlug1: 'Lion', petSlug2: 'Ember', petSlug3: 'Ember', eggSlug: 'falcon-egg' },
  { slug: 'falcon-a2', petLevel: 40, petSlug1: 'Bear', petSlug2: 'Dewdrop', petSlug3: 'Cat', eggSlug: 'falcon-egg' },
  { slug: 'falcon-b1', petLevel: 40, petSlug1: 'Shark', petSlug2: 'Frog', petSlug3: 'Pig', eggSlug: 'falcon-egg' },
  { slug: 'falcon-b2', petLevel: 40, petSlug1: 'Tortoise', petSlug2: 'Owl', petSlug3: 'Dog', eggSlug: 'falcon-egg' },
  { slug: 'falcon-c1', petLevel: 40, petSlug1: 'Unicorn', petSlug2: 'Salamander', petSlug3: 'Rat', eggSlug: 'falcon-egg' },
  { slug: 'falcon-c2', petLevel: 40, petSlug1: 'Lion', petSlug2: 'Lion', petSlug3: 'Dewdrop', eggSlug: 'falcon-egg' },
  { slug: 'falcon-d1', petLevel: 40, petSlug1: 'Bear', petSlug2: 'Ember', petSlug3: 'Owl', eggSlug: 'falcon-egg' },
  { slug: 'falcon-d2', petLevel: 40, petSlug1: 'Shark', petSlug2: 'Salamander', petSlug3: 'Cat', eggSlug: 'falcon-egg' },

  { slug: 'raven-a1', petLevel: 40, petSlug1: 'Bear', petSlug2: 'Dewdrop', petSlug3: 'Dewdrop', eggSlug: 'raven-egg' },
  { slug: 'raven-a2', petLevel: 40, petSlug1: 'Lion', petSlug2: 'Frog', petSlug3: 'Dog', eggSlug: 'raven-egg' },
  { slug: 'raven-b1', petLevel: 40, petSlug1: 'Shark', petSlug2: 'Owl', petSlug3: 'Pig', eggSlug: 'raven-egg' },
  { slug: 'raven-b2', petLevel: 40, petSlug1: 'Tortoise', petSlug2: 'Ember', petSlug3: 'Cat', eggSlug: 'raven-egg' },
  { slug: 'raven-c1', petLevel: 40, petSlug1: 'Unicorn', petSlug2: 'Salamander', petSlug3: 'Dog', eggSlug: 'raven-egg' },
  { slug: 'raven-c2', petLevel: 40, petSlug1: 'Bear', petSlug2: 'Bear', petSlug3: 'Frog', eggSlug: 'raven-egg' },
  { slug: 'raven-d1', petLevel: 40, petSlug1: 'Lion', petSlug2: 'Owl', petSlug3: 'Rat', eggSlug: 'raven-egg' },
  { slug: 'raven-d2', petLevel: 40, petSlug1: 'Shark', petSlug2: 'Dewdrop', petSlug3: 'Cat', eggSlug: 'raven-egg' },

  { slug: 'ghost-a1', petLevel: 40, petSlug1: 'Shark', petSlug2: 'Ember', petSlug3: 'Ember', eggSlug: 'ghost-egg' },
  { slug: 'ghost-a2', petLevel: 40, petSlug1: 'Tortoise', petSlug2: 'Dewdrop', petSlug3: 'Pig', eggSlug: 'ghost-egg' },
  { slug: 'ghost-b1', petLevel: 40, petSlug1: 'Unicorn', petSlug2: 'Frog', petSlug3: 'Dog', eggSlug: 'ghost-egg' },
  { slug: 'ghost-b2', petLevel: 40, petSlug1: 'Lion', petSlug2: 'Owl', petSlug3: 'Cat', eggSlug: 'ghost-egg' },
  { slug: 'ghost-c1', petLevel: 40, petSlug1: 'Bear', petSlug2: 'Salamander', petSlug3: 'Rat', eggSlug: 'ghost-egg' },
  { slug: 'ghost-c2', petLevel: 40, petSlug1: 'Shark', petSlug2: 'Shark', petSlug3: 'Frog', eggSlug: 'ghost-egg' },
  { slug: 'ghost-d1', petLevel: 40, petSlug1: 'Tortoise', petSlug2: 'Ember', petSlug3: 'Dog', eggSlug: 'ghost-egg' },
  { slug: 'ghost-d2', petLevel: 40, petSlug1: 'Unicorn', petSlug2: 'Dewdrop', petSlug3: 'Cat', eggSlug: 'ghost-egg' },

  { slug: 'wisp-a1', petLevel: 40, petSlug1: 'Unicorn', petSlug2: 'Ember', petSlug3: 'Ember', eggSlug: 'wisp-egg' },
  { slug: 'wisp-a2', petLevel: 40, petSlug1: 'Lion', petSlug2: 'Dewdrop', petSlug3: 'Pig', eggSlug: 'wisp-egg' },
  { slug: 'wisp-b1', petLevel: 40, petSlug1: 'Bear', petSlug2: 'Frog', petSlug3: 'Dog', eggSlug: 'wisp-egg' },
  { slug: 'wisp-b2', petLevel: 40, petSlug1: 'Shark', petSlug2: 'Owl', petSlug3: 'Cat', eggSlug: 'wisp-egg' },
  { slug: 'wisp-c1', petLevel: 40, petSlug1: 'Tortoise', petSlug2: 'Salamander', petSlug3: 'Rat', eggSlug: 'wisp-egg' },
  { slug: 'wisp-c2', petLevel: 40, petSlug1: 'Unicorn', petSlug2: 'Frog', petSlug3: 'Frog', eggSlug: 'wisp-egg' },
  { slug: 'wisp-d1', petLevel: 40, petSlug1: 'Lion', petSlug2: 'Ember', petSlug3: 'Dog', eggSlug: 'wisp-egg' },
  { slug: 'wisp-d2', petLevel: 40, petSlug1: 'Bear', petSlug2: 'Dewdrop', petSlug3: 'Cat', eggSlug: 'wisp-egg' },

  { slug: 'horse-a1', petLevel: 50, petSlug1: 'Lion', petSlug2: 'Ember', petSlug3: 'Cat', eggSlug: 'horse-egg' },
  { slug: 'horse-a2', petLevel: 50, petSlug1: 'Bear', petSlug2: 'Dewdrop', petSlug3: 'Dog', eggSlug: 'horse-egg' },
  { slug: 'horse-b1', petLevel: 50, petSlug1: 'Shark', petSlug2: 'Frog', petSlug3: 'Pig', eggSlug: 'horse-egg' },
  { slug: 'horse-b2', petLevel: 50, petSlug1: 'Tortoise', petSlug2: 'Owl', petSlug3: 'Rat', eggSlug: 'horse-egg' },
  { slug: 'horse-c1', petLevel: 50, petSlug1: 'Unicorn', petSlug2: 'Salamander', petSlug3: 'Cat', eggSlug: 'horse-egg' },
  { slug: 'horse-c2', petLevel: 50, petSlug1: 'Lion', petSlug2: 'Lion', petSlug3: 'Pig', eggSlug: 'horse-egg' },
  { slug: 'horse-d1', petLevel: 50, petSlug1: 'Bear', petSlug2: 'Ember', petSlug3: 'Dog', eggSlug: 'horse-egg' },
  { slug: 'horse-d2', petLevel: 50, petSlug1: 'Shark', petSlug2: 'Dewdrop', petSlug3: 'Cat', eggSlug: 'horse-egg' },

  { slug: 'donkey-a1', petLevel: 50, petSlug1: 'Bear', petSlug2: 'Salamander', petSlug3: 'Pig', eggSlug: 'donkey-egg' },
  { slug: 'donkey-a2', petLevel: 50, petSlug1: 'Lion', petSlug2: 'Ember', petSlug3: 'Dog', eggSlug: 'donkey-egg' },
  { slug: 'donkey-b1', petLevel: 50, petSlug1: 'Shark', petSlug2: 'Dewdrop', petSlug3: 'Rat', eggSlug: 'donkey-egg' },
  { slug: 'donkey-b2', petLevel: 50, petSlug1: 'Tortoise', petSlug2: 'Frog', petSlug3: 'Cat', eggSlug: 'donkey-egg' },
  { slug: 'donkey-c1', petLevel: 50, petSlug1: 'Unicorn', petSlug2: 'Owl', petSlug3: 'Pig', eggSlug: 'donkey-egg' },
  { slug: 'donkey-c2', petLevel: 50, petSlug1: 'Bear', petSlug2: 'Bear', petSlug3: 'Dog', eggSlug: 'donkey-egg' },
  { slug: 'donkey-d1', petLevel: 50, petSlug1: 'Lion', petSlug2: 'Salamander', petSlug3: 'Cat', eggSlug: 'donkey-egg' },
  { slug: 'donkey-d2', petLevel: 50, petSlug1: 'Shark', petSlug2: 'Ember', petSlug3: 'Pig', eggSlug: 'donkey-egg' },

  { slug: 'ox-a1', petLevel: 50, petSlug1: 'Donkey', petSlug2: 'Bear', petSlug3: 'Pig', eggSlug: 'ox-egg' },
  { slug: 'ox-a2', petLevel: 50, petSlug1: 'Donkey', petSlug2: 'Bear', petSlug3: 'Bear', eggSlug: 'ox-egg' },
  { slug: 'ox-b1', petLevel: 50, petSlug1: 'Donkey', petSlug2: 'Lion', petSlug3: 'Pig', eggSlug: 'ox-egg' },
  { slug: 'ox-b2', petLevel: 50, petSlug1: 'Donkey', petSlug2: 'Shark', petSlug3: 'Pig', eggSlug: 'ox-egg' },
  { slug: 'ox-c1', petLevel: 50, petSlug1: 'Donkey', petSlug2: 'Tortoise', petSlug3: 'Pig', eggSlug: 'ox-egg' },
  { slug: 'ox-c2', petLevel: 50, petSlug1: 'Donkey', petSlug2: 'Unicorn', petSlug3: 'Pig', eggSlug: 'ox-egg' },
  { slug: 'ox-d1', petLevel: 50, petSlug1: 'Donkey', petSlug2: 'Bear', petSlug3: 'Rat', eggSlug: 'ox-egg' },
  { slug: 'ox-d2', petLevel: 50, petSlug1: 'Donkey', petSlug2: 'Bear', petSlug3: 'Dog', eggSlug: 'ox-egg' },

  { slug: 'zebra-a1', petLevel: 50, petSlug1: 'Horse', petSlug2: 'Donkey', petSlug3: 'Cat', eggSlug: 'zebra-egg' },
  { slug: 'zebra-a2', petLevel: 50, petSlug1: 'Horse', petSlug2: 'Donkey', petSlug3: 'Dog', eggSlug: 'zebra-egg' },
  { slug: 'zebra-b1', petLevel: 50, petSlug1: 'Horse', petSlug2: 'Donkey', petSlug3: 'Pig', eggSlug: 'zebra-egg' },
  { slug: 'zebra-b2', petLevel: 50, petSlug1: 'Horse', petSlug2: 'Donkey', petSlug3: 'Rat', eggSlug: 'zebra-egg' },
  { slug: 'zebra-c1', petLevel: 50, petSlug1: 'Horse', petSlug2: 'Donkey', petSlug3: 'Cat', eggSlug: 'zebra-egg' },
  { slug: 'zebra-c2', petLevel: 50, petSlug1: 'Horse', petSlug2: 'Donkey', petSlug3: 'Dog', eggSlug: 'zebra-egg' },
  { slug: 'zebra-d1', petLevel: 50, petSlug1: 'Horse', petSlug2: 'Donkey', petSlug3: 'Pig', eggSlug: 'zebra-egg' },
  { slug: 'zebra-d2', petLevel: 50, petSlug1: 'Horse', petSlug2: 'Donkey', petSlug3: 'Rat', eggSlug: 'zebra-egg' },

  { slug: 'hippogriff-a1', petLevel: 50, petSlug1: 'Horse', petSlug2: 'Lion', petSlug3: 'Falcon', eggSlug: 'hippogriff-egg' },
  { slug: 'hippogriff-a2', petLevel: 50, petSlug1: 'Horse', petSlug2: 'Bear', petSlug3: 'Falcon', eggSlug: 'hippogriff-egg' },
  { slug: 'hippogriff-b1', petLevel: 50, petSlug1: 'Horse', petSlug2: 'Lion', petSlug3: 'Raven', eggSlug: 'hippogriff-egg' },
  { slug: 'hippogriff-b2', petLevel: 50, petSlug1: 'Horse', petSlug2: 'Bear', petSlug3: 'Raven', eggSlug: 'hippogriff-egg' },
  { slug: 'hippogriff-c1', petLevel: 50, petSlug1: 'Horse', petSlug2: 'Lion', petSlug3: 'Ghost', eggSlug: 'hippogriff-egg' },
  { slug: 'hippogriff-c2', petLevel: 50, petSlug1: 'Horse', petSlug2: 'Bear', petSlug3: 'Ghost', eggSlug: 'hippogriff-egg' },
  { slug: 'hippogriff-d1', petLevel: 50, petSlug1: 'Horse', petSlug2: 'Lion', petSlug3: 'Wisp', eggSlug: 'hippogriff-egg' },
  { slug: 'hippogriff-d2', petLevel: 50, petSlug1: 'Horse', petSlug2: 'Bear', petSlug3: 'Wisp', eggSlug: 'hippogriff-egg' },

  { slug: 'dragon-a1', petLevel: 60, petSlug1: 'Hippogriff', petSlug2: 'Unicorn', petSlug3: 'Ember', eggSlug: 'dragon-egg' },
  { slug: 'dragon-a2', petLevel: 60, petSlug1: 'Hippogriff', petSlug2: 'Lion', petSlug3: 'Salamander', eggSlug: 'dragon-egg' },
  { slug: 'dragon-b1', petLevel: 60, petSlug1: 'Hippogriff', petSlug2: 'Bear', petSlug3: 'Dewdrop', eggSlug: 'dragon-egg' },
  { slug: 'dragon-b2', petLevel: 60, petSlug1: 'Hippogriff', petSlug2: 'Shark', petSlug3: 'Frog', eggSlug: 'dragon-egg' },
  { slug: 'dragon-c1', petLevel: 60, petSlug1: 'Hippogriff', petSlug2: 'Tortoise', petSlug3: 'Owl', eggSlug: 'dragon-egg' },
  { slug: 'dragon-c2', petLevel: 60, petSlug1: 'Hippogriff', petSlug2: 'Unicorn', petSlug3: 'Salamander', eggSlug: 'dragon-egg' },
  { slug: 'dragon-d1', petLevel: 60, petSlug1: 'Hippogriff', petSlug2: 'Lion', petSlug3: 'Dewdrop', eggSlug: 'dragon-egg' },
  { slug: 'dragon-d2', petLevel: 60, petSlug1: 'Hippogriff', petSlug2: 'Bear', petSlug3: 'Ember', eggSlug: 'dragon-egg' },
  { slug: 'dragon-e1', petLevel: 60, petSlug1: 'Hippogriff', petSlug2: 'Shark', petSlug3: 'Owl', eggSlug: 'dragon-egg' },
  { slug: 'dragon-e2', petLevel: 60, petSlug1: 'Hippogriff', petSlug2: 'Tortoise', petSlug3: 'Frog', eggSlug: 'dragon-egg' },

  // Tier 1 – Mole, Hedgehog, Goat (built from Tier 1 basics)
  { slug: 'mole-a1', petLevel: 10, petSlug1: 'Rat', petSlug2: 'Pig', petSlug3: 'Pig', eggSlug: 'mole-egg' },
  { slug: 'mole-a2', petLevel: 10, petSlug1: 'Rat', petSlug2: 'Rat', petSlug3: 'Dog', eggSlug: 'mole-egg' },

  { slug: 'hedgehog-a1', petLevel: 10, petSlug1: 'Cat', petSlug2: 'Rat', petSlug3: 'Rat', eggSlug: 'hedgehog-egg' },
  { slug: 'hedgehog-a2', petLevel: 10, petSlug1: 'Cat', petSlug2: 'Cat', petSlug3: 'Pig', eggSlug: 'hedgehog-egg' },

  { slug: 'goat-a1', petLevel: 10, petSlug1: 'Pig', petSlug2: 'Dog', petSlug3: 'Dog', eggSlug: 'goat-egg' },
  { slug: 'goat-a2', petLevel: 10, petSlug1: 'Pig', petSlug2: 'Pig', petSlug3: 'Rat', eggSlug: 'goat-egg' },

  // Tier 2 – Mudling, Bramble Sprite, Sparkling Gecko (built from Tier 1)
  { slug: 'mudling-a1', petLevel: 20, petSlug1: 'Mole', petSlug2: 'Pig', petSlug3: 'Rat', eggSlug: 'mudling-egg' },
  { slug: 'mudling-a2', petLevel: 20, petSlug1: 'Mole', petSlug2: 'Mole', petSlug3: 'Pig', eggSlug: 'mudling-egg' },

  { slug: 'bramble-sprite-a1', petLevel: 20, petSlug1: 'Hedgehog', petSlug2: 'Cat', petSlug3: 'Rat', eggSlug: 'bramble-sprite-egg' },
  { slug: 'bramble-sprite-a2', petLevel: 20, petSlug1: 'Hedgehog', petSlug2: 'Hedgehog', petSlug3: 'Pig', eggSlug: 'bramble-sprite-egg' },

  { slug: 'sparkling-gecko-a1', petLevel: 20, petSlug1: 'Lizard', petSlug2: 'Bat', petSlug3: 'Dog', eggSlug: 'sparkling-gecko-egg' },
  { slug: 'sparkling-gecko-a2', petLevel: 20, petSlug1: 'Lizard', petSlug2: 'Lizard', petSlug3: 'Rat', eggSlug: 'sparkling-gecko-egg' },

  // Tier 3 – Dire Wolf, Basilisk, Mireback (Tier 2 + Tier 1)
  { slug: 'dire-wolf-a1', petLevel: 30, petSlug1: 'Dog', petSlug2: 'Ember', petSlug3: 'Salamander', eggSlug: 'dire-wolf-egg' },
  { slug: 'dire-wolf-a2', petLevel: 30, petSlug1: 'Dog', petSlug2: 'Dog', petSlug3: 'Ember', eggSlug: 'dire-wolf-egg' },

  { slug: 'basilisk-a1', petLevel: 30, petSlug1: 'Sparkling Gecko', petSlug2: 'Frog', petSlug3: 'Owl', eggSlug: 'basilisk-egg' },
  { slug: 'basilisk-a2', petLevel: 30, petSlug1: 'Sparkling Gecko', petSlug2: 'Sparkling Gecko', petSlug3: 'Rat', eggSlug: 'basilisk-egg' },

  { slug: 'mireback-a1', petLevel: 30, petSlug1: 'Mudling', petSlug2: 'Frog', petSlug3: 'Tortoise', eggSlug: 'mireback-egg' },
  { slug: 'mireback-a2', petLevel: 30, petSlug1: 'Mudling', petSlug2: 'Mudling', petSlug3: 'Pig', eggSlug: 'mireback-egg' },

  // Tier 4 – Stormwing, Shade Owl, Gale Drake (Tier 3 + Tier 2)
  { slug: 'stormwing-a1', petLevel: 40, petSlug1: 'Sparkling Gecko', petSlug2: 'Lion', petSlug3: 'Ember', eggSlug: 'stormwing-egg' },
  { slug: 'stormwing-a2', petLevel: 40, petSlug1: 'Sparkling Gecko', petSlug2: 'Dire Wolf', petSlug3: 'Salamander', eggSlug: 'stormwing-egg' },

  { slug: 'shade-owl-a1', petLevel: 40, petSlug1: 'Owl', petSlug2: 'Ghost', petSlug3: 'Bear', eggSlug: 'shade-owl-egg' },
  { slug: 'shade-owl-a2', petLevel: 40, petSlug1: 'Owl', petSlug2: 'Owl', petSlug3: 'Lion', eggSlug: 'shade-owl-egg' },

  { slug: 'gale-drake-a1', petLevel: 40, petSlug1: 'Sparkling Gecko', petSlug2: 'Falcon', petSlug3: 'Raven', eggSlug: 'gale-drake-egg' },
  { slug: 'gale-drake-a2', petLevel: 40, petSlug1: 'Sparkling Gecko', petSlug2: 'Stormwing', petSlug3: 'Wisp', eggSlug: 'gale-drake-egg' },

  // Tier 5 – Chimera, Thunderhoof, Drakehorse, Nightmare, Mammoth, Griffin (Tier 3 + Tier 2 + Tier 1)
  { slug: 'chimera-a1', petLevel: 50, petSlug1: 'Lion', petSlug2: 'Goat', petSlug3: 'Basilisk', eggSlug: 'chimera-egg' },
  { slug: 'chimera-a2', petLevel: 50, petSlug1: 'Lion', petSlug2: 'Goat', petSlug3: 'Sparkling Gecko', eggSlug: 'chimera-egg' },

  { slug: 'thunderhoof-a1', petLevel: 50, petSlug1: 'Goat', petSlug2: 'Sparkling Gecko', petSlug3: 'Stormwing', eggSlug: 'thunderhoof-egg' },
  { slug: 'thunderhoof-a2', petLevel: 50, petSlug1: 'Goat', petSlug2: 'Dire Wolf', petSlug3: 'Ember', eggSlug: 'thunderhoof-egg' },

  { slug: 'drakehorse-a1', petLevel: 50, petSlug1: 'Horse', petSlug2: 'Gale Drake', petSlug3: 'Sparkling Gecko', eggSlug: 'drakehorse-egg' },
  { slug: 'drakehorse-a2', petLevel: 50, petSlug1: 'Horse', petSlug2: 'Stormwing', petSlug3: 'Ember', eggSlug: 'drakehorse-egg' },

  { slug: 'nightmare-a1', petLevel: 50, petSlug1: 'Horse', petSlug2: 'Shade Owl', petSlug3: 'Ghost', eggSlug: 'nightmare-egg' },
  { slug: 'nightmare-a2', petLevel: 50, petSlug1: 'Dire Wolf', petSlug2: 'Shade Owl', petSlug3: 'Wisp', eggSlug: 'nightmare-egg' },

  { slug: 'mammoth-a1', petLevel: 50, petSlug1: 'Ox', petSlug2: 'Mireback', petSlug3: 'Mudling', eggSlug: 'mammoth-egg' },
  { slug: 'mammoth-a2', petLevel: 50, petSlug1: 'Ox', petSlug2: 'Bear', petSlug3: 'Mudling', eggSlug: 'mammoth-egg' },

  { slug: 'griffin-a1', petLevel: 50, petSlug1: 'Hippogriff', petSlug2: 'Gale Drake', petSlug3: 'Stormwing', eggSlug: 'griffin-egg' },
  { slug: 'griffin-a2', petLevel: 50, petSlug1: 'Hippogriff', petSlug2: 'Falcon', petSlug3: 'Raven', eggSlug: 'griffin-egg' },

  // Tier 6 – Leviathan, Behemoth, Archgriffin, Ifrit (Tier 5 + Tier 3 + Tier 2)
  { slug: 'leviathan-a1', petLevel: 60, petSlug1: 'Mammoth', petSlug2: 'Basilisk', petSlug3: 'Dewdrop', eggSlug: 'leviathan-egg' },
  { slug: 'leviathan-a2', petLevel: 60, petSlug1: 'Mammoth', petSlug2: 'Shark', petSlug3: 'Frog', eggSlug: 'leviathan-egg' },

  { slug: 'behemoth-a1', petLevel: 60, petSlug1: 'Thunderhoof', petSlug2: 'Mammoth', petSlug3: 'Mudling', eggSlug: 'behemoth-egg' },
  { slug: 'behemoth-a2', petLevel: 60, petSlug1: 'Thunderhoof', petSlug2: 'Ox', petSlug3: 'Mireback', eggSlug: 'behemoth-egg' },

  { slug: 'archgriffin-a1', petLevel: 60, petSlug1: 'Griffin', petSlug2: 'Stormwing', petSlug3: 'Gale Drake', eggSlug: 'archgriffin-egg' },
  { slug: 'archgriffin-a2', petLevel: 60, petSlug1: 'Griffin', petSlug2: 'Falcon', petSlug3: 'Wisp', eggSlug: 'archgriffin-egg' },

  { slug: 'ifrit-a1', petLevel: 60, petSlug1: 'Nightmare', petSlug2: 'Chimera', petSlug3: 'Ember', eggSlug: 'ifrit-egg' },
  { slug: 'ifrit-a2', petLevel: 60, petSlug1: 'Nightmare', petSlug2: 'Drakehorse', petSlug3: 'Salamander', eggSlug: 'ifrit-egg' },

];
