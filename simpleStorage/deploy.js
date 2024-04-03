//let var cons for variable decalaration

//async function

//promise 
// pending
//fulfilled
//rejected

const ethers = require("ethers")
const fs=require("fs-extra") //for abi and binary of contract
require("dotenv").config();
async function main(){
    //to compile solidity we use solc-js
    //http://127.0.0.1:7545

    const provider = new ethers.JsonRpcProvider(process.env.RPC_URL); //this will connect script with local blockchain
   // const wallet =new ethers.Wallet("0xebcac1fa8244be39f8880439f77e9e122717251293da872e1e891170086e2716",provider); 
    // .env(environmental variable) file is used to hide private key 
    //to access private key from env file use process 
    //const wallet =new ethers.Wallet(process.env.PRIVATE_KEY,provider); 
    //another way is to declare it in command line while compiling this code cli: RPC_URL=urlname PRIVATE_KEY=key node deploy.js       
    const encryptedJson=fs.readFileSync("./encryptedKey.json","utf-8")
    let wallet =ethers.Wallet.fromEncryptedJsonSync(encryptedJson,process.env.PASS)
    wallet=await wallet.connect(provider)
    const abi=fs.readFileSync("./SimpleStorage_sol_Simplestorage.abi","utf-8");
    const binary =fs.readFileSync("./SimpleStorage_sol_Simplestorage.bin","utf-8")
    const contractFactory =new ethers.ContractFactory(abi,binary,wallet) //to deploy contract
     
//     console.log("Deploying, wait")


    const contract=await contractFactory.deploy({gasLimit:6721975}); //await for wait for being it deploy
    //     //deploy with some overrides 
//     //example with gas or galimit
//     // const contract =await contractFactory.deploy({gasLimit:100000000});
//     //whatelse can be done
//     //wait till certain number of block finish with contract
//     //one block to check contract actually get attach to chain
     //await contract.deployTransaction.wait(1);
     const currentFavouriteNUmber=await contract.retrieve();
     console.log(`Currentvariable number is: ${currentFavouriteNUmber.toString()}`) //(``)string interpolation will be used to deal with number + string
     //to work with variable and string use backticks
    const transactionResponse= await contract.store("7");
    const transactionReceipt=await transactionResponse.wait(1);
    const updateFNumber=await contract.retrieve();
    console.log(`Current favourite number ${updateFNumber}`)







    // console.log(transanctionReceipt)

    // console.log("Deploy with only transaction data")
 //const nonce=await wallet.getTransactionCount(); //to keep updating nonce value
    // const tx={
    //     nonce:2,
    //     gasPrice:20000000000,
    //     gasLimit: 6721975,
    //     to:null,
    //     value:0,
    //     data:"binary file of smart contract",
    //     chainId: 1337,
    // }

    // const sentTxResponse = await wallet.sendTransaction(tx);
    //  await sentTxResponse.wait(1)
}

main()
    .then(() => process.exit(0))
    .catch((error)=>{
        console.error(error);
        process.exit(1);

    });