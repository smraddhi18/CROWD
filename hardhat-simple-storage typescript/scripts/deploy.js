const {ethers,run,network}=require("hardhat")
require("dotenv").config()
async function main(){
  const SimpleStorageFactory= await ethers.getContractFactory("Simplestorage")

  console.log("Deploying hurrrr")
  const simpleStorage=await SimpleStorageFactory.deploy()
  await simpleStorage.waitForDeployment()
 console.log(simpleStorage.target)
  // Access the deployment transaction hash
  //const deploymentTransaction=await SimpleStorageFactory.getDeployTransaction()

  //await simpleStorage.deploymentTransaction().wait(1);
  //console.log(deploymentTransaction)
  console.log(`Deploying address to: ${simpleStorage.target}`)
   if(network.config.chainId===11155111 && process.env.ETHERSCAN_API_KEY){
    //ye sb kaam nhi kr rhi thi
  //   const transactionHash=  simpleStorage.deployTransaction.hash;
  //  await transactionHash.wait(5);
   // await simpleStorage.deployTransaction.wait(6)
   console.log(`waiting for blockconfirmation`)
   await simpleStorage.deploymentTransaction().wait(5);

    await verify(simpleStorage.target,[])

   }
   const currentValue=await simpleStorage.retrieve();
   console.log(`Currentvalue:${currentValue}`)

   //update the current value
   const transactionResponse=await simpleStorage.store(7);
   await transactionResponse.wait(1)
   const updatedValue=await simpleStorage.retrieve();
   console.log(`updated value is ${updatedValue}`)


  //Another way to deploy
  // const [deployer] = await ethers.getSigners();

  // console.log("Deploying contracts with the account:", deployer.address);

  // const token = await ethers.deployContract("Simplestorage");

  // console.log("Token address:", await token.getAddress());

}
//through npx hardhat --verify command verification can be done
async function verify(contractAddress,args){
   console.log(`verifying contract`)
   try{
   await run("verify:verify",{
    address: contractAddress,
    constructorArguments : args
   })
   }
   catch(e){
    if(e.message.toLowerCase().includes("already verified")){
      console.log("Already Verification!")
    }
    else 
       console.log(e);
   }

}
main()
    .then(() => process.exit(0))
    .catch((error)=>{
        console.error(error);
        process.exit(1);

    });