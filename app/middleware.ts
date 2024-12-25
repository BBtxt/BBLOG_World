import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    // Get the pathname from the request
    const { pathname } = request.nextUrl;

    // Clone the response
    const response = NextResponse.next();

    // Add the required permission policies
    response.headers.set(
        'Permissions-Policy',
        'private-state-token-redemption=*, private-state-token-issuance=*'
    );

    // Handle OAuth callback
    if (pathname.startsWith('/api/auth/callback')) {
        // Ensure we're using the correct host
        const url = request.nextUrl.clone();
        if (process.env.NODE_ENV === 'development') {
            // Force HTTPS for local development
            url.protocol = 'https';
            url.host = 'localhost:3000';
            return NextResponse.rewrite(url);
        }
    }

    return response;
}

export const config = {
    matcher: [
        '/api/auth/:path*',
        '/'
    ]
};