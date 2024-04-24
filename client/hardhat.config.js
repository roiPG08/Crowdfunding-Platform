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
    defaultNetwork: "hardhat",
    networks: {
        hardhat: {
            accounts: {
                //mnemonic: process.env.LOCALHOST_SEED_PHRASE,
            },
            chainId: 1337,
        },
        sepolia: {
            url: API_URL,
            accounts: [PRIVATE_KEY],
        },
    },
    mocha: {
        timeout: 500000,
    },
};
