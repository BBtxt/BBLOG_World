import { cookies } from "next/headers";

export async function getAccessToken() {
    const token = cookies().get('access_token')?.value

    if(!token) {
        throw new Error('No access token found')
    }
    return token
}