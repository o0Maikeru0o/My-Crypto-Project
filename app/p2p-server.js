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


  listen() {
    this.wss.on('connection', (socket) => this.connectSocket(socket));
    this.connectToPeers();
    console.log(`Listening for peer to peer connection on port : ${P2P_PORT}`);
  }

  connectSocket(socket) {
    this.sockets.push(socket);
    console.log(`Connected to socket ${socket.id}`);
    this.messageHandler(socket);
    this.sendChain(socket);
  }

  connectToPeers() {
    peers.forEach((peer) => {
      const socket = new WebSocket(peer);
      socket.id = uuidv1();
      socket.on('open', () => this.connectSocket(socket));
    });
  }

  messageHandler(socket) {
    socket.on('message', (message) => {
      const data = JSON.parse(message);
      console.log('data', data);

      if (data.type === MESSAGE_TYPE.chain) {
        this.blockchain.updateChain(data.chain);
      } else if (data.type === MESSAGE_TYPE.transaction) {
        this.transactionPool.addOrUpdateTransaction(data.transaction);
      }
    });
  }

  sendChain(socket) {
    socket.send(JSON.stringify({
      type: MESSAGE_TYPE.chain,
      chain: this.blockchain.chain,
    }));
  }

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
}
module.exports = P2P_Server;
