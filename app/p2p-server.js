/* eslint-disable camelcase */
const WebSocket = require('ws');
const uuidv1 = require('uuid/v1');

const P2P_PORT = process.env.P2P_PORT || 5001;
const peers = process.env.PEERS ? process.env.PEERS.split(',') : [];

const MESSAGE_TYPE = {
  chain: 'CHAIN',
  transaction: 'TRANSACTION',
  clear_transactions: 'CLEAR_TRANSACTIONS',
};

class P2P_Server {
  constructor(blockchain, transactionPool) {
    this.blockchain = blockchain;
    this.sockets = [];
    this.transactionPool = transactionPool;
    this.wss = new WebSocket.Server({ port: P2P_PORT });
  }

  // Listen for all incoming connections
  listen() {
    this.wss.on('connection', (socket) => this.connectSocket(socket));
    this.connectToPeers();
    console.log(`Listening for peer to peer connection on port : ${P2P_PORT}`);
  }

  // Connect sockets, assign them to message hanlder and send current chain
  connectSocket(socket) {
    this.sockets.push(socket);
    console.log(`Connected to socket ${socket.id}`);
    this.messageHandler(socket);
    this.sendChain(socket);
  }

  // Assign a new socket for each new peer
  connectToPeers() {
    peers.forEach((peer) => {
      const socket = new WebSocket(peer);
      socket.id = uuidv1();
      socket.on('open', () => this.connectSocket(socket));
    });
  }

  // Choose which action to take based upon the message type
  messageHandler(socket) {
    socket.on('message', (message) => {
      const data = JSON.parse(message);
      const { type } = data;
      console.log('data', data);

      if (type === MESSAGE_TYPE.chain) {
        this.blockchain.updateChain(data.chain);
      } else if (type === MESSAGE_TYPE.transaction) {
        this.transactionPool.addOrUpdateTransaction(data.transaction);
      } else if (type === MESSAGE_TYPE.clear_transactions) {
        this.transactionPool.clear();
      }
    });
  }

  sendChain(socket) {
    socket.send(JSON.stringify({
      type: MESSAGE_TYPE.chain,
      chain: this.blockchain.chain,
    }));
  }

  // Sync chain whenever a new block is added
  syncChain() {
    this.sockets.forEach((socket) => {
      this.sendChain(socket);
    });
  }

  broadcastTransaction(transaction) {
    this.sockets.forEach((socket) => {
      this.sendTransaction(socket, transaction);
    });
  }

  sendTransaction(socket, transaction) {
    socket.send(JSON.stringify({
      type: MESSAGE_TYPE.transaction,
      transaction,
    }));
  }

  broadcastClearTransactions() {
    this.sockets.forEach((socket) => {
      socket.send(JSON.stringify({
        type: MESSAGE_TYPE.clear_transactions,
      }));
    });
  }
}
module.exports = P2P_Server;
