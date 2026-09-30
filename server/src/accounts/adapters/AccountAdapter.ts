// server/src/accounts/adapters/AccountAdapter.ts

import { AccountRepository } from "../repositories/AccountRepository";
import { AccountMapper } from "../mappers/AccountMapper";
import { Prisma } from "@prisma/client";

type AccountDtoLike = ReturnType<typeof AccountMapper.fromPrisma>;

type AccountUpdateLike = {
  email?: string;
  emailVerifiedAt?: number | null;
};

export class AccountAdapter {
  constructor(private readonly accounts: AccountRepository) {}

  async findById(id: string): Promise<AccountDtoLike | null> {
    const model = await this.accounts.findById(id);
    return model ? AccountMapper.fromPrisma(model) : null;
  }

  async findByEmail(email: string): Promise<AccountDtoLike | null> {
    const model = await this.accounts.findByEmail(email);
    return model ? AccountMapper.fromPrisma(model) : null;
  }

  async update(id: string, update: AccountUpdateLike): Promise<AccountDtoLike> {
    const prismaUpdate: Prisma.AccountUpdateInput = AccountMapper.toPrisma(update);
    const model = await this.accounts.update(id, prismaUpdate);
    return AccountMapper.fromPrisma(model);
  }
}
