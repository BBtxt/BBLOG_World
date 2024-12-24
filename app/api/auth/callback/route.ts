// app/api/auth/callback/route.ts
import { NextResponse } from "next/server";
import { headers } from 'next/headers';

export async function GET(request: Request) {
    console.log("=== CALLBACK ROUTE START ===");
    
    // First, let's add the necessary security headers
    const response = new NextResponse();
    response.headers.set('Permissions-Policy', 
        'private-state-token-redemption=*, private-state-token-issuance=*'
    );
    
    const url = new URL(request.url);
    console.log("Received callback URL:", url.toString());
    
    const code = url.searchParams.get("code");
    const state = url.searchParams.get("state");
    
    if (!code) {
        console.error("No authorization code received");
        return NextResponse.redirect(new URL('/error', request.url));
    }

    try {
        console.log("Attempting token exchange with code");
        const tokenResponse = await fetch(
            "https://ims-na1.adobelogin.com/ims/token/v3",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    "Accept": "application/json"
                },
                body: new URLSearchParams({
                    grant_type: "authorization_code",
                    client_id: process.env.ADOBE_API_KEY!,
                    client_secret: process.env.ADOBE_CLIENT_SECRET!,
                    code: code,
                    redirect_uri: process.env.ADOBE_REDIRECT_URI!
                })
            }
        );

        if (!tokenResponse.ok) {
            const errorText = await tokenResponse.text();
            console.error("Token exchange failed:", errorText);
            return NextResponse.redirect(new URL('/error', request.url));
        }

        const data = await tokenResponse.json();
        console.log("Successfully received token response");

        // Create our redirect response with the token
        const redirectResponse = NextResponse.redirect(new URL('/', request.url));
        
        // Set the access token cookie
        redirectResponse.cookies.set('access_token', data.access_token, {
            httpOnly: true,
            secure: false,  // Set to false for local development
            sameSite: 'lax',
            path: '/',
            maxAge: 3600
        });

        // Copy over our security headers
        redirectResponse.headers.set('Permissions-Policy', 
            'private-state-token-redemption=*, private-state-token-issuance=*'
        );

        console.log("=== CALLBACK ROUTE END ===");
        return redirectResponse;

    } catch (error) {
        console.error("Error processing callback:", error);
        return NextResponse.redirect(new URL('/error', request.url));
    }
}