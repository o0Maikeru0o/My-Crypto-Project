const EC = require('elliptic').ec;
const uuidV1 = require('uuid/v1');
const SHA256 = require('crypto-js/sha256');

const ec = new EC('secp256k1');

class ChainUtils {
  static genKeyPair() {
    return ec.genKeyPair();
  }

  static genId() {
    return uuidV1();
  }

  static hash(data) {
    return SHA256(JSON.stringify(data)).toString();
  }
}

module.exports = {
  ChainUtils,
};
