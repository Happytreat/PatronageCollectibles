// require('dotenv').config();
const path = require("path");
// const HDWalletProvider = require('truffle-hdwallet-provider');
// const RINKEBY_ENDPOINT = `https://rinkeby.infura.io/v3/${process.env.INFURA_ACCESS_TOKEN}`;

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration> to customize your Truffle configuration!
  contracts_build_directory: path.join(__dirname, "app/src/contracts"),
  networks: {
    development: { // Ganache
      host: '127.0.0.1',
      port: 8545,
      network_id: '*', // 5777
      gas: 8000000,
    },
    // rinkeby: {
    //   provider: () => new HDWalletProvider(process.env.MNEMONIC, RINKEBY_ENDPOINT),
    //   network_id: 4,
    //   skipDryRun: true,
    //   gasPrice: 20000000000, // 20 gwei
    //   gas: 7000000,
    // },
  },
  compilers: {
    solc: {
      version: '0.5.8',
      settings: {
        optimizer: {
          enabled: true,
          runs: 200,
        },
      },
    },
  },
};
