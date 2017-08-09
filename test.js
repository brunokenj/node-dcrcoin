var dcrcoin = require('./lib');
var fs = require('fs');

var dcrd = new dcrcoin.Client({
  host: '127.0.0.1',
  port: 19109, // testnet default port
  user: 'brunokenj',
  pass: 'J6BINJBX5pCnrr1P5RO87na3DNLPsvv/',
  ssl: true
  //,sslCa: fs.readFileSync('~/.dcrd/rpc.cert')
});

dcrd.cmd('getinfo', function(err, info){
  if (err) return console.log(err);
  console.log('getinfo:', info);
});

var dcrwallet = new dcrcoin.Client({
  host: '127.0.0.1',
  port: 19110, // testnet wallet default port
  user: 'brunokenj',
  pass: 'J6BINJBX5pCnrr1P5RO87na3DNLPsvv/',
  ssl: true
  //,sslCa: fs.readFileSync('~/.dcrd/rpc.cert')
});

var accountName = Date.now().toString();
dcrwallet.cmd('createnewaccount', accountName, function(err, wallets){
  if (err) return console.log(err);
  console.log('createenwaccount:', "true");
  dcrwallet.cmd('getnewaddress', accountName, function(err, address){
    if (err) return console.log(err);
    console.log('getnewaddress:', address);
  });
});

dcrwallet.cmd('listaccounts', function(err, wallets){
  if (err) return console.log(err);
  console.log('listaccounts:', wallets);
});