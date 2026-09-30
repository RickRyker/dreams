// server/src/maintenance/cleanupExpiredPasswordResetTokens.ts


import { APIGatewayProxyHandlerV2 } from "./types";
import { prisma } from "@prisma";

export const handler: APIGatewayProxyHandlerV2 = async () => {
  const now = new Date();
  const result = await prisma.passwordResetToken.deleteMany({
    where: { expiresAt: { lt: now } },
  });
  console.log(`Deleted ${result.count} expired password reset tokens`);
  return { statusCode: 200, body: JSON.stringify({ deleted: result.count }) };
};
