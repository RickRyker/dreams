// server/src/accounts/repositories/AccountRepository.ts

import { prisma } from "../../db/client";
import { Account, Prisma } from "@prisma/client";

export class AccountRepository {
  async findById(id: string): Promise<Account | null> {
    return prisma.account.findUnique({ where: { id } });
  }

  async findByEmail(email: string): Promise<Account | null> {
    return prisma.account.findUnique({ where: { email } });
  }

  async createAccount(email: string, passwordHash: string): Promise<Account> {
    return prisma.account.create({
      data: { email, passwordHash },
    });
  }

  async update(id: string, data: Prisma.AccountUpdateInput): Promise<Account> {
    return prisma.account.update({
      where: { id },
      data,
    });
  }
}
