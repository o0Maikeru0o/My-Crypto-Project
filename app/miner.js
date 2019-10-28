const Blockchain = require('../blockchain/blockchain');
const Wallet = require('../wallet');
const Transaction = require('../wallet/transaction');
const TransactionPool = require('../wallet/transaction-pool');
const P2P_Server = require('./p2p-server.js');

class Miner {
  constructor() {
    this.transactions = [];
  }

  validTransactions() {
    return this.transactions.forEach((transaction) => {
      const outputTotal = transaction.outputs.reduce((total, output) => total + output.amount, 0);

      if (transaction.input.amount !== outputTotal) {
        return console.log(`Invalid transaction from ${transaction.input.address}`);
      }

      if (!Transaction.verifyTransaction(transaction)) {
        return console.log(`Invalid signature from ${transaction.input.address}`);
      }
      return transaction;
    });
  }
}

module.exports = Miner;
