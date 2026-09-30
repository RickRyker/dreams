// server/prisma/seed/accounts.ts


import { PasswordService } from "@auth/PasswordService";
import { Account, PrismaClient } from '@prisma/client';

const HASHED_PASSWORD = await PasswordService.hashPassword('P@$$word');

export async function seedAccounts(prisma: PrismaClient): Promise<void> {

  const system: Account = await prisma.account.upsert({
    where: { email: 'system@dreams-of-nowhere.com' },
    update: {
      id: 'system',
    },
    create: {
      id: 'system',
      email: 'system@dreams-of-nowhere.com',
      passwordHash: HASHED_PASSWORD,
    }
  });
  console.log("Created account " + JSON.stringify(system));

  const admin: Account = await prisma.account.upsert({
    where: { email: 'admin@dreams-of-nowhere.com' },
    update: {
      id: 'admin',
    },
    create: {
      id: 'admin',
      email: 'admin@dreams-of-nowhere.com',
      passwordHash: HASHED_PASSWORD,
    }
  });
  console.log("Created account " + JSON.stringify(admin));

  const ryker: Account = await prisma.account.upsert({
    where: { email: 'rick.ryker@gmail.com' },
    update: {
      id: 'rick.ryker',
    },
    create: {
      id: 'rick.ryker',
      email: 'rick.ryker@gmail.com',
      passwordHash: HASHED_PASSWORD,
    }
  });
  console.log("Created account " + JSON.stringify(ryker));

  console.log('System, Admin, and first user accounts seeded.');
}
