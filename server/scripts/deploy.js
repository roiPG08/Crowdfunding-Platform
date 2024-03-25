const hre = require("hardhat");
const ethers = require("ethers");

async function main() {
  const HelloWorld = await ethers.getContractFactory("Hello World");
  const helloWorld = await hre.ethers.deployContract("HelloWorld");
  console.log("Contract deployed to address:", helloWorld.target);

  // const campaign = await hre.ethers.deployContract("Campaign");
  // console.log("Contract deployed to address:", campaign.target);

}
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
