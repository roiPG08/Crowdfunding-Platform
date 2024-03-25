const hre = require("hardhat");
const {ethers} = require("hardhat");

async function main() {
  const HelloWorld = await ethers.getContractFactory("HelloWorld");
  const helloWorld = await HelloWorld.deploy("Hello World!");
  console.log("Contract deployed to address:", helloWorld.address);

  // const campaign = await hre.ethers.deployContract("Campaign");
  // console.log("Contract deployed to address:", campaign.target);

}
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
