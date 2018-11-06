const { Transaction, Keypair } = require("stellar-sdk");
const { SERVER_KEY_PAIR, ENDPOINT, JWT_TOKEN_LIFETIME, JWT_SECRET, ALLOWED_ACCOUNTS } = require("../config.js");
const jwt = require("jsonwebtoken");

module.exports = (req, res) => {
  const tx = new Transaction(req.body.transaction);
  const op = tx.operations[0];
  const { signatures } = tx;
  const hash = tx.hash();

  // Source account is ours
  if (tx.source != SERVER_KEY_PAIR.publicKey()) {
    return res.json({ error: "Invalid source account." });
  }

  // Challenge transaction was generated by us
  if (!signatures.some(signature =>
    SERVER_KEY_PAIR.verify(hash, signature.signature())
  )) {
    return res.json({ error: "Server signature is missing or invalid." });
  }

  // Challenge transaction is not expired
  if (!(
    tx.timeBounds
    && Date.now() > Number.parseInt(tx.timeBounds.minTime, 10)
    && Date.now() < Number.parseInt(tx.timeBounds.maxTime, 10)
  )) {
    return res.json({ error: "Challenge transaction expired." });
  }

  // Challenge transaction has manageData operation
  if (op.type != "manageData") {
    return res.json({ error: "Challenge has no manageData operation." });
  }

  // Source account present
  if (!op.source) {
    return res.json({ error: "Challenge has no source account." });
  }

  const clientKeyPair = Keypair.fromPublicKey(op.source);

  // Challenge transaction was signed by client
  if (!signatures.some(signature =>
    clientKeyPair.verify(hash, signature.signature())
  )) {
    return res.json({ error: "Client signature is missing or invalid." });
  }

  // Check that this account access is allowed
  if (ALLOWED_ACCOUNTS.indexOf(op.source) == -1) {
    console.info(`${op.source} requested token => access denied, check ALLOWED_ACCOUNTS`);    
    return res.json({ error: `${op.source} access denied.` });
  }

  console.info(`${op.source} requested token => OK`);

  const token = jwt.sign({
    iss: ENDPOINT,
    sub: op.source,
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + JWT_TOKEN_LIFETIME,
    jwtid: tx.hash().toString("hex")
  }, JWT_SECRET);

  res.json({ token: token });
};
