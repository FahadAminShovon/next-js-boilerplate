'use client';
import { usePathname, useSearchParams } from 'next/navigation';

export const useUrl = () => {
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const allQueryParams = Object.fromEntries(searchParams.entries());
  const url = `${pathName}?${new URLSearchParams(allQueryParams).toString()}`;
  return { url: url };
};
