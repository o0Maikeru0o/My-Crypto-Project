
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

  clear() {
    this.transactions = [];
  }
}

module.exports = TransactionPool;
