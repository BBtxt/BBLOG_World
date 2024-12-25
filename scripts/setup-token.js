// scripts/setup-token.js
const fs = require('fs');
const path = require('path');

async function storeToken(token) {
    // Get existing .env.local content if it exists
    let envContent = '';
    const envPath = path.join(process.cwd(), '.env.local');
    
    try {
        envContent = fs.readFileSync(envPath, 'utf8');
    } catch (error) {
        // File doesn't exist yet, that's okay
    }

    // Add or update the LIGHTROOM_ACCESS_TOKEN
    if (envContent.includes('LIGHTROOM_ACCESS_TOKEN=')) {
        // Update existing token
        envContent = envContent.replace(
            /LIGHTROOM_ACCESS_TOKEN=.*/,
            `LIGHTROOM_ACCESS_TOKEN=${token}`
        );
    } else {
        // Add new token
        envContent += `\nLIGHTROOM_ACCESS_TOKEN=${token}\n`;
    }

    // Write back to .env.local
    fs.writeFileSync(envPath, envContent);
    console.log('Token stored successfully in .env.local');
}

// Check if token was provided as command line argument
if (process.argv[2]) {
    storeToken(process.argv[2]);
} else {
    console.log('Please provide a token: node scripts/setup-token.js <your-token>');
}