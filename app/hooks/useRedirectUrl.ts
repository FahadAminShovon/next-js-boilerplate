import { useUrl } from './useUrl';

export const useRedirectUrl = () => {
  const { url: redirectTo } = useUrl();
  const loginParams = redirectTo ? new URLSearchParams({ redirectTo }) : null;
  const loginRedirect = ['/login', loginParams?.toString()]
    .filter(Boolean)
    .join('?');

  return { loginRedirect };
};
