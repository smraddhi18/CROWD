require("@nomicfoundation/hardhat-toolbox");
require("@nomiclabs/hardhat-ethers");
require('hardhat-deploy')
require("dotenv").config()
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  // solidity: "0.8.19",
  solidity:{
    compilers:[
      {version:"0.8.8"},
      {version:"0.6.6"}
    ],
  },
  networks:{
    sepolia:{
      url:process.env.SEPOLIA_RPC_URL,
      accounts:[process.env.PRIVATE_KEY],
      chainId:11155111,
      blockConfirmations:6,
    },
    localhost:{
      url:"http://127.0.0.1:8545/",
      chainId: 31337,
    }
  },
  etherscan:{
    apiKey:{
      sepolia:[process.env.ETHERSCAN_API_KEY],
    }
  },
  gasReporter:{
    enabled:false,
    outputFile:"gas-report.txt",
    noColors:true,
    currency:"USD",
    coinmarketcapApiKey:[process.env.COINMARKETCAP_API_KEY],
    token:"MATIC",
  },
  namedAccounts:{
    deployer:{
      default:0,
    }
  }
};
