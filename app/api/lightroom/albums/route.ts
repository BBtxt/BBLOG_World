// app/api/lightroom/albums/route.ts
import { NextResponse } from "next/server";

async function getAccessToken() {
  const tokenResponse = await fetch(
    "https://ims-na1.adobelogin.com/ims/token/v3",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        grant_type: "client_credentials", // Note: using client credentials flow
        client_id: process.env.ADOBE_CLIENT_ID!,
        client_secret: process.env.CLIENT_SECRET!,
        scope: "lr_partner_apis",
      }),
    },
  );

  const data = await tokenResponse.json();
  return data.access_token;
}

export async function GET(request: Request) {
  try {
    // First get an access token using your credentials
    const token = await getAccessToken();

    // Then use this token to fetch albums
    const response = await fetch("https://lr.adobe.io/v2/catalogs", {
      headers: {
        Authorization: `Bearer ${token}`,
        "x-api-key": process.env.ADOBE_CLIENT_ID!,
      },
    });

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch albums" },
      { status: 500 },
    );
  }
}
