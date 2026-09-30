// server/src/players/services/PasswordResetService.ts

import { prisma } from "../../db/client";
import { EmailService } from "@email/EmailService";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import {PasswordService} from "@auth/PasswordService";
import type { PasswordResetExecutionCommand, PasswordResetRequestCommand } from "../../accounts/domain/AccountDomain";

export class PasswordResetService {
  constructor(private readonly email: EmailService) {}

  async requestReset(command: PasswordResetRequestCommand): Promise<void> {
    const account = await prisma.account.findUnique({ where: { email: command.email } });
    if (!account) return;

    const token = crypto.randomUUID();

    await prisma.passwordResetToken.create({
      data: {
        token,
        accountId: account.id,
        expiresAt: new Date(Date.now() + 1000 * 60 * 30), // 30 minutes
      },
    });

    await this.email.sendPasswordResetEmail(command.email, token);
  }

  async performReset(command: PasswordResetExecutionCommand): Promise<void> {
    const record = await prisma.passwordResetToken.findUnique({ where: { token: command.token } });
    if (!record) throw new Error("INVALID_TOKEN");

    const passwordHash: string = await PasswordService.hashPassword(command.newPassword);

    await prisma.account.update({
      where: { id: record.accountId },
      data: { passwordHash },
    });

    await prisma.passwordResetToken.delete({ where: { token: command.token } });
  }
}
