const SHA256 = require('crypto-js/sha256');

class Block {
  constructor(timestamp, prevHash, hash, data) {
    this.timestamp = timestamp;
    this.prevHash = prevHash;
    this.hash = hash;
    this.data = data;
  }

  showBlock() {
    return `Block -
      Timestamp : ${this.timestamp}
      prev Hash : ${this.prevHash}
      Hash      : ${this.hash}
      Data      : ${this.data}`;
  }

  static genesis() {
    return new this('genesis date', 'genesis-prevHash', 'genesis-hash', []);
  }
}

module.exports = Block;
