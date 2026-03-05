import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    // In a real app, you would check for a session cookie here.
    // For the portfolio showcase, we simulate the logic by checking a mock cookie.
    const hasAuthToken = request.cookies.has('rm_pro_session');

    // If the user is trying to access protected pages without a token
    const isPublicPath = request.nextUrl.pathname === '/login' || request.nextUrl.pathname === '/landing' || request.nextUrl.pathname === '/';

    if (!hasAuthToken && !isPublicPath) {
        // Redirect them to the /login page
        return NextResponse.redirect(new URL('/login', request.url));
    }

    // If they are on the login page but ALREADY have a token, send them to the dashboard
    if (hasAuthToken && request.nextUrl.pathname === '/login') {
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
