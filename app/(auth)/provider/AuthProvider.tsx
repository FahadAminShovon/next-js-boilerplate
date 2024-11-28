'use client';
import { type SelectUserSchemaType, selectUserSchema } from '@/db/schema/user';
import { createRequiredContext } from '@/lib/react-utils';
import { useRouter } from 'next/navigation';
import type React from 'react';
import { use } from 'react';
import { logOut } from '../actions';

const [useUser, AuthContextProvider] =
  createRequiredContext<SelectUserSchemaType>();

const AuthProvider = ({
  children,
  asyncUser,
}: {
  children: React.ReactNode;
  asyncUser: Promise<SelectUserSchemaType | null>;
}) => {
  const router = useRouter();
  const user = use(asyncUser);
  const parsedUser = selectUserSchema.safeParse(user);
  if (!parsedUser.success) {
    logOut();
    router.push('/login');
    return null;
  }

  return (
    <AuthContextProvider value={parsedUser.data}>
      {children}
    </AuthContextProvider>
  );
};

export default AuthProvider;

export { useUser };
