module.exports = (req, res) => {
  const tx = req.query.transaction;

  console.log(tx);
};

// const keypair = stellar.Keypair.fromPublicKey(tx.source);
//
// const { signatures } = tx;
// const hash = tx.hash();
//
// if (!signatures || signatures.length === 0) {
//   return false;
// }
//
// return signatures.some(signature =>
//   keypair.verify(hash, signature.signature())
// );
