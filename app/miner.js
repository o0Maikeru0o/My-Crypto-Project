/* eslint-disable camelcase */

const Wallet = require('../wallet');
const Transaction = require('../wallet/transaction');
const MINING_REWARD = require('../config');

class Miner {
  constructor(blockchain, transactionPool, wallet, P2P_Server) {
    this.blockchain = blockchain;
    this.P2P_Server = P2P_Server;
    this.wallet = wallet;
    this.transactionPool = transactionPool;
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

module.exports = Miner;
