'use client';
import { useRedirectUrl } from '@/app/hooks/useRedirectUrl';
import { type SelectUserSchemaType, selectUserSchema } from '@/db/schema/user';
import { createRequiredContext } from '@/lib/react-utils';
import { redirect } from 'next/navigation';
import type React from 'react';
import { use } from 'react';

const [useUser, AuthContextProvider] =
  createRequiredContext<SelectUserSchemaType>();

const AuthProvider = ({
  children,
  asyncUser,
}: {
  children: React.ReactNode;
  asyncUser: Promise<SelectUserSchemaType | null>;
}) => {
  const user = use(asyncUser);
  const parsedUser = selectUserSchema.safeParse(user);
  const { loginRedirect } = useRedirectUrl();
  if (!parsedUser.success) {
    return redirect(loginRedirect);
  }

  return (
    <AuthContextProvider value={parsedUser.data}>
      {children}
    </AuthContextProvider>
  );
};

export default AuthProvider;

export { useUser };
