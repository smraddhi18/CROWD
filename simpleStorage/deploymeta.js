//let var cons for variable decalaration

//async function

//promise 
// pending
//fulfilled
//rejected

const ethers = require("ethers")
//const fs=require("fs-extra") //for abi and binary of contract
async function main(){
    //to compile solidity we use solc-js
    //http://127.0.0.1:7545

    const provider = new ethers.BrowserProvider(window.ethereum) //Web3Provider is depricated

// MetaMask requires requesting permission to connect users accounts
await provider.send("eth_requestAccounts", []);

}

main()
    .then(() => process.exit(0))
    .catch((error)=>{
        console.error(error);
        process.exit(1);

    });