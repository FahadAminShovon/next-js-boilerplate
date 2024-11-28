import type { SelectUserSchemaType } from '@/db/schema/user';

type AuthActionFormState = {
  message: string;
  user?: SelectUserSchemaType;
  issues?: string[];
};

export type { AuthActionFormState };
