// import
//main function
// //calling of main function

//1 way
// function deployFunc(){
//     console.log("Hi!")
// }
// module.exports.default=deployFunc

//2nd way
// module.exports = async (hre)=>{
//     const{getNameAccounts,deployments}=hre 

// }
const {networkConfig,developmentChains}=require("../helper-hardhat-config")
const {network}=require("hardhat")
const {verify}=require("../utils/verify")
module.exports=async({getNamedAccounts,deployments}) =>{
    const{deploy,log} =deployments
    const {deployer}=await getNamedAccounts()
    const chainId=network.config.chainId
    let ethUsdPriceFeedAddress
    if(developmentChains.includes(network.name)){
        const ethUsdAggregator=await deployments.get("MockV3Aggregator")
        ethUsdPriceFeedAddress= ethUsdAggregator.address
    }
    else{
    ethUsdPriceFeedAddress =networkConfig[chainId]["ethUsdPriceFeed"]

    }
    //aave to deploy network to multiple chains and work with multiple chains
    //well what happens when we want to change chains?
    //when going for localhost or hardhat network we want to use a mock
    const args=[ethUsdPriceFeedAddress]
    const fundMe=await deploy("FundMe",{
        from:deployer,
        args:args, //put price feed address
        log: true,
        waitConfirmations: network.config.blockConfirmation || 1,
    })

    if(!developmentChains.includes(network.name)&& process.env.ETHERSCAN_API_KEY){
        //verify
        await verify(fundMe.address,args)
    }
}

module.exports.tags=["all","fundme"]