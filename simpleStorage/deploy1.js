
const ethers = require("ethers")
const fs=require("fs-extra") //for abi and binary of contract
async function main(){
    //to compile solidity we use solc-js
    //http://127.0.0.1:7545

    const provider = new ethers.JsonRpcProvider("http://127.0.0.1:7545"); //this will connect script with local blockchain
    const wallet =new ethers.Wallet("0xeb3a976c7bf925b0435e8c953ad16bc0163f33a622be7c48d0e4a88c77cdbb7a",provider); //accoount here directly using private key is risky this will be seen late on 
     const abi=fs.readFileSync("./SimpleStorage_sol_Simplestorage.abi","utf-8");
    const binary =fs.readFileSync("./SimpleStorage_sol_Simplestorage.bin","utf-8")
     const contractFactory =new ethers.ContractFactory(abi,binary,wallet) //to deploy contract
     
    console.log("Deploying, wait")


    const contract=await contractFactory.deploy({gasLimit:6721975}); //await for wait for being it deploy
    // await contract.deployTransaction.wait(1);
     const currentFavouriteNUmber=await contract.retrieve();
     console.log(currentFavouriteNUmber.toString())

}

main()
    .then(() => process.exit(0))
    .catch((error)=>{
        console.error(error);
        process.exit(1);

    });