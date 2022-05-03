const colors = require("colors");
const mongoose = require("mongoose");
const loadingConsole = require("../lib/loadingConsole");

const db = mongoose.connection;
const URI_DB = process.env.URI_DB || "mongodb://localhost:27017/poc-eth";

const optionsConnection = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

var loader;

db.on("connecting", () => {
  clearInterval(loader);
  let id = loadingConsole(`Connecting to mongodb ✅`);
  loader = id;
});

db.on("connected", () => {
  clearInterval(loader);
  console.clear();
  console.log(`\n MongoDb is connected  ✅ \n`);
});

db.on("error", (error) =>
  console.log(colors.red(`\n ❌ Error in mongodb network: \n\n`, error))
);

db.on("disconnected", () =>
  console.log(
    colors.bgYellow.red(`\n ❌ Mongodb is offline: %s\n`),
    new Date().toLocaleString()
  )
);

mongoose.connect(URI_DB, optionsConnection);

module.exports = mongoose;
