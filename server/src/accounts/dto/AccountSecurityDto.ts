// server/src/accounts/dto/AccountSecurityDto.ts


export interface AccountSecurityDto {
  mfaEnabled: boolean;
  lastLoginAt: string | null;
  suspiciousLogin: boolean;
}
