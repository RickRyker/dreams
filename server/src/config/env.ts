// server/src/config/env.ts

import 'dotenv/config';

const required = (name: string): string => {
    const value = process.env[name];
    if (!value) {
        throw new Error(`Missing required env var: ${name}`);
    }
    return value;
};

export const env = {
    nodeEnv: process.env.NODE_ENV ?? 'development',
    port: Number(process.env.PORT ?? 4000),
    databaseUrl: required('DATABASE_URL')
};
