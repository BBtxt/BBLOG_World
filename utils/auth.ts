// utils/auth.ts
// This file handles access token retrieval and management
import { cookies } from "next/headers";

export async function getAccessToken() {
    console.log("=== GET ACCESS TOKEN START ===");
    
    const cookieStore = cookies();
    const allCookies = cookieStore.getAll();
    console.log("Checking available cookies:", 
        allCookies.map(c => ({ name: c.name, hasValue: !!c.value }))
    );
    
    const token = cookieStore.get('access_token')?.value;
    console.log("Access token present:", !!token);
    
    if(!token) {
        console.log("=== GET ACCESS TOKEN END (NO TOKEN) ===");
        throw new Error('No access token found');
    }

    console.log("=== GET ACCESS TOKEN END (SUCCESS) ===");
    return token;
}