import { z } from 'zod';

export const passwordSchema = z
  .string()
  .min(6, { message: 'Password must be at least 6 characters long' })
  .max(255, { message: 'Password cannot be longer than 255 characters' })
  .regex(/[a-z]/, {
    message: 'Password must contain at least one lowercase letter',
  })
  .regex(/[A-Z]/, {
    message: 'Password must contain at least one uppercase letter',
  })
  .regex(/[0-9]/, { message: 'Password must contain at least one number' });

export const emailSchema = z.string().email();
