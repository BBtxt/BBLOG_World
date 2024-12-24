// app/api/auth/login/route.ts
// This file initiates the OAuth flow by redirecting to Adobe's login page
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    console.log('=== LOGIN ROUTE START ===');

    // Verify environment variables
    if (!process.env.ADOBE_API_KEY || !process.env.ADOBE_REDIRECT_URI) {
        console.error("Missing environment variables:", {
            hasApiKey: !!process.env.ADOBE_API_KEY,
            hasRedirectUri: !!process.env.ADOBE_REDIRECT_URI
        });
        return NextResponse.redirect('/error');
    }

    // Generate state for CSRF protection
    const state = Math.random().toString(36).substring(7);
    console.log("Generated state:", state);

    // Build Adobe's authorization URL
    const authUrl = new URL('https://ims-na1.adobelogin.com/ims/authorize/v2');
    
    // Add all required parameters
    authUrl.searchParams.append('client_id', process.env.ADOBE_API_KEY);
    authUrl.searchParams.append('redirect_uri', process.env.ADOBE_REDIRECT_URI);
    authUrl.searchParams.append('scope', 'lr_partner_apis,openid');
    authUrl.searchParams.append('response_type', 'code');
    authUrl.searchParams.append('state', state);

    console.log("Built authorization URL:", 
        authUrl.toString().replace(process.env.ADOBE_API_KEY, '[HIDDEN]')
    );

    // Create response with cookie
    const response = NextResponse.redirect(authUrl);
    
    // Set state cookie for verification
    response.cookies.set('oauth_state', state, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 3600
    });

    console.log('=== LOGIN ROUTE END ===');
    return response;
}