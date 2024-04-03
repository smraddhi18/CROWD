const {ethers}=require("hardhat")
const {expect,assert}=require("chai")
//describe("SimpleStorage",()=>{})

describe("SimpleStorage",function(){
  let SimpleStorageFactory,simpleStorage
  beforeEach(async function(){
    SimpleStorageFactory=await ethers.getContractFactory("Simplestorage");
    simpleStorage=await SimpleStorageFactory.deploy()
  })

  it("Should start with a favorite number of 0",async function(){
    const currentValue=await simpleStorage.retrieve()
    const expectedValue="0"
    //assert //except
    assert.equal(currentValue.toString(),expectedValue)

    expect(currentValue.toString()).to.equal(expectedValue)
  })
  
  it("Should update when we call store",async()=>{
    const expectedValue="7"
    const transactionResponse=await simpleStorage.store(expectedValue)
    await transactionResponse.wait(1)
    const currentValue=await simpleStorage.retrieve()
    assert.equal(currentValue.toString(),expectedValue)

  })
}) //keyword for hardhat mocha

//to run a single test command is
//npx hardhat test --grep "ANY_KEYWORD_FOR_RUNNING LET HERE IT IS STORE "
//or else by using it.only() in code

//hardhat gas reporter