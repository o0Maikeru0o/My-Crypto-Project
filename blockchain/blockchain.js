const Block = require('./block');

class Blockchain {
  constructor() {
    this.chain = [Block.genesis()];
  }

  mostRecentBlock() {
    return this.chain[this.chain.length - 1];
  }

  addBlock(data) {
    const newBlock = Block.mineBlock(this.chain[this.chain.length - 1], data);
    this.chain.push(newBlock);
    return newBlock;
  }
}

module.exports = Blockchain;
