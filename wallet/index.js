const { INITIAL_BALANCE } = require('../config');
const ChainUtils = require('./chain-utils.js');
const Transaction = require('./transaction');

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

  createTransaction(recipient, amount, transactionPool) {
    if (amount > this.balance) {
      return console.log(`Amount : ${amount} exceeds the available balance`);
    }

    let transaction = transactionPool.checkForExistingTransaction(this.publicKey);

    if (transaction) {
      Transaction.update(this, recipient, amount);
    } else {
      transaction = Transaction.newTransaction(this, recipient, amount);
      transactionPool.addOrUpdateTransaction(transaction);
    } return transaction;
  }
}

module.exports = Wallet;
