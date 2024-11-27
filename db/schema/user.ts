import { sql } from 'drizzle-orm';
import { pgTable, serial, timestamp, varchar } from 'drizzle-orm/pg-core';

const user = pgTable('user', {
  id: serial().primaryKey(),
  username: varchar({ length: 20 }).unique().notNull(),
  email: varchar({ length: 100 }).unique().notNull(),
  createdAt: timestamp().notNull().defaultNow(),
  updatedAt: timestamp({ mode: 'date' })
    .$onUpdate(() => new Date())
    .defaultNow(),
});

export default user;
