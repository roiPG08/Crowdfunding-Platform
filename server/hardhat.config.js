require("@nomicfoundation/hardhat-toolbox");
require("@nomicfoundation/hardhat-chai-matchers");
require("@nomiclabs/hardhat-ethers");

const {API_URL, PRIVATE_KEY} = process.env

module.exports = {
    solidity: "0.8.19",
    defaultNetwork: "goerli",
    networks: {
        hardhat: {},
        goerli: {
            url: `https://eth-goerli.g.alchemy.com/v2/S8kHEI3el09qH-6hmc2yVvX7ZI-MfswW`,
            accounts: ['b6240cfe549be50792f3641413c2b7cdcd031ffd47d5d0007bd6eaebccca391e'],
        },
    },
    mocha: {
        timeout: 500000,
    },
};
