/* eslint-disable no-undef */
const Wallet = require('../index');
const TransactionPool = require('../transaction-pool');
const Blockchain = require('../../blockchain/blockchain');

const { INITIAL_BALANCE } = require('../../config');

describe('Wallet', () => {
  let wallet;
  let transactionPool;
  let blockchain;

  beforeEach(() => {
    wallet = new Wallet();
    transactionPool = new TransactionPool();
    blockchain = new Blockchain();
  });

  describe('while creating a transaction', () => {
    let transaction;
    let sendAmount;
    let recipient;

    beforeEach(() => {
      sendAmount = 50;
      recipient = 'some-address';
      transaction = wallet.createTransaction(recipient, sendAmount, blockchain, transactionPool);
    });

    describe(' and repeating the same transaction', () => {
      beforeEach(() => {
        wallet.createTransaction(recipient, sendAmount, blockchain, transactionPool);
      });

      it('doubles the `sendAmount` subtracted from the wallet balance', () => {
        expect(transaction.outputs.find((output) => output.address === wallet.publicKey).amount)
          .toEqual(wallet.balance - sendAmount * 2);
      });

      it('clones the `sendAmount` output for the transaction ', () => {
        expect(transaction.outputs.filter((output) => output.address === recipient)
          .map((output) => output.amount)).toEqual([sendAmount, sendAmount]);
      });
    });
  });

  describe('calculating the balance', () => {
    let addBalance;
    let repeatAdd;
    let senderWallet;

    beforeEach(() => {
      senderWallet = new Wallet();
      addBalance = 100;
      repeatAdd = 3;
      for (let i = 0; i < repeatAdd; i++) {
        senderWallet.createTransaction(wallet.publicKey, addBalance, blockchain, transactionPool);
      }
      blockchain.addBlock(transactionPool.transactions);
    });

    it('calculates the balance for the blockchain transactions matching the recipient', () => {
      expect(wallet.calculateBalance(blockchain))
        .toEqual(INITIAL_BALANCE + (addBalance * repeatAdd));
    });

    it('calculates the balance for the blockchain transactions matching the sender', () => {
      expect(senderWallet.calculateBalance(blockchain))
        .toEqual(INITIAL_BALANCE - (addBalance * repeatAdd));
    });

    describe('and the recipient conducts a transaction', () => {
      let subtractBalance;
      let recipientBalance;

      beforeEach(() => {
        transactionPool.clear();
        subtractBalance = 60;
        recipientBalance = wallet.calculateBalance(blockchain);
        wallet.createTransaction(senderWallet.publicKey,
          subtractBalance, blockchain, transactionPool);
        blockchain.addBlock(transactionPool.transactions);
      });

      describe('and the sender sends another transaction to the recipient', () => {
        beforeEach(() => {
          transactionPool.clear();
          senderWallet.createTransaction(wallet.publicKey, addBalance, blockchain, transactionPool);
          blockchain.addBlock(transactionPool.transactions);
        });

        it('calculates the recipient\'s balance only using transactions since its most recent one', () => {
          expect(wallet.calculateBalance(blockchain))
            .toEqual(recipientBalance - subtractBalance + addBalance);
        });
      });
    });
  });
});
