/* eslint-disable no-undef */
const Block = require('../block');

describe('Block', () => {
  let data; let prevBlock; let block;

  beforeEach(() => {
    data = 'test data';
    prevBlock = Block.genesis();
    block = Block.mineBlock(prevBlock, data);
  });

  it('defines the data from the input', () => {
    expect(block.data).toEqual(data);
  });

  it('defines the prevHash to match the hash from the previous block', () => {
    expect(block.prevHash).toEqual(prevBlock.hash);
  });

  it('it calculates a hash to match the difficulty', () => {
    expect(block.hash.substring(0, block.difficulty)).toEqual('0'.repeat(block.difficulty));
  });

  it('increases the difficulty if the time to mine is less than the set rate', () => {
    expect(Block.adjustDifficulty(block, block.timestamp - 200000, 300000))
      .toEqual(block.difficulty + 1);
  });

  it('decreases the difficulty if the time to mine is greater than the set rate', () => {
    expect(Block.adjustDifficulty(block, block.timestamp + 400000, 300000))
      .toEqual(block.difficulty - 1);
  });
});
