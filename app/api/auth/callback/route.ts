import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  const state = searchParams.get("state");

  const storedState = cookies().get("oauth_state")?.value;
  if (!state || state !== storedState) {
    return NextResponse.redirect("/error");
  }

  if (!code) {
    return NextResponse.redirect("/error");
  }

  try {
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

    // if (!tokenResponse.ok) {
    //   throw new Error('Failed to get access token')
    // }

    const data = await tokenResponse.json();

    const cookieStore = cookies();
    cookieStore.set("access_token", data.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24,
    });

    return NextResponse.redirect("/")
  } catch (error) {
    console.error("Token exchange error:", error);
  return NextResponse.redirect("/error")
  }
}
