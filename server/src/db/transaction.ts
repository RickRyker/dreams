// server/src/db/transaction.ts

import type { PrismaClient } from '@prisma/client';
import { prisma } from './client';

export const withTransaction = async <T>(
    fn: (tx: Parameters<Parameters<PrismaClient['$transaction']>[0]>[0]) => Promise<T>
): Promise<T> => prisma.$transaction((tx) => fn(tx as unknown as PrismaClient));
