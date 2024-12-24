// app/api/auth/callback/route.ts
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(request: Request) {
  console.log("=== CALLBACK ROUTE START ===");

  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");
  const error = url.searchParams.get("error");

  console.log("Received params:", {
    hasCode: !!code,
    hasState: !!state,
    error: error || "none",
  });

  if (error) {
    console.error("OAuth error received:", error);
    return NextResponse.redirect(new URL("/error", request.url));
  }

  if (!code) {
    console.error("No Auth code received");
    return NextResponse.redirect(new URL("/error", request.url));
  }

  const cookieStore = cookies();
  const storedState = cookieStore.get("oauth_state")?.value;
  console.log("State verification", {
    storedState,
    receivedState: state,
    matches: state === storedState,
  });


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
    if (!tokenResponse.ok) {
        const errorText = await tokenResponse.text();
        console.error("Token exchange failed:", {
            status: tokenResponse.status,
            error: errorText
        });
        throw new Error(`Token exchange failed: ${tokenResponse.status}`);
    }

    const data = await tokenResponse.json();
    console.log("Token exchange successful");

    // Create response with redirect and cookie
    const response = NextResponse.redirect(new URL('/', request.url));
    
    // Set the access token cookie
    response.cookies.set('access_token', data.access_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 3600 // 1 hour
    });

    console.log("=== CALLBACK ROUTE END ===");
    return response;

} catch (error) {
    console.error("Error in callback processing:", error);
    return NextResponse.redirect(new URL('/error', request.url));
}
}
