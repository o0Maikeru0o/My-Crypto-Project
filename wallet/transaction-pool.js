const Transaction = require('../wallet/transaction');

class TransactionPool {
  constructor() {
    this.transactions = [];
  }

  addOrUpdateTransaction(transaction) {
    // get the transaction while checking if it exists
    const transactionWithId = this.transactions.find((t) => t.id === transaction.id);

    if (transactionWithId) {
      this.transactions[this.transactions.indexOf(transactionWithId)] = transaction;
    } else {
      this.transactions.push(transaction);
    }
  }

  checkForExistingTransaction(address) {
    return this.transactions.find((t) => t.input.address === address);
  }

  validTransactions() {
    return this.transactions.filter((transaction) => {
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

  clear() {
    this.transactions = [];
  }
}

module.exports = TransactionPool;
