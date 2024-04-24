require("@nomicfoundation/hardhat-toolbox");
require("@nomicfoundation/hardhat-chai-matchers");
require("@nomiclabs/hardhat-ethers");
require('dotenv').config();

const {API_URL, PRIVATE_KEY } = process.env;

module.exports = {
    solidity: {
        version: '0.8.19',
        settings: {
          optimizer: {
            runs: 200,
            enabled: true
          }
        }
    },
    defaultNetwork: "sepolia",
    networks: {
        hardhat: {},
        sepolia: {
            url: API_URL,
            accounts: [PRIVATE_KEY],
        },
    },
    mocha: {
        timeout: 500000,
    },
};
