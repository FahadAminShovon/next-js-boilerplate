'use server';

import { db } from '@/db';
import userTable, {
  insertUserSchema,
  selectUserSchema,
} from '@/db/schema/user';
import { checkIfEmailExists } from '@/lib/server-validations';
import bcrypt from 'bcrypt';
import { createSession } from '../actions';
import type { AuthActionFormState } from '../auth.types';

async function signupAction(
  _prevState: AuthActionFormState,
  formData: FormData,
): Promise<AuthActionFormState> {
  const data = Object.fromEntries(formData.entries());
  const parsed = await insertUserSchema.safeParse(data);

  if (parsed.success) {
    const isValidEmail = await checkIfEmailExists(parsed.data.email);
    console.log('isValidEmail', isValidEmail);
    if (!isValidEmail) {
      return {
        message: 'Email already taken',
        issues: ['Email already taken'],
      };
    }

    const {
      data: { confirmPassword, ...parsedData },
    } = parsed;

    const hashedPassword = await bcrypt.hash(parsed.data.password, 10);
    parsedData.password = hashedPassword;

    try {
      const [newUser] = await db
        .insert(userTable)
        .values(parsedData)
        .returning();

      await createSession({ userId: newUser.id });
      return {
        message: 'User registered successfully',
        user: selectUserSchema.parse(newUser),
      };
    } catch (e) {
      console.log('err', e);
      if (e instanceof Error) {
        return {
          message: 'Something went wrong',
          issues: [e.message],
        };
      }
    }
  }

  return {
    message: 'User registration failed',
    issues: parsed?.error?.issues.map((issue) => issue.message),
  };
}

export { signupAction };
