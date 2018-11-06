const stellar = require("stellar-sdk");

const PORT = Number.parseInt(process.env.PORT || "3000", 10); // Server port
const BIND = process.env.BIND || "0.0.0.0";                   // Server bind address
const SERVER_PRIVATE_KEY = process.env.SERVER_PRIVATE_KEY;    // Server Stellar private key (S.....)
const CHALLENGE_EXPIRE_IN = 300;                              // Challenge expiration time
const INVALID_SEQUENCE = "0";                                 // Default sequence number for challenge transaction
const ENDPOINT = `http://localhost:${PORT}/auth`;             // Endpoint for Stellar.toml
const JWT_TOKEN_LIFETIME = 3600;                              // JWT token will be expire in seconds
const JWT_SECRET = process.env.JWT_SECRET;                    // JWT secret

// Stellar::Keypair for server private key, used for signing transactions
const SERVER_KEY_PAIR = stellar.Keypair.fromSecret(SERVER_PRIVATE_KEY);

module.exports = {
  PORT, BIND, SERVER_KEY_PAIR, CHALLENGE_EXPIRE_IN, INVALID_SEQUENCE, ENDPOINT, JWT_TOKEN_LIFETIME, JWT_SECRET
};
