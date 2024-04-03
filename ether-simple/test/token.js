const {expect}=require("chai");
// const {ethers}= require("ethers");
const {isCallTrace}=require("hardhat/internal/hardhat-network/stack-traces/message-trace")

//mocha is framework and chai is library 
describe("Token contract",function(){
    it("Deployement should assign the total supply to owner", async function(){
        const [owner] =await ethers.getSigner(); //getSigner to access account details
        console.log("Siganture object:",owner);
        const Token =await ethers.getContractFactory("Token") // to instance the contract getContract of contract
        const hardhatToken= await Token.deploy(); //deploy contract
        const ownerBalance=await hardhatToken.balance(owner.address) //balance of owner is know
        console.log("Address of owner",owner.address)

        //expect of chai library
        expect(hardhatToken.totalSupply()).to.equal(ownerBalance) //totalSupply=1000
    })
});