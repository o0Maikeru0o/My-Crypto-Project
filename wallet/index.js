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

  createTransaction(recipient, amount, blockchain, transactionPool) {
    this.balance = this.calculateBalance(blockchain);

    if (amount > this.balance) {
      return console.log(`Amount : ${amount} exceeds the available balance`);
    }

    let transaction = transactionPool.checkForExistingTransaction(this.publicKey);
    if (transaction) {
      transaction.update(this, recipient, amount);
    } else {
      transaction = Transaction.newTransaction(this, recipient, amount);
      transactionPool.addOrUpdateTransaction(transaction);
    }
    return transaction;
  }

  calculateBalance(blockchain) {
    // store the existing balance
    let { balance } = this;

    // create an array of transactions
    const transactions = [];
    blockchain.chain.forEach((block) => block.data.forEach((transaction) => {
      transactions.push(transaction);
    }));

    const walletInputTransactions = transactions.filter(
      (transaction) => transaction.input.address === this.publicKey,
    );

    let startTime = 0;

    if (walletInputTransactions.length > 0) {
      const recentInputTransaction = walletInputTransactions.reduce(
        (prev, curr) => (prev.input.timestamp > curr.input.timestamp ? prev : curr),
      );

      balance = recentInputTransaction.outputs.find(
        (output) => output.address === this.publicKey,
      ).amount;

      startTime = recentInputTransaction.input.timestamp;
    }

    transactions.forEach((transaction) => {
      if (transaction.input.timestamp > startTime) {
        transaction.outputs.forEach((output) => {
          if (output.address === this.publicKey) {
            balance += output.amount;
          }
        });
      }
    });
    return balance;
  }

  static blockchainWallet() {
    const blockchainWallet = new this();
    blockchainWallet.address = 'blockchain-wallet';
    return blockchainWallet;
  }
}

module.exports = Wallet;
