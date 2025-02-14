const {network}=require("hardhat")
const { developmentChains,DECIMALS,INITIAL_ANSWER } = require("../helper-hardhat-config")
module.exports=async({getNamedAccounts,deployments})=>{
    const{deploy,log} =deployments
    const {deployer}=await getNamedAccounts()
    const chainId=network.config.chainId

    if(developmentChains.includes(chainId)){
        log("Local Network detected! Deploying mocks..")
        await deploy("MockV3Aggregator",{
            contract: "MockV3Aggregator",
            from: deployer,
            log: true,
            args:[DECIMALS,INITIAL_ANSWER],
        })
        log("Mocks deployed!")
    }
    else {
        log(`Deployed to this ${chainId}`)
    }
}

module.exports.tags=["all","mocks"]