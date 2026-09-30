// server/src/accounts/services/AccountService.ts

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { AccountRepository } from "../repositories/AccountRepository";
import { AccountMapper } from "../mappers/AccountMapper";
import type { AccountCredentialsCommand, AccountDomain, AccountLoginResultDomain } from "../domain/AccountDomain";
import { AppError } from "../../errors/AppError";

const JWT_SECRET = process.env.JWT_SECRET || "dev-secret";

export class AccountService {
  constructor(private readonly accounts: AccountRepository) {}

  async register(input: AccountCredentialsCommand): Promise<AccountDomain>;
  async register(email: string, password: string): Promise<AccountDomain>;
  async register(
    input: AccountCredentialsCommand | string,
    password?: string
  ): Promise<AccountDomain> {
    const credentials = typeof input === "string"
      ? { email: input, password: password ?? "" }
      : input;
    const existing = await this.accounts.findByEmail(credentials.email);
    if (existing) throw new AppError("EMAIL_ALREADY_IN_USE", 409);

    const passwordHash = await bcrypt.hash(credentials.password, 12);
    const created = await this.accounts.createAccount(credentials.email, passwordHash);

    return AccountMapper.fromPrisma(created);
  }

  async login(input: AccountCredentialsCommand): Promise<AccountLoginResultDomain>;
  async login(email: string, password: string): Promise<AccountLoginResultDomain>;
  async login(
    input: AccountCredentialsCommand | string,
    password?: string
  ): Promise<AccountLoginResultDomain> {
    const credentials = typeof input === "string"
      ? { email: input, password: password ?? "" }
      : input;

    const account = await this.accounts.findByEmail(credentials.email);
    if (!account) throw new AppError("INVALID_CREDENTIALS", 401);

    const ok = await bcrypt.compare(credentials.password, account.passwordHash);
    if (!ok) throw new AppError("INVALID_CREDENTIALS", 401);

    const token = jwt.sign({ id: account.id }, JWT_SECRET, { expiresIn: "7d" });

    return {
      account: AccountMapper.fromPrisma(account),
      token,
    };
  }

  async getAccount(id: string): Promise<AccountDomain | null> {
    const model = await this.accounts.findById(id);
    return model ? AccountMapper.fromPrisma(model) : null;
  }

}
