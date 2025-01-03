// app/api/auth/login/route.ts
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    console.log('=== LOGIN ROUTE START ===');

    // Verify environment variables with detailed logging
    console.log('Environment variables check:', {
        hasApiKey: !!process.env.ADOBE_API_KEY,
        hasRedirectUri: !!process.env.ADOBE_REDIRECT_URI,
        redirectUri: process.env.ADOBE_REDIRECT_URI // Log the actual URI for debugging
    });

    if (!process.env.ADOBE_API_KEY || !process.env.ADOBE_REDIRECT_URI) {
        console.error("Missing environment variables");
        return NextResponse.redirect('/error');
    }

    // Generate state for CSRF protection
    const state = Math.random().toString(36).substring(7);
    console.log("Generated state:", state);

    // Build Adobe's authorization URL
    const authUrl = new URL('https://ims-na1.adobelogin.com/ims/authorize/v2');
    
    // Ensure redirect URI is properly formatted
    const redirectUri = process.env.ADOBE_REDIRECT_URI.replace(/([^:])(\/\/+)/g, '$1/');
    
    // Create parameters object for better visibility
    const params = {
        client_id: process.env.ADOBE_API_KEY,
        redirect_uri: redirectUri,
        scope: 'lr_partner_apis,openid',
        response_type: 'code',
        state: state
    };

    // Log the parameters we're about to use (excluding sensitive data)
    console.log('Authorization parameters:', {
        ...params,
        client_id: '[HIDDEN]',
        redirect_uri: redirectUri
    });

    // Add parameters to URL
    Object.entries(params).forEach(([key, value]) => {
        authUrl.searchParams.append(key, value);
    });

    console.log('Final authorization URL:', 
        authUrl.toString().replace(process.env.ADOBE_API_KEY, '[HIDDEN]')
    );

    // Create response with cookie
    const response = NextResponse.redirect(authUrl);
    
    // Set state cookie for verification
    response.cookies.set('oauth_state', state, {
        httpOnly: true,
        secure: true,  // Always use secure in development for Adobe OAuth
        sameSite: 'lax',
        path: '/',
        maxAge: 3600
    });

    console.log('=== LOGIN ROUTE END ===');
    return response;
}