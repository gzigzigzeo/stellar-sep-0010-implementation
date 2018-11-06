const { PORT, ENDPOINT, SERVER_KEY_PAIR } = require("../config.js");

// Generates and serves Stellar.toml file based on current server configuration.
module.exports = (req, res) => {
  res.send(`
AUTH_ACCOUNT="${SERVER_KEY_PAIR.publicKey()}"
WEB_AUTH_ENDPOINT="${ENDPOINT}"
  `);
};
