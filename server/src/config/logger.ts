// server/src/config/logger.ts

import pino from 'pino';
import { env } from './env.js';

const usePrettyTransport =
  env.nodeEnv === 'development' && process.env.PINO_PRETTY === '1';

export const logger = pino({
  level: env.nodeEnv === 'development' ? 'debug' : 'info',
  transport: usePrettyTransport
      ? { target: 'pino-pretty', options: { colorize: true } }
      : undefined
});
