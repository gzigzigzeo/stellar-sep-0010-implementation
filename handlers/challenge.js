const crypto = require("crypto");
const stellar = require("stellar-sdk");
const { SERVER_KEY_PAIR, CHALLENGE_EXPIRE_IN, INVALID_SEQUENCE } = require("../config.js");

// Stellar::Account representing application's account, INVALID_SEQUENCE is used here to make sure this transaction
// will be invalid if submitted to real network
const account = new stellar.Account(SERVER_KEY_PAIR.publicKey(), INVALID_SEQUENCE);

// This random sequence is used to ensure that two challenge transactions generated in the same will be different.
// In other words, it makes every challenge transaction unique.
const randomNonce = () => {
  return crypto.randomBytes(32).toString("hex");
};

// GET /auth => { transaction: "base64 tx xdr" }
const challenge = (req, res) => {
  // Requesting client public key
  const clientPublicKey = req.query.public_key;

  // Transaction time bounds, current time..+300 seconds by default.
  // In other words, challenge transaction will expire in 5 minutes since it was generated.
  const minTime = Date.now();
  const maxTime = minTime + CHALLENGE_EXPIRE_IN;
  const timebounds = { minTime: minTime.toString(), maxTime: maxTime.toString() };

  // ManageData operation, source represents account requesting access to the service. It must be explicitly
  // set here since transaction will not be fully valid until both accounts sign it. With no account set,
  // transaction will be valid with server signature only.
  const op = stellar.Operation.manageData({
    source: clientPublicKey,
    name: "Sample auth",
    value: randomNonce()
  });

  const tx = new stellar.TransactionBuilder(account, { timebounds }).addOperation(op).build();
  tx.sign(SERVER_KEY_PAIR); // Signed by us
  res.json({ transaction: tx.toEnvelope().toXDR("base64") });
};

module.exports = challenge;
