/* eslint-disable no-undef */
const Blockchain = require('../blockchain');
const Block = require('../block');

describe('Blockchain', () => {
  let blockchain;
  let blockchain2;

  beforeEach(() => {
    blockchain = new Blockchain();
    blockchain2 = new Blockchain();
  });

  it('begins with the genesis block', () => {
    expect(blockchain.chain[0]).toEqual(Block.genesis());
  });

  it('adds a new block to the chain', () => {
    const data = 'some data';
    blockchain.addBlock(data);
    expect(blockchain.chain[blockchain.chain.length - 1].data).toEqual(data);
  });

  it('validates a valid chain', () => {
    blockchain2.addBlock('some data');
    expect(blockchain.isValidChain(blockchain2.chain)).toBe(true);
  });

  it('invalidates a chain with a corrupt the genesis block', () => {
    blockchain2.chain[0].data = 'corrupt data';
    expect(blockchain.isValidChain(blockchain2.chain)).toBe(false);
  });

  it('invalidates a corrput chain', () => {
    blockchain2.addBlock('some data');
    blockchain2.chain[1].data = 'not some data';
    expect(blockchain.isValidChain(blockchain2.chain)).toBe(false);
  });

  it('it updates the chain with a valid chain', () => {
    blockchain2.addBlock('some more data');
    blockchain.updateChain(blockchain2.chain);
    expect(blockchain.chain).toEqual(blockchain2.chain);
  });

  it('does NOT update the chain with one that is less than or equal to chain', () => {
    blockchain.addBlock('some data');
    blockchain.updateChain(blockchain2.chain);
    expect(blockchain.chain).not.toEqual(blockchain2.chain);
  });
});
