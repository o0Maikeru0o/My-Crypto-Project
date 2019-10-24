const ChainUtils = require('./chain-utils.js');

class Transaction {
  constructor() {
    this.id = ChainUtils.id();
    this.input = null;
    this.outputs = [];
  }

  static newTranscation(senderWallet, recipient, amount) {
    const transaction = new this();
    if (amount > senderWallet.balance) {
      return console.log(`Amount : ${amount} exceeds the available balance`);
    }
    return transaction.outputs.push(...[
      { amount: senderWallet.balance - amount, address: senderWallet.publicKey },
      { amount, address: recipient },
    ]);
  }
}

module.exports = {
  Transaction,
};
