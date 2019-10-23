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

  isValidChain(chain) {
    if (JSON.stringify(chain[0]) !== JSON.stringify(Block.genesis())) { return false; }

    for (let i = 1; i < chain.length; i++) {
      const currBlock = chain[i];
      const preBlock = chain[i - 1];
      if ((currBlock.hash !== Block.getBlockHash(currBlock)) || (
        currBlock.prevHash !== preBlock.hash
      )) {
        return false;
      }
    }
    return true;
  }
}

module.exports = Blockchain;
