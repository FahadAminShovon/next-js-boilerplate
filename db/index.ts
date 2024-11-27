import { env } from '@/env';
import { Pool, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';
import ws from 'ws';
import * as schema from './schema';

neonConfig.webSocketConstructor = ws;
const pool = new Pool({
  connectionString: env.DATABASE_URL,
  max: env.DB_MIGRATING || env.DB_SEEDING ? 1 : undefined,
});

export const db = drizzle(pool, {
  logger: true,
  schema,
});

export type db = typeof db;
