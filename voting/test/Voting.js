// const { expect,assert } = require("chai");
// const{ethers} =require("hardhat");
// describe("Voting", function () {
//   let voting;
//   let owner;
//   let accounts;
//  beforeEach(async function() {    
//     // Contracts are deployed using the first signer/account by default
//     [owner, accounts] = await ethers.getSigners();

//     const Voting = await ethers.getContractFactory("Voting");
//      voting = await Voting.deploy();
//     await voting.waitForDeployment();
//     console.log(voting)
//   }),

//   it("Should add candidate",async()=>{
//    await voting.addCandidate(accounts.address,"sam")
//    voting.on("AddCandidate", (event, can, name) => {
//     let info = {
//         candidate: can,
//         name: name,
//         data: event,
//     };
//     console.log(JSON.stringify(info,null,3));
//     console.log("success");
//    })
//   })

//   })




const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Voting Contract", function () {
    let votingContract;
    let owner;
    let candidateAddress;

    beforeEach(async () => {
        [owner, candidateAddress] = await ethers.getSigners();

        const Voting = await ethers.getContractFactory("Voting");
        votingContract = await Voting.deploy();
        await votingContract.waitForDeployment();
    });

    it("Should emit AddCandidate event", async function () {
        const candidateName = "Candidate1";

        await expect(votingContract.addCandidate(candidateAddress.address, candidateName))
            .to.emit(votingContract, "AddCandidate")
            .withArgs(candidateAddress.address, candidateName);
    });

    it("Should emit Register event", async function () {
      const userName = "user1";

      await expect(votingContract.register(candidateAddress.address, userName))
          .to.emit(votingContract, "Register")
          .withArgs(candidateAddress.address, userName);
  });
});

