// server/src/accounts/mappers/AccountMapper.ts

import { Account, Prisma } from "@prisma/client";
import type { AccountDomain } from "../domain/AccountDomain";

type AccountUpdateLike = {
  email?: string;
  emailVerifiedAt?: number | null;
};

export class AccountMapper {
  static fromPrisma(model: Account): AccountDomain {
    return {
      id: model.id,
      email: model.email,
      emailVerified: model.emailVerifiedAt != null,
      emailVerifiedAt: model.emailVerifiedAt ? model.emailVerifiedAt.getTime() : null,
      createdAt: model.createdAt.getTime(),
      updatedAt: model.updatedAt.getTime(),
    };
  }

  static toPrisma(update: AccountUpdateLike): Prisma.AccountUpdateInput {
    const data: Prisma.AccountUpdateInput = {};

    if (update.email !== undefined) data.email = update.email;
    if (update.emailVerifiedAt !== undefined) {
      data.emailVerifiedAt = update.emailVerifiedAt
        ? new Date(update.emailVerifiedAt)
        : null;
    }

    return data;
  }
}
