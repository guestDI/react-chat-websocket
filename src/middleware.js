import { NextResponse } from 'next/server';
import { authRoutes, protectedRoutes } from './app/routes';
import { decode } from 'jsonwebtoken';

const getTokenExpDate = (accessToken) => {
  return (
    (decode(accessToken.value, 'your-secret-key', {
      complete: true,
    }).exp || 0) * 1000
  );
};

export function middleware(request) {
  const accessToken = request.cookies.get('access_token');

  if (
    protectedRoutes.includes(request.nextUrl.pathname) &&
    (!accessToken || Date.now() > getTokenExpDate(accessToken))
  ) {
    request.cookies.delete('access_token');
    const response = NextResponse.redirect(new URL('/auth', request.url));
    response.cookies.delete('access_token');

    return response;
  }

  if (authRoutes.includes(request.nextUrl.pathname) && accessToken) {
    return NextResponse.redirect(new URL('/profile', request.url));
  }
}
