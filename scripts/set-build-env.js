import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get current timestamp
const timestamp = new Date().toISOString();
const version = process.env.npm_package_version || '0.0.0';

// Get the directory name using ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create or update .env file
const envPath = path.join(__dirname, '..', '.env');
let envContent = '';

// Read existing .env file if it exists
if (fs.existsSync(envPath)) {
  envContent = fs.readFileSync(envPath, 'utf8');
}

// Update or add build variables
const lines = envContent.split('\n');
const newLines = [];
let foundBuildTimestamp = false;
let foundBuildVersion = false;

for (const line of lines) {
  if (line.startsWith('VITE_BUILD_TIMESTAMP=')) {
    newLines.push(`VITE_BUILD_TIMESTAMP=${timestamp}`);
    foundBuildTimestamp = true;
  } else if (line.startsWith('VITE_BUILD_VERSION=')) {
    newLines.push(`VITE_BUILD_VERSION=${version}`);
    foundBuildVersion = true;
  } else {
    newLines.push(line);
  }
}

// Add missing variables
if (!foundBuildTimestamp) {
  newLines.push(`VITE_BUILD_TIMESTAMP=${timestamp}`);
}
if (!foundBuildVersion) {
  newLines.push(`VITE_BUILD_VERSION=${version}`);
}

// Write updated content back to .env
fs.writeFileSync(envPath, newLines.join('\n'));

console.log('Build environment variables updated:');
console.log(`- VITE_BUILD_TIMESTAMP=${timestamp}`);
console.log(`- VITE_BUILD_VERSION=${version}`); 