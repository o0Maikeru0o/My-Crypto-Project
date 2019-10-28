const ChainUtils = require('./chain-utils.js');
const MINING_REWARD = require('../config');

class Transaction {
  constructor() {
    this.id = ChainUtils.genId();
    this.input = null;
    this.outputs = [];
  }

  update(senderWallet, recipient, amount) {
    const senderOutput = this.outputs.find((output) => output.address === senderWallet.publicKey);

    if (amount > senderWallet.balance) {
      return console.log(`Amount : ${amount} exceeds the available balance`);
    }

    senderOutput.amount -= amount;
    this.outputs.push({ amount, address: recipient });
    Transaction.signTransaction(this, senderWallet);

    return this;
  }

  static newTransaction(senderWallet, recipient, amount) {
    if (amount > senderWallet.balance) {
      return console.log(`Amount : ${amount} exceeds the available balance`);
    }
    return Transaction.transactionWithOutputs(senderWallet, [
      { amount: senderWallet.balance - amount, address: senderWallet.publicKey },
      { amount, address: recipient },
    ]);
  }

  static transactionWithOutputs(senderWallet, outputs) {
    const transaction = new this();
    transaction.outputs.push(...outputs);
    Transaction.signTransaction(transaction, senderWallet);
    return transaction;
  }

  static signTransaction(transaction, senderWallet) {
    const signedTransaction = transaction;
    signedTransaction.input = {
      timestamp: Date.now(),
      amount: senderWallet.balance,
      address: senderWallet.publicKey,
      signature: senderWallet.sign(ChainUtils.hash(transaction.outputs)),
    };
    return signedTransaction;
  }

  static verifyTransaction(transaction) {
    return ChainUtils.verifySignature(
      transaction.input.address,
      transaction.input.signature,
      ChainUtils.hash(transaction.outputs),
    );
  }

  static rewardTransaction(minerWallet, blockchainWallet) {
    return Transaction.transactionWithOutputs(
      blockchainWallet, [{
        amount: MINING_REWARD,
        address: minerWallet.publicKey,
      }],
    );
  }
}

module.exports = Transaction;
