// app/api/auth/login/route.ts
import { NextResponse } from "next/server";

export async function GET() {
    // Add console logging to help us debug
    console.log("Starting OAuth login process");

    if (!process.env.ADOBE_API_KEY || !process.env.ADOBE_REDIRECT_URI) {
        console.error("Missing required environment variables", {
            hasApiKey: !!process.env.ADOBE_API_KEY,
            hasRedirecURI: !!process.env.ADOBE_REDIRECT_URI,
        });
        return NextResponse.redirect("/error");
    }

    const state = Math.random().toString(36).substring(7);
    console.log("Generated state:", state);

    const authUrl = new URL('https://ims-na1.adobelogin.com/ims/authorize/v2');
    
    authUrl.searchParams.append('client_id', process.env.ADOBE_API_KEY);
    authUrl.searchParams.append('redirect_uri', process.env.ADOBE_REDIRECT_URI);
    // Add all required scopes for Lightroom API
    authUrl.searchParams.append('scope', 'lr_partner_apis,openid');
    authUrl.searchParams.append('response_type', 'code');
    authUrl.searchParams.append('state', state);

    console.log("Authorization URL:", authUrl.toString());

    // Adjust cookie settings based on environment
    const cookieOptions = process.env.NODE_ENV === 'development' 
        ? 'Path=/; HttpOnly; SameSite=Lax'
        : 'Path=/; HttpOnly; Secure; SameSite=Lax';

    return NextResponse.redirect(authUrl.toString(), {
        headers: {
            'Set-Cookie': `oauth_state=${state}; ${cookieOptions}`
        }
    });
}