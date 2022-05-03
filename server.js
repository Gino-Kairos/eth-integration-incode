//Dependencies
const express = require("express");
const routes = require("./routes");
const Web3 = require("web3");
const contract = require("@truffle/contract");
var artifacts = require("./build/Inbox.json");

//APP - instance
const app = express();
const {
  logErrors,
  errorHandler,
  boomErrorHandler,
} = require("./middlewares/error.handler");
const req = require("express/lib/request");

//Databases
require("./db/mongo");

//App config and middlewares
app.use(express.json());

var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

const LMS = contract(artifacts);

async function connectChain() {
  LMS.setProvider(web3.currentProvider);
  req.accounts = await web3.eth.getAccounts();
  req.lms = await LMS.deployed();
}

connectChain();
routes(app);

app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

//export module
module.exports = app;
