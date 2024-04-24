const hre = require("hardhat");
const {ethers} = require("hardhat");

async function main() {

  const Campaign = await ethers.getContractFactory("Campaign");
  const campaign = await Campaign.deploy();
  console.log("Campaign Contract deployed to address:", campaign.address);

}
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
