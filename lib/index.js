var commands = require('./dcr_api'),
    commandsWallet = require('./dcrwallet_api'),
    commandsDeprecated = require('./commands_deprecated'),
    rpc = require('./jsonrpc');

    var self;

//===----------------------------------------------------------------------===//
// Client
//===----------------------------------------------------------------------===//
function Client(opts) {
  this.rpc = new rpc.Client(opts);
  self = this;
}


//===----------------------------------------------------------------------===//
// cmd
//===----------------------------------------------------------------------===//
Client.prototype.cmd = function() {
  var args = [].slice.call(arguments);
  var cmd = args.shift();
  // Check if Wallet parameter is first
  if (cmd == 'wallet') {
      cmd = args.shift();
      callRpcWallet(cmd, args, this.rpc);      
  } else {
    callRpc(cmd, args, this.rpc);
  }
}


//===----------------------------------------------------------------------===//
// callRpc
//===----------------------------------------------------------------------===//
function callRpc(cmd, args, rpc) {
  var fn = args[args.length-1];

  // If the last function is a callback, pop it from the args list
  if(typeof fn === 'function') {
    args.pop();
  } else {
    fn = function() {};
  }

  rpc.call(cmd, args, function(){
    var args = [].slice.call(arguments);
    args.unshift(null);
    fn.apply(this, args);
  }, function(err){
    fn(err);
  });
}


//===----------------------------------------------------------------------===//
// callRpc Wallet
//===----------------------------------------------------------------------===//
function callRpcWallet(cmd, args, rpc) {
  var fn = args[args.length-1];

  // If the last function is a callback, pop it from the args list
  if(typeof fn === 'function') {
    args.pop();
  } else {
    fn = function() {};
  }

  rpc.callWallet(cmd, args, function(){
    var args = [].slice.call(arguments);
    args.unshift(null);
    fn.apply(this, args);
  }, function(err){
    fn(err);
  });
}

//===----------------------------------------------------------------------===//
// Initialize wrappers
//===----------------------------------------------------------------------===//
(function() {
  
  var getWrapper = function(protoFn, deprecated) {
    var command = deprecated ? commandsDeprecated[protoFn] : commands[protoFn];
    return function() {
      if (deprecated) {
        deprecate(protoFn + ' is deprecated');
      }
      var args = [].slice.call(arguments);
      callRpc(command, args, this.rpc);
    };
  };

  var getWrapperWallet = function(protoFn, deprecated) {
    var command = deprecated ? commandsDeprecated[protoFn] : commandsWallet[protoFn];
    return function() {
      if (deprecated) {
        deprecate(protoFn + ' is deprecated');
      }
      var args = [].slice.call(arguments);
      callRpcWallet(command, args, self.rpc);
    };
  };
  
  for (var protoFn in commands) {
    Client.prototype[protoFn] = getWrapper(protoFn, false);
  }
  
  Client.prototype.wallet = {};

  for (var protoFn in commandsWallet) {
    Client.prototype.wallet[protoFn] = getWrapperWallet(protoFn, false);      
  }
  
  for (var protoFn in commandsDeprecated) {
    Client.prototype[protoFn] = getWrapper(protoFn, true);
  }
  
})();

// Export!
module.exports.Client = Client;