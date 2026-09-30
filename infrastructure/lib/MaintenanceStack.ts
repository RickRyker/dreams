// infrastructure/lib/MaintenanceStack.ts

import { Stack, Duration } from "aws-cdk-lib";
import type { StackProps } from "aws-cdk-lib";
import type { Construct } from "constructs";
import { makeScheduledLambda } from "./utils/makeScheduledLambda";

export class MaintenanceStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    // Expired refresh tokens (e.g. hourly)
    makeScheduledLambda(
      this,
      "CleanupExpiredRefreshTokens",
      "maintenance/cleanupExpiredRefreshTokens.ts",
      Duration.hours(1),
    );

    // Expired email change tokens
    makeScheduledLambda(
      this,
      "CleanupExpiredEmailChangeTokens",
      "maintenance/cleanupExpiredEmailChangeTokens.ts",
      Duration.hours(1),
    );

    // Expired password reset tokens
    makeScheduledLambda(
      this,
      "CleanupExpiredPasswordResetTokens",
      "maintenance/cleanupExpiredPasswordResetTokens.ts",
      Duration.hours(1),
    );

    // Expired verification tokens
    makeScheduledLambda(
      this,
      "CleanupExpiredVerificationTokens",
      "maintenance/cleanupExpiredVerificationTokens.ts",
      Duration.hours(1),
    );

    // Expired sessions
    makeScheduledLambda(
      this,
      "CleanupExpiredSessions",
      "maintenance/cleanupExpiredSessions.ts",
      Duration.hours(1),
    );

    // Old rate limits (e.g. keep last 24h)
    makeScheduledLambda(
      this,
      "CleanupOldRateLimits",
      "maintenance/cleanupOldRateLimits.ts",
      Duration.hours(1),
    );
  }
}
