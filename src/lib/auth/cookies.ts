import { NextResponse } from 'next/server';
import { authConfig } from '@/config/auth';
import { appConfig } from '@/config/app';

export const setAuthCookie = (response: NextResponse, token: string) => {
  response.cookies.set(authConfig.cookieName, token, {
    httpOnly: true,
    secure: appConfig.isProd,
    sameSite: 'strict',
    maxAge: authConfig.cookieMaxAge,
    path: '/',
  });
  return response;
};

export const clearAuthCookie = (response: NextResponse) => {
  response.cookies.set(authConfig.cookieName, '', {
    httpOnly: true,
    secure: appConfig.isProd,
    sameSite: 'strict',
    maxAge: 0,
    path: '/',
  });
  return response;
};