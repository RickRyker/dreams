// server/src/auth/PasswordService.ts

import bcrypt from "bcryptjs";

export class PasswordService {
  private static readonly SALT_ROUNDS = 12;

  static async hashPassword(plain: string): Promise<string> {
    return bcrypt.hash(plain, PasswordService.SALT_ROUNDS);
  }

  static async verifyPassword(plain: string, hash: string): Promise<boolean> {
    return bcrypt.compare(plain, hash);
  }
}
