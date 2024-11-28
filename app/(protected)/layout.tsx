import { Suspense } from 'react';
import { requireUser } from '../(auth)/actions';
import AuthProvider from '../(auth)/provider/AuthProvider';

export default async function ProtectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const asyncUser = requireUser();
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AuthProvider asyncUser={asyncUser}>{children}</AuthProvider>
    </Suspense>
  );
}
