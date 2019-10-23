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
});
