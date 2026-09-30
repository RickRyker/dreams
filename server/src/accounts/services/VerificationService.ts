// server/src/accounts/services/VerificationService.ts

import { prisma } from "../../db/client";
import { EmailService } from "@email/EmailService";
import crypto from "crypto";
import type { VerificationTokenCommand } from "../domain/AccountDomain";

export class VerificationService {
  constructor(private readonly email: EmailService) {}

  async createVerificationToken(command: VerificationTokenCommand): Promise<void>;
  async createVerificationToken(accountId: string, email: string): Promise<void>;
  async createVerificationToken(
    command: VerificationTokenCommand | string,
    email?: string
  ): Promise<void> {
    const payload = typeof command === "string"
      ? { accountId: command, email: email ?? "" }
      : command;
    const token = crypto.randomUUID();

    await prisma.verificationToken.create({
      data: {
        token,
        accountId: payload.accountId,
        email: payload.email,
        expiresAt: new Date(Date.now() + 1000 * 60 * 30), // 30 minutes
      },
    });

    await this.email.sendVerificationEmail(payload.email, token);
  }

  async verifyEmail(token: string): Promise<void> {
    const record = await prisma.verificationToken.findUnique({ where: { token } });
    if (!record) throw new Error("INVALID_TOKEN");

    await prisma.account.update({
      where: { id: record.accountId },
      data: { emailVerifiedAt: new Date() },
    });

    await prisma.verificationToken.delete({ where: { token } });
  }
}
