# Stellar SEP-0010 implementation

JavaScript/Node.js implementation of the Stellar Web Authentication ([SEP-0010](https://github.com/stellar/stellar-protocol/blob/master/ecosystem/sep-0010.md)) proposal.

Read more about it in [Anonymous web authentication with Stellar blockchain](https://evilmartians.com/chronicles/anonymous-web-authentication-with-stellar-blockchain) article on [Martian Chronicles](https://evilmartians.com/chronicles/).

## Installation

```
git clone https://github.com/gzigzigzeo/stellar-sep-0010-implementation && yarn install
```

## Starting the server

```
  SERVER_PRIVATE_KEY=SDR2Z3UYCLOD3IPACJXXSBWPPULDMZ3UUS3VUB7BB5MGQMC54F2MMWWS \
  ALLOWED_ACCOUNTS=GAZQFKRTG2LBDG5ARWL4MZ2QLNVZYQHRR7K7RPH2BQAPTSF7MXOMVWXO \
  JWT_SECRET=secret \
  node index.js
```

## Configuring the client

```
  CLIENT_PRIVATE_KEY=SDY7TC3KMMNP25QMEKQJTQUNXJCDHYXUTWAELRN2HKXHF2BDD5JDOTBJ node client.js
```
