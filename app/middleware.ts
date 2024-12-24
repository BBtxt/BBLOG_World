import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    // Clone the response
    const response = NextResponse.next();

    // Add the required permission policies
    response.headers.set(
        'Permissions-Policy',
        'private-state-token-redemption=*, private-state-token-issuance=*'
    );

    return response;
}

export const config = {
    matcher: [
        '/api/auth/:path*',
        '/'
    ]
};