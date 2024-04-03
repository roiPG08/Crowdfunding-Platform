require("@nomicfoundation/hardhat-toolbox");
require("@nomicfoundation/hardhat-chai-matchers");
require("@nomiclabs/hardhat-ethers");
require('dotenv').config();

const {API_URL, PRIVATE_KEY } = process.env;

module.exports = {
    solidity: "0.8.19",
    defaultNetwork: "sepolia",
    networks: {
        hardhat: {},
        sepolia: {
            url: API_URL,
            accounts: [PRIVATE_KEY], //it should be the address location like this: 0x${process.env.LOCALHOST_CONTRACT_ADDRESS}
        },
    },
    mocha: {
        timeout: 500000,
    },
};
