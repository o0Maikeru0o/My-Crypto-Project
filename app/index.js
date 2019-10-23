const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const Blockchain = require('../blockchain/blockchain');
const P2P_Server = require('./p2p-server.js');

const app = express();
const HTTP_PORT = process.env.HTTP_PORT || 3001;
const blockchain = new Blockchain();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger('combined'));
app.listen(HTTP_PORT, () => {
  console.log(`listening on port ${HTTP_PORT}`);
});
