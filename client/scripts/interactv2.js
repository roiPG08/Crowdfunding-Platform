const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const API_KEY = process.env.API_KEY;
const { ethers } = require("ethers");
const contract = require("../artifacts/contracts/HelloWorld.sol/HelloWorld.json");

//Alternative provider might be Web3 (MetaMask in-built)
//const provider = new ethers.providers.Web3Provider(window.ethereum);

// provider - Localhost
const provider = new ethers.providers.JsonRpcProvider();

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
