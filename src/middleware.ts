import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { decrypt } from '@/lib/auth';

export async function middleware(request: NextRequest) {
    const sessionCookie = request.cookies.get('rm_pro_session')?.value;

    // Decrypt and verify the token (Zero Trust)
    const session = sessionCookie ? await decrypt(sessionCookie) : null;
    const hasValidAuth = !!session;

    // If the user is trying to access protected pages without a VALID token
    const isPublicPath = request.nextUrl.pathname === '/login' || request.nextUrl.pathname === '/landing' || request.nextUrl.pathname === '/';

    if (!hasValidAuth && !isPublicPath) {
        // Redirect them to the /login page
        return NextResponse.redirect(new URL('/login', request.url));
    }

    // If they are on the login page but ALREADY have a VALID token, send them to the dashboard
    if (hasValidAuth && request.nextUrl.pathname === '/login') {
        return NextResponse.redirect(new URL('/dashboard', request.url));
    }

    // Otherwise, allow the request to proceed as normal
    return NextResponse.next();
}

// Ensure the middleware runs on all paths except static files and images
export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        '/((?!api|_next/static|_next/image|favicon.ico|.*\\.svg$).*)',
    ],
};
