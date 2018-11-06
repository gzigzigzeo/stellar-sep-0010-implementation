const stellar = require("stellar-sdk");
const express = require("express");
const { PORT, BIND } = require("./config.js");
const challenge = require("./handlers/challenge.js");

// Stellar uses current network key in transaction signatures to ensure transaction prepared for test network
// will be invalid in public network and vice versa. It does not matter which network to use in our case, except
// we must choose the same network on client and server.
stellar.Network.useTestNetwork();

const app = express();
app.use(express.static('public')) // Serve Stellar.toml
app.get("/auth", challenge);      // GET /auth => challenge transactions
                                  // POST /auth => access token

app.listen(PORT, BIND);
