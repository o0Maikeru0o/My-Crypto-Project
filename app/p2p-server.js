/* eslint-disable camelcase */
const WebSocket = require('ws');
const uuidv4 = require('uuid/v4');

const P2P_PORT = process.env.P2P_PORT || 5001;
const peers = process.env.PEERS ? process.env.PEERS.split(',') : [];

class P2P_Server {
  constructor(blockchain) {
    this.blockchain = blockchain;
    this.sockets = [];
  }


  listen() {
    const wss = new WebSocket.Server({ port: P2P_PORT });
    wss.on('connection', (socket) => { socket.id = uuidv4(); this.connectSocket(socket); });
    this.connectToPeers();
    console.log(`Listening for peer to peer connection on port : ${P2P_PORT}`);
  }
}
module.exports = P2P_Server;
