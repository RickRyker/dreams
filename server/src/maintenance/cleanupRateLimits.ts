// server/src/maintenance/cleanupRateLimits.ts


import { prisma } from "@prisma";

export const handler = async () => {
  const cutoff = new Date(Date.now() - 24 * 60 * 60 * 1000); // 24 hours

  await prisma.rateLimit.deleteMany({
    where: {
      timestamp: { lt: cutoff }
    }
  });

  return { status: "ok" };
};
