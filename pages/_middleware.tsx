import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';

export async function middleware(req: any) {
  // Token will exist if the user is logged in
  const token = await getToken({req, secret: process.env.JWT_SECRET});
  const {pathname, origin} = req.nextUrl;

  // Allow the request if the following is true...
  if (pathname.includes('/api/auth') || token) {
    return NextResponse.next();
  }

  if (!token && pathname !== '/login') {
    return NextResponse.redirect(`${origin}/login`);
  }
}
