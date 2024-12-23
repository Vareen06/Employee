const dotenv = require('dotenv');
const path = require('path');
const crypto = require('crypto');

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const jwtSecret = process.env.JWT_SECRET;

function generateSecretKey() {
    return crypto.randomBytes(32).toString('hex');
}

const secretKey = generateSecretKey();
console.log(`Generated Secret Key: ${secretKey}`);

module.exports = { secretKey, jwtSecret };