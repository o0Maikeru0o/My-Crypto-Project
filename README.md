# My-Blockchain
A blockchain project with a decentralized P2P server in Node.js and Bitcoin like cryptocurrency

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.



### Prerequisites

No prerequisites necessary if running in Node.js

### Installing

Run command `NPM install` from the console in this application's directory to install Node module dependencies

Run command `NPM start` from the console in this application's directory to start the Express server with Nodemon monitoring changes.

-This will also create a new node in the P2P server.

-The default port for the server is 3001

-The default port for the P2P node is 5001

-To create a new peer locally open another treminal winder and set ports as environmental variables to HTTP_PORT, P2P_PORT and PEERS to the local host websocket

  Ex. HTTP_PORT=3002; export P2P_PORT=5002; export PEERS=ws://localhost:5001


## Running the tests

Run command `NPM test` to begin unit tests with Jest

## API End points

// Retreive all blocks in the chain

  Get to '/blocks'

// Mine a new block

  Post to '/mine'

  -Include data in the body object ie. {"data": "some data"}

// Retreive current transations

  Get to '/transactions'

// Retreive the public key for a wallet

  Get to '/public-key'

  GET `http://127.0.0.1:3002/public-key`

  -Response

  {
  
      "publicKey": "040d5bc70a741c5dde2ce5cc7c9a67ff2ffdd32bbf6b9bed5b626fe5d9899f2d6945a4f7ef7934ca1dd18edc5c90c5e170c149174d9596e18c3369c207415b5cd4"
  }

// Create a transaction

  Post '/transact'
  
  POST `http://127.0.0.1:3001/transact`

  -body JSON

   {
   
   "recipient": "040d5bc70a741c5dde2ce5cc7c9a67ff2ffdd32bbf6b9bed5b626fe5d9899f2d6945a4f7ef7934ca1dd18edc5c90c5e170c149174d9596e18c3369c207415b5cd4",
 
  "amount": 50
  
  }

  -response

    [
      {
          "id": "4d6ad720-f99d-11e9-b790-277e93961e91",
          "input": {
              "timestamp": 1572278961555,
              "amount": 1000,
              "address": "041f454f1e87860745e077a8ff42be92d8aca50c6686ae426cfe3e2c04a5c0e4f84ff5c56c02f28d8f40e3e17e2f859d32d16af0ee8e4327b758bdb5c485884661",
              "signature": {
                  "r": "791f441b53f3b10110676d266f14053da4e6e88c1803bf758f308cb5555f7d15",
                  "s": "9fea7e66b72362cc6c5387cf4de1766967937f94d10bef3d06b7aff8bd558ef4",
                  "recoveryParam": 0
              }
          },
          "outputs": [
              {
                  "amount": 950,
                  "address": "041f454f1e87860745e077a8ff42be92d8aca50c6686ae426cfe3e2c04a5c0e4f84ff5c56c02f28d8f40e3e17e2f859d32d16af0ee8e4327b758bdb5c485884661"
              },
              {
                  "amount": 50,
                  "address": "040d5bc70a741c5dde2ce5cc7c9a67ff2ffdd32bbf6b9bed5b626fe5d9899f2d6945a4f7ef7934ca1dd18edc5c90c5e170c149174d9596e18c3369c207415b5cd4"
              }
          ]
      }
  ]

  // Mine all valid transactions in the pool to a new block

  Get '/mine-transactions'

  -Response

  [
      {
          "timestamp": "Genesis time",
          
          "prevHash": "----",
          
          "hash": "ec4a6-a9412",
          
          "data": [],
          
          "nonce": 0,
          
          "difficulty": 4
      },
      {
          "timestamp": 1572278969082,
          
          "prevHash": "ec4a6-a9412",
          
          "hash": "00000ed0f5f4f4c525fcaaca2c8f45ec735be74f1dfedd0b0db257891686cb60",
          
          "data": [
          
              {
                  "id": "4d6ad720-f99d-11e9-b790-277e93961e91",
                  
                  "input": {
                  
                      "timestamp": 1572278961555,
                      
                      "amount": 1000,
                      
                      "address": "041f454f1e87860745e077a8ff42be92d8aca50c6686ae426cfe3e2c04a5c0e4f84ff5c56c02f28d8f40e3e17e2f859d32d16af0ee8e4327b758bdb5c485884661",
                     
                     "signature": {
                     
                          "r": "791f441b53f3b10110676d266f14053da4e6e88c1803bf758f308cb5555f7d15",
                          
                          "s": "9fea7e66b72362cc6c5387cf4de1766967937f94d10bef3d06b7aff8bd558ef4",
                          
                          "recoveryParam": 0
                      }
                      
                  },
                  
                  "outputs": [
                  
                      {
                      
                          "amount": 950,
                          
                          "address": "041f454f1e87860745e077a8ff42be92d8aca50c6686ae426cfe3e2c04a5c0e4f84ff5c56c02f28d8f40e3e17e2f859d32d16af0ee8e4327b758bdb5c485884661"
                      },
                      
                      {
                      
                          "amount": 50,
                          
                          "address": "040d5bc70a741c5dde2ce5cc7c9a67ff2ffdd32bbf6b9bed5b626fe5d9899f2d6945a4f7ef7934ca1dd18edc5c90c5e170c149174d9596e18c3369c207415b5cd4"
                      }
                      
                  ]
                  
              },
              
              {
              
                  "id": "51df4840-f99d-11e9-8c5a-c14342e6f55b",
                  
                  "input": {
                  
                      "timestamp": 1572278969028,
                      
                      "amount": 1000,
                      
                      "address": "0420b059c651105b37545021cdccb946accd389fb24bed847032515bb85907db62e631ecc318cab9ac3485dff55614fb569448612186bfd95aeac95bff677574dc",
                     
                     "signature": {
                         
                       "r": "e8466590ce6db7195e56297ba6880cc6137a62c4556201fd8683c2293e424bb",
                       
                       "s": "a4a4598db6779e5d5a882352238f19ed2fcf141312aff049f7041fee1a3a8d2e",
                          
                       "recoveryParam": 0
                       
                      }
                      
                  },
                  
                  "outputs": [
                  
                      {
                      
                          "amount": {
                          
                              "MINE_RATE": 60000,
                              
                              "DIFFICULTY": 4,
                              
                              "INITIAL_BALANCE": 1000,
                              
                              "MINING_REWARD": 50
                              
                          },
                          
                          "address": "0426d2d696c6267292042358e0dff2ac6f566e44cedccfe3cee75ccc908c4e6466afd1d484fb27d11416ec61fdbe0da35689aad8898543b6daf4a13a587f0fb97b"
                      }
                      
                  ]
                  
              }
              
          ],
          
          "nonce": 298,
          
          "difficulty": 3
          
      }
      
  ]

## Configuration

All initialization variables can be found in the config.js file
