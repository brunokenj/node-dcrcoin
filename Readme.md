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

### Get Info

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

## Forked
forked from brunokenj/node-ethcoin