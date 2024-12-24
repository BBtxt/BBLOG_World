// app/api/auth/callback/route.ts
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(request: Request) {
    console.log("Callback route hit");
    
    const { searchParams } = new URL(request.url);
    const code = searchParams.get("code");
    const state = searchParams.get("state");
    const error = searchParams.get("error");

    console.log("Received params:", { code, state, error });

    if (error) {
        console.error("OAuth error:", error);
        return NextResponse.redirect("/error");
    }

    if (!code) {
        console.error("No code received");
        return NextResponse.redirect("/error");
    }

    const cookieStore = cookies();
    const storedState = cookieStore.get('oauth_state')?.value;
    console.log("Stored state:", storedState, "Received state:", state);

    if (!state || state !== storedState) {
        console.error("State mismatch");
        return NextResponse.redirect("/error");
    }

    try {
        console.log("Exchanging code for token");
        const tokenResponse = await fetch(
            "https://ims-na1.adobelogin.com/ims/token/v3",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                body: new URLSearchParams({
                    grant_type: "authorization_code",
                    client_id: process.env.ADOBE_API_KEY!,
                    client_secret: process.env.ADOBE_CLIENT_SECRET!,
                    code: code,
                    redirect_uri: process.env.ADOBE_REDIRECT_URI!,
                }),
            }
        );

        const data = await tokenResponse.json();
        console.log("Token response received:", data.access_token ? "Token received" : "No token in response");

        // Adjust cookie settings based on environment
        const cookieOptions = process.env.NODE_ENV === 'development'
            ? 'Path=/; HttpOnly; SameSite=Lax; Max-Age=3600'
            : 'Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=3600';

        return NextResponse.redirect("/", {
            headers: {
                'Set-Cookie': `access_token=${data.access_token}; ${cookieOptions}`
            }
        });
    } catch (error) {
        console.error("Token exchange error:", error);
        return NextResponse.redirect("/error");
    }
}