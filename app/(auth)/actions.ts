'use server';

import { db } from '@/db';
import { env } from '@/env';
import { getIronSession } from 'iron-session';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

const AUTH_COOKIE_NAME = 'auth_cookie';
const AUTH_COOKIE_MAX_AGE = 60 * 60 * 24 * 7; // 1 week

type AuthCookiePayload = {
  userId: number;
};

async function createSession({ userId }: AuthCookiePayload) {
  const session = await getIronSession<{ userId: number }>(await cookies(), {
    cookieName: AUTH_COOKIE_NAME,
    password: env.SESSION_SECRET,
    ttl: AUTH_COOKIE_MAX_AGE,
    cookieOptions: {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
    },
  });
  session.userId = userId;
  await session.save();
}

async function getUserSession() {
  const session = await getIronSession<AuthCookiePayload>(await cookies(), {
    cookieName: AUTH_COOKIE_NAME,
    password: env.SESSION_SECRET,
  });

  return session;
}

async function destroySession() {
  const session = await getIronSession<AuthCookiePayload>(await cookies(), {
    cookieName: AUTH_COOKIE_NAME,
    password: env.SESSION_SECRET,
  });

  await session.destroy();
}

async function getUser() {
  const session = await getUserSession();
  if (session) {
    const user = await db.query.user.findFirst({
      where(fields, operators) {
        return operators.eq(fields.id, session.userId);
      },
    });

    if (user) {
      return user;
    }
    throw new Error('User not found');
  }
  throw new Error('User not found');
}

async function requireAnonymous() {
  const session = await getUserSession();
  if (session.userId) {
    redirect('/dashboard');
  }
}

async function requireUser() {
  const session = await getUserSession();
  if (!session.userId) {
    redirect('/login');
  }
  const user = await getUser();
  return user;
}

async function logOut() {
  await destroySession();
  redirect('/login');
}

export { createSession, logOut, requireAnonymous, requireUser };
