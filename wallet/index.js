const { INITIAL_BALANCE } = require('../config');
const ChainUtils = require('./chain-utils.js');

class Wallet {
  constructor() {
    this.balance = INITIAL_BALANCE;
    this.keyPair = ChainUtils.genKeyPair();
    this.publicKey = this.keyPair.getPublic().encode('hex');
  }

  showWallet() {
    return `Wallet ---
    Public Key: ${this.publicKey.toString()}
    balance   : ${this.balance}`;
  }

  sign(dataHash) {
    return this.keyPair.sign(dataHash);
  }
}

module.exports = {
  Wallet,
};
