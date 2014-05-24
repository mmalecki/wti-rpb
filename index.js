var util = require('util');
var Readable = require('stream').Readable;

var RemotePowerBoot = module.exports = function () {
  Readable.call(this);
};
util.inherits(RemotePowerBoot, Readable);

RemotePowerBoot.prototype._sendCommand = function (command) {
  this._push('\x02\x18\x18\x02\x02\x02' + String.fromCharCode(command) + '\r');
};

RemotePowerBoot.prototype.toggle = function (outlet) {
  // Commands for toggling outlets start from 1. Bring back the zero-indexed
  // sanity.
  this._sendCommand(outlet - 1);
};

RemotePowerBoot.prototype.rebootAll = function () {
  this._sendCommand(9);
};
