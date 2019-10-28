/* eslint-disable camelcase */
const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const Blockchain = require('../blockchain/blockchain');
const Wallet = require('../wallet');
const TransactionPool = require('../wallet/transaction-pool');
const Miner = require('./miner');

const P2P_Server = require('./p2p-server.js');

const app = express();
const HTTP_PORT = process.env.HTTP_PORT || 3001;
const blockchain = new Blockchain();
const wallet = new Wallet();
const transactionPool = new TransactionPool();
const p2pServer = new P2P_Server(blockchain, transactionPool);
const miner = new Miner(
  blockchain,
  transactionPool,
  wallet,
  p2pServer,
);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger('combined'));

// Retreive all blocks in the chain
app.get('/blocks', (req, res) => {
  res.status(200).send(blockchain.chain);
});

// Mine a new block
app.post('/mine', (req, res) => {
  const block = blockchain.addBlock(req.body.data);
  console.log(`New block added ${block.showBlock()}`);
  res.status(201).send(blockchain.chain);
  p2pServer.syncChain();
});

// Retreive current transations
app.get('/transactions', (req, res) => {
  res.json(transactionPool.transactions);
});

// Create a transaction
app.post('/transact', (req, res) => {
  const { recipient, amount } = req.body;
  const transaction = wallet.createTransaction(
    recipient,
    amount,
    blockchain,
    transactionPool,
  );
  p2pServer.broadcastTransaction(transaction);
  res.redirect('/transactions');
});

// Retreive the public key for a wallet
app.get('/public-key', (req, res) => {
  res.json({ publicKey: wallet.publicKey });
});

// Add all valid transactions in the pool to a new block
app.get('/mine-transactions', (req, res) => {
  const block = miner.mine();
  console.log(`New block added: ${block.toString()}`);
  res.redirect('/blocks');
});

// app server configurations
app.listen(HTTP_PORT, () => {
  console.log(`listening on port ${HTTP_PORT}`);
});

// p2p server configuration
p2pServer.listen();
