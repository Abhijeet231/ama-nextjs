import {NextResponse } from 'next/server'
import type { NextRequest } from "next/server";

export { default } from "next-auth/middleware" // ??
import { getToken } from 'next-auth/jwt' // ??




export async function proxy(request: NextRequest) {

    const token = await getToken({req:request})
    const url = request.nextUrl.pathname;

    if( token &&
        (
          url.startsWith('/sign-in') || 
          url.startsWith('/sign-up') ||
          url.startsWith('/verify') ||
          url.startsWith('/') 
        )
    ){
        return NextResponse.redirect(new URL('/dashboard', request.url))
    }

  return NextResponse.next();
}
 

export const config = {
  matcher: [
      '/sign-in',
      '/sign-up',
      '/',
      '/dashboard/:path*', // every path inside dashboard *
      '/verify/:path*'
  ]
}