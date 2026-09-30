// server/src/maintenance/cleanupExpiredRefreshTokens.ts


import { APIGatewayProxyHandlerV2 } from "./types";
import { prisma } from "@prisma";

export const handler: APIGatewayProxyHandlerV2 = async () => {
  const now = new Date();
  const result = await prisma.refreshToken.deleteMany({
    where: { expiresAt: { lt: now } },
  });
  console.log(`Deleted ${result.count} expired refresh tokens`);
  return { statusCode: 200, body: JSON.stringify({ deleted: result.count }) };
};
