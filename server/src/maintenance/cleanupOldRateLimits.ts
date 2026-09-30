// server/src/maintenance/cleanupOldRateLimits.ts


import { APIGatewayProxyHandlerV2 } from "./types";
import { prisma } from "@prisma";

export const handler: APIGatewayProxyHandlerV2 = async () => {
  const cutoff = new Date(Date.now() - 24 * 60 * 60 * 1000); // 24h
  const result = await prisma.rateLimit.deleteMany({
    where: { timestamp: { lt: cutoff } },
  });
  console.log(`Deleted ${result.count} old rate limit entries`);
  return { statusCode: 200, body: JSON.stringify({ deleted: result.count }) };
};
