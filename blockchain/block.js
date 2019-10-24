const SHA256 = require('crypto-js/sha256');
const { MINE_RATE, DIFFICULTY } = require('./config.js');

class Block {
  constructor(timestamp, prevHash, hash, data, nonce, difficulty) {
    this.timestamp = timestamp;
    this.prevHash = prevHash;
    this.hash = hash;
    this.data = data;
    this.nonce = nonce;
    this.difficulty = difficulty || DIFFICULTY;
  }

  showBlock() {
    return `Block -
      Timestamp : ${this.timestamp}
      prev Hash : ${this.prevHash}
      Hash      : ${this.hash}
      Data      : ${this.data}
      Nonce     : ${this.nonce}
      Difficulty: ${this.difficulty}`;
  }

  static genesis() {
    return new this('genesis-date', 'genesis-prevHash', 'genesis-hash', [], 0, DIFFICULTY);
  }

  static hash(timestamp, prevHash, data, nonce) {
    return SHA256(`${timestamp}${prevHash}${data}${nonce}`).toString();
  }

  static adjustDifficulty(prevBlock, currentTime) {
    let { difficulty } = prevBlock;
    difficulty = prevBlock.timestamp + MINE_RATE > currentTime ? difficulty + 1 : difficulty - 1;
    return difficulty;
  }

  static mineBlock(prevBlock, data) {
    let timestamp;
    let hash;
    let nonce = 0;
    let { difficulty } = prevBlock;
    const prevHash = prevBlock.hash;

    do {
      nonce += 1;
      timestamp = Date.now();
      difficulty = this.adjustDifficulty(prevBlock, timestamp);
      hash = Block.hash(timestamp, prevHash, data, nonce, difficulty);
    } while (hash.substring(0, difficulty) !== '0'.repeat(difficulty));
    return new this(timestamp, prevHash, hash, data, nonce);
  }

  static getBlockHash(block) {
    const {
      timestamp, prevHash, data, nonce,
    } = block;
    return Block.hash(timestamp, prevHash, data, nonce);
  }
}

module.exports = Block;
