const stellar = require("stellar-sdk");
const express = require("express");
const bp = require("body-parser");

const challenge = require("./handlers/challenge.js");
const token = require("./handlers/token.js");
const toml = require("./handlers/toml.js");

const { PORT, BIND, SERVER_KEY_PAIR } = require("./config.js");

// Stellar uses current network key in transaction signatures to ensure transaction prepared for test network
// will be invalid in public network and vice versa. It does not matter which network to use in our case, except
// we must choose the same network on client and on server.
stellar.Network.useTestNetwork();

console.info(`Starting server on ${BIND}:${PORT}...`);
console.info(`Server public key: ${SERVER_KEY_PAIR.publicKey()}`);

const app = express();
app.use(bp.urlencoded({ extended: true })); // Allow parameters in POST requests
app.get("/.well-known/Stellar.toml", toml); // Server Stellar.toml
app.get("/auth", challenge); // GET /auth => challenge transactions
app.post("/auth", token); // POST /auth => access token

app.listen(PORT, BIND);
