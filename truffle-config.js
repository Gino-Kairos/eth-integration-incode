//Dependecies
const path = require("path");

/* 

  truffle configuration can be found at: 
  https://trufflesuite.com/docs/truffle/reference/configuration/

*/

module.exports = {
  contracts_build_directory: path.join(__dirname, "/build"),
  networks: {
    development: {
      host: "127.0.0.1",
      port: 8545,
      network_id: "*",
    },
  },
};
