/* eslint-disable no-undef */
const TransactionPool = require('../transaction-pool');
// const Transaction = require('../transaction');
const Wallet = require('../index');

describe('Transaction Pool', () => {
  let transactionPool;
  let wallet;
  let transaction;

  beforeEach(() => {
    transactionPool = new TransactionPool();
    wallet = new Wallet();
    transaction = wallet.createTransaction('some-adress', 50, transactionPool);
  });

  it('adds a transaction to the pool', () => {
    expect(transactionPool.transactions.find((t) => t.id === transaction.id)).toEqual(transaction);
  });

  it('updates a transaction in the pool', () => {
    const oldTransaction = JSON.stringify(transaction);
    newTransaction = transaction.update(wallet, 'some-other-address', 40);
    transactionPool.addOrUpdateTransaction(newTransaction);
    expect(JSON.stringify(transactionPool.transactions.find((t) => t.id === transaction.id)))
      .not.toEqual(oldTransaction);
  });
});
