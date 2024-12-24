// scripts/setup-token.ts
import { writeFileSync } from 'fs';
import path from 'path';

// This script helps you store the access token after manually completing OAuth

async function storeToken(token: string) {
    // In production, you should use a proper secret management service
    // This is a simple solution for development
    const tokenConfig = {
        access_token: token,
        created_at: new Date().toISOString()
    };

    // Store in .env.local
    const envContent = `
# Adobe Lightroom API Token
# Generated on ${new Date().toISOString()}
LIGHTROOM_ACCESS_TOKEN=${token}
`;

    writeFileSync(path.join(process.cwd(), '.env.local'), envContent, { flag: 'a' });
    console.log('Token stored successfully in .env.local');
}

// You'll run this script manually after getting a token
if (process.argv[2]) {
    storeToken(process.argv[2]);
} else {
    console.log('Please provide a token: npm run store-token <your-token>');
}