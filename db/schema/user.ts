import { passwordSchema } from '@/lib/schemas';
import { pgTable, serial, timestamp, varchar } from 'drizzle-orm/pg-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';

const user = pgTable('user', {
  id: serial().primaryKey(),
  username: varchar({ length: 20 }).unique().notNull(),
  email: varchar({ length: 100 }).unique().notNull(),
  password: varchar({ length: 60 }).notNull(),
  firstName: varchar({ length: 50 }).notNull(),
  lastName: varchar({ length: 50 }).notNull(),
  createdAt: timestamp().notNull().defaultNow(),
  updatedAt: timestamp({ mode: 'date' })
    .$onUpdate(() => new Date())
    .defaultNow(),
});

const insertUserSchema = createInsertSchema(user, {
  password: passwordSchema,
  firstName: z.string().min(1).max(50).trim(),
  lastName: z.string().min(1).max(50).trim(),
  username: z.string().min(1).max(20).trim(),
  email: z
    .string()
    .min(1)
    .email()
    .trim()
    .transform((v) => v.toLowerCase()),
})
  .omit({
    id: true,
    createdAt: true,
    updatedAt: true,
  })
  .merge(
    z.object({
      confirmPassword: passwordSchema,
    }),
  )
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

const selectUserSchema = createSelectSchema(user).omit({
  password: true,
});

const signinUserSchema = createSelectSchema(user, {
  email: z
    .string()
    .email()
    .trim()
    .transform((v) => v.toLowerCase()),
}).pick({
  email: true,
  password: true,
});

type InsertUserSchemaType = z.infer<typeof insertUserSchema>;
type SelectUserSchemaType = z.infer<typeof selectUserSchema>;

export { insertUserSchema, selectUserSchema, signinUserSchema };

export type { InsertUserSchemaType, SelectUserSchemaType };

export default user;
