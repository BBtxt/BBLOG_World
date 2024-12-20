// app/api/auth/route.ts
import { NextResponse } from "next/server";
import { redirect } from "next/navigation";

export async function GET() {
  const clientId = process.env.ADOBE_CLIENT_ID;
  const redirectUri = process.env.DEF_REDIRECT_URI;

  const authUrl = `https://ims-na1.adobelogin.com/ims/authorize/v2?client_id=${clientId}&redirect_uri=${redirectUri}&scope=lr_partner_apis&response_type=code`;

  return NextResponse.redirect(authUrl);
}
