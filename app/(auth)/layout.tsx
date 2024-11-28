import { Suspense } from 'react';
import { requireAnonymous } from '../(auth)/actions';

export default async function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  await requireAnonymous();
  return <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>;
}
