require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config()
require("./tasks/block-number")
require("hardhat-gas-reporter")
require("solidity-coverage")
const SEPOLIA_RPC_URL=process.env.SEPOLIA_RPC_URL || "https://eth-rinkbey";
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.19",
  networks:{
    sepolia:{
      url:SEPOLIA_RPC_URL,
      accounts:[process.env.PRIVATE_KEY],
      chainId:11155111,
    },
    localhost:{
      url:"http://127.0.0.1:8545/",
      chainId: 31337,
    }
   // Ganache:{},
  },
  etherscan:{
    apiKey:{
      sepolia:[process.env.ETHERSCAN_API_KEY],
    }
  },
  gasReporter:{
    enabled:true,
    outputFile:"gas-report.txt",
    noColors:true,
    currency:"USD",
    coinmarketcapApiKey:[process.env.COINMARKETCAP_API_KEY],
    token:"MATIC",
  }
};

//just like ganache hardhat node works but it in terminal
//npx hardhat node

//npx hardhat console 
//this for scripts what we did in scripts can be done here

//for networks
//npx hardhat console --network sepolia

//npx hardhat clean #for cleaning artifacts