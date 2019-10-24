const ChainUtils = require('./chain-utils.js');

class Transaction {
  constructor() {
    this.id = ChainUtils.genId();
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

  static signTransaction(transaction, senderWallet) {
    const signedTransaction = transaction;
    signedTransaction.input = {
      timestamp: Date.Now(),
      amount: senderWallet,
      address: senderWallet.publicKey,
      signature: senderWallet.sign(ChainUtils.hash(transaction.outputs)),
    };
    return signedTransaction;
  }
}

module.exports = {
  Transaction,
};
