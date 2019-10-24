const Transaction = require('./transaction');
const Wallet = require('./index');

describe('Transaction', () => {
  let transaction;
  let wallet;
  let recipient;
  let amount;

  beforeEach(() => {
    wallet = new Wallet();
    amount = 50;
  });
});
