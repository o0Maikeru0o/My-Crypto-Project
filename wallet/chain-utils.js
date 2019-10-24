const EC = require('elliptic').ec;
const uuidV1 = require('uuid/v1');

const ec = new EC('secp256k1');

class ChainUtils {
  static genKeyPair() {
    return ec.genKeyPair();
  }

  static genId() {
    return uuidV1();
  }
}

module.exports = {
  ChainUtils,
};
