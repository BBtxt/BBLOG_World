// app/api/auth/login/route.ts
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    console.log('=== LOGIN ROUTE START ===');
    console.log('Incoming request URL:', request.url);
    
    // Verify our environment variables
    if (!process.env.ADOBE_API_KEY || !process.env.ADOBE_REDIRECT_URI) {
        console.error('Missing required environment variables');
        return NextResponse.redirect(new URL('/error', request.url));
    }

    const state = Math.random().toString(36).substring(7);
    console.log('Generated state:', state);

    // Build Adobe's authorization URL
    const authUrl = new URL('https://ims-na1.adobelogin.com/ims/authorize/v2');
    
    const params = {
        client_id: process.env.ADOBE_API_KEY,
        redirect_uri: process.env.ADOBE_REDIRECT_URI,
        scope: 'lr_partner_apis,openid',
        response_type: 'code',
        state: state
    };

    // Add our parameters
    Object.entries(params).forEach(([key, value]) => {
        if (!value) {
            console.error(`Missing required parameter: ${key}`);
            throw new Error(`Missing required parameter: ${key}`);
        }
        authUrl.searchParams.append(key, value);
    });

    console.log('Authorization URL built (client_id hidden):', 
        authUrl.toString().replace(process.env.ADOBE_API_KEY, '[HIDDEN]')
    );

    // Create our response with the state cookie
    const response = NextResponse.redirect(authUrl.toString());
    
    // Set cookie with development-friendly options
    response.cookies.set('oauth_state', state, {
        httpOnly: true,
        secure: false,  // False for local development
        sameSite: 'lax',
        path: '/',
        maxAge: 3600
    });

    console.log('=== LOGIN ROUTE END ===');
    return response;
}