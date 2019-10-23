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

  static hash(timestamp, prevHash, data) {
    return SHA256(`${timestamp}${prevHash}${data}`).toString();
  }

  static mineBlock(prevBlock, data) {
    const timestamp = Date.now();
    const prevHash = prevBlock.hash;
    const hash = Block.hash(timestamp, prevHash, data);
    return new this(timestamp, prevHash, hash, data);
  }

  static getBlockHash(block) {
    const { timestamp, prevHash, data } = block;
    return Block.hash(timestamp, prevHash, data);
  }
}

module.exports = Block;
