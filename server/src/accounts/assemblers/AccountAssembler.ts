// server/src/accounts/assemblers/AccountAssembler.ts

import type { AccountDto, LoginRequestDto, RegisterRequestDto, RequestPasswordResetDto, PerformPasswordResetDto, VerifyEmailRequestDto } from "shared";
import type {
  AccountCredentialsCommand,
  AccountDomain,
  AccountLoginResultDomain,
  PasswordResetExecutionCommand,
  PasswordResetRequestCommand,
  VerificationTokenCommand,
} from "../domain/AccountDomain";

export class AccountAssembler {
  static toCredentials(dto: RegisterRequestDto | LoginRequestDto): AccountCredentialsCommand {
    return {
      email: dto.email,
      password: dto.password,
    };
  }

  static toAccountDto(account: AccountDomain): AccountDto {
    return account;
  }

  static toLoginResponse(result: AccountLoginResultDomain) {
    return {
      account: this.toAccountDto(result.account),
      token: result.token,
    };
  }

  static toVerificationCommand(accountId: string, email: string): VerificationTokenCommand {
    return { accountId, email };
  }

  static toPasswordResetRequest(dto: RequestPasswordResetDto): PasswordResetRequestCommand {
    return { email: dto.email };
  }

  static toPasswordResetExecution(dto: PerformPasswordResetDto): PasswordResetExecutionCommand {
    return {
      token: dto.token,
      newPassword: dto.newPassword,
    };
  }

  static toVerifyEmailPayload(dto: VerifyEmailRequestDto): VerifyEmailRequestDto {
    return dto;
  }
}
