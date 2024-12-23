import { redirect } from 'next/navigation'

export async function GET() {
  // Verify all required environment variables exist
  if (!process.env.ADOBE_API_KEY) {
    throw new Error('ADOBE_API_KEY environment variable is not defined')
  }
  if (!process.env.ADOBE_REDIRECT_URI) {
    throw new Error('ADOBE_REDIRECT_URI environment variable is not defined')
  }

  const state = Math.random().toString(36).substring(7)
  const authUrl = new URL('https://ims-na1.adobelogin.com/ims/authorize/v2')
  
  // Now TypeScript knows these values exist
  authUrl.searchParams.append('client_id', process.env.ADOBE_API_KEY)
  authUrl.searchParams.append('redirect_uri', process.env.ADOBE_REDIRECT_URI)
  authUrl.searchParams.append('scope', 'lr_partner_apis')
  authUrl.searchParams.append('response_type', 'code')
  authUrl.searchParams.append('state', state)

  const response = Response.redirect(authUrl.toString())
  
  response.headers.append('Set-Cookie', `oauth_state=${state}; Path=/; HttpOnly; Secure`)
  
  return response
}