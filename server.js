//Dependencies
const express = require("express");
const Sentry = require("@sentry/node");
const Tracing = require("@sentry/tracing");
const Web3 = require("web3");
const contract = require("@truffle/contract");

//Artifacts
let artifacts = require("./build/Inbox.json");

//APP - instance
const app = express();
const routes = require("./routes");
const req = require("express/lib/request");
const {
  middleHandler,
  errorHandler,
  boomErrorHandler,
} = require("./middlewares/error.handler");

//Databases
require("./db/mongo");

//App config and middlewares
app.use(express.json());

//Sentry init
Sentry.init({
  dsn: process.env.SENTRY_PROJECT,
  integrations: [
    // enable HTTP calls tracing
    new Sentry.Integrations.Http({ tracing: true }),
    // enable Express.js middleware tracing
    new Tracing.Integrations.Express({ app }),
  ],
  tracesSampleRate: 1.0,
});

/* ------------------ SMART CHAIN INSTANCE -------------------------- */
let chainProvider = process.env.CHAIN_PROVIDER || "http://localhost:8545";
let web3 = new Web3(new Web3.providers.HttpProvider(chainProvider));

const LMS = contract(artifacts);

async function smartChain() {
  LMS.setProvider(web3.currentProvider);
  req.accounts = await web3.eth.getAccounts();
  req.lms = await LMS.deployed();
}
/* ****************************************************************** */

// RequestHandler creates a separate execution context using domains, so that every
// transaction/span/breadcrumb is attached to its own Hub instance
app.use(Sentry.Handlers.requestHandler());
// TracingHandler creates a trace for every incoming request
app.use(Sentry.Handlers.tracingHandler());

//Start router app from API
routes(app);

//Enable catch error
app.use(Sentry.Handlers.errorHandler());
app.use(middleHandler);
app.use(boomErrorHandler);
app.use(errorHandler);

//export module
module.exports = { app, smartChain };
