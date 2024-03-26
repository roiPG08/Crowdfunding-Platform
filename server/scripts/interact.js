const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;
const API_KEY = process.env.API_KEY;
const PRIVATE_KEY = process.env.PRIVATE_KEY;

//const { ethers } = require("ethers");
const contract = require("../artifacts/contracts/HelloWorld.sol/HelloWorld.json");

// provider - Alchemy
//const alchemyProvider = new ethers.providers.AlchemyProvider("sepolia", API_KEY);

// provider - Localhost
const provider = new ethers.getDefaultProvider();

// provider - Infura
//const provider = new ethers.providers.InfuraProvider("sepolia", API_KEY);

//signer - user
const signer = new ethers.Wallet(PRIVATE_KEY, provider);

//contract istance
const helloWorldContract = new ethers.Contract(CONTRACT_ADDRESS, contract.abi, signer);

async function main() {
    const message = await helloWorldContract.message();
    console.log("The message is: " + message);

    console.log("Updating the message ...");
    const tx = await helloWorldContract.update("this is the new message");
    await tx.wait();

    const newMessage = await helloWorldContract.message();
    console.log("The new message is: " + newMessage);

}
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
