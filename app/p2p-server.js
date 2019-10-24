/* eslint-disable camelcase */
const WebSocket = require('ws');
const uuidv4 = require('uuid/v4');

const P2P_PORT = process.env.P2P_PORT || 5001;
const peers = process.env.PEERS ? process.env.PEERS.split(',') : [];

class P2P_Server {
  constructor(blockchain) {
    this.blockchain = blockchain;
    this.sockets = [];
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
      socket.id = uuidv4();
      socket.on('open', () => this.connectSocket(socket));
    });
  }

  messageHandler(socket) {
    socket.on('message', (message) => {
      const data = JSON.parse(message);
      console.log('data', data);
      this.blockchain.updateChain(data);
    });
  }

  sendChain(socket) {
    console.log('socket---------id', socket.id);
    socket.send(JSON.stringify(this.blockchain.chain));
  }

  syncChain() {
    this.sockets.forEach((socket) => {
      this.sendChain(socket);
    });
  }
}
module.exports = P2P_Server;
