// server/src/accounts/domain/AccountDomain.ts

export interface AccountDomain {
  id: string;
  email: string;
  emailVerified: boolean;
  emailVerifiedAt: number | null;
  createdAt: number;
  updatedAt: number;
}

export interface AccountCredentialsCommand {
  email: string;
  password: string;
}

export interface AccountLoginResultDomain {
  account: AccountDomain;
  token: string;
}

export interface VerificationTokenCommand {
  accountId: string;
  email: string;
}

export interface PasswordResetRequestCommand {
  email: string;
}

export interface PasswordResetExecutionCommand {
  token: string;
  newPassword: string;
}
