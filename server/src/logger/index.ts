// server/src/logger/index.ts

import pino from 'pino';
import { env } from '../env';

export const logger = pino({
  level: env.nodeEnv === 'development' ? 'debug' : 'info',
  transport:
    env.nodeEnv === 'development'
      ? { target: 'pino-pretty', options: { colorize: true } }
      : undefined
});
