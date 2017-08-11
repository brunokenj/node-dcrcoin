# node-dcrcoin

node-dcrcoin is a simple wrapper for the dcrd and dcrwallet client's JSON-RPC API.

## Install

`npm install node-dcr-rpc`

## Examples

### Create DCRD client
```js
var dcrd = new dcrcoin.Client({
  host: '127.0.0.1',
  port: 19109, // testnet default port
  user: '',
  pass: '',
  ssl: true
  //,sslCa: fs.readFileSync('~/.dcrd/rpc.cert')
});
```

### Get Info with Method

```js
dcrd.getinfo(function(err, info){
  if (err) return console.log(err);
  console.log('getinfo:', info);
});
```

### Get Info with Command

```js
dcrd.cmd('getinfo', function(err, info){
  if (err) return console.log(err);
  console.log('getinfo:', info);
});
```

### Create Wallet client
```js
var dcrwallet = new dcrcoin.Client({
  host: '127.0.0.1',
  port: 19110, // testnet walltet default port
  user: '',
  pass: '',
  ssl: true
  //,sslCa: fs.readFileSync('~/.dcrd/rpc.cert')
});
```

### Generate New Account and Address

```js
var accountName = "bk_dcr_wallet"
dcrwallet.cmd('createnewaccount', accountName, function(err, wallets){
  if (err) return console.log(err);
  console.log('createenwaccount:', "true");
  dcrwallet.cmd('getnewaddress', accountName, function(err, address){
    if (err) return console.log(err);
    console.log('getnewaddress:', address);
  });
});
```

### List All Accounts

```js
dcrwallet.cmd('listaccounts', function(err, wallets){
  if (err) return console.log(err);
  console.log('listaccounts:', wallets);
});
```

### Using DCRD and DCRWALLET in same Client

```js
var dcrdAndDcrWallet = new dcrcoin.Client({
  host: '127.0.0.1',
  dcrdPort: 19109, // dcrd port
  dcrWalletPort: 19110, // dcrwallet port
  user: 'brunokenj',
  pass: 'J6BINJBX5pCnrr1P5RO87na3DNLPsvv/',
  ssl: true
  //,sslCa: fs.readFileSync('~/.dcrd/rpc.cert')
});

dcrdAndDcrWallet.getinfo(function(err, info) {
  if (err) return console.log(err);
  console.log('info:', info);
});

dcrdAndDcrWallet.wallet.listaccounts(function (err, accounts) {
  if (err) return console.log(err);
  console.log('listaccounts:', accounts);
});
```

## Forked
forked from brunokenj/node-ethcoin