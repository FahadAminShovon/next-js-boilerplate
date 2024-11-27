import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const env = createEnv({
  server: {
    DATABASE_URL: z.string().url(),
    DB_MIGRATING: z.boolean().optional().default(false),
    DB_SEEDING: z.boolean().optional().default(false),
  },
  experimental__runtimeEnv: {},
});
