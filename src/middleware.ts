import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

const SECRET_KEY = process.env.AUTH_SECRET || "fallback_secret_for_dev_only";
const key = new TextEncoder().encode(SECRET_KEY);

export async function middleware(request: NextRequest) {
    const sessionCookie = request.cookies.get('rm_pro_session')?.value;

    let session = null;
    if (sessionCookie) {
        try {
            const { payload } = await jwtVerify(sessionCookie, key, {
                algorithms: ['HS256'],
            });
            session = payload;
        } catch (e) {
            // Invalid or expired token
            console.error('Middleware: Invalid session', e);
        }
    }

    const hasValidAuth = !!session;
    const { pathname } = request.nextUrl;

    // Public paths that don't require authentication
    const isPublicPath = pathname === '/login' || pathname === '/' || pathname.startsWith('/_next') || pathname.endsWith('.svg');

    if (!hasValidAuth && !isPublicPath) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    if (hasValidAuth && pathname === '/login') {
        return NextResponse.redirect(new URL('/dashboard', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\.svg$).*)'],
};
