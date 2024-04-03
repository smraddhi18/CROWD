const MyContract = artifacts.require("./ether.sol");

contract("MyContract", (accounts) => {
  it("should deposit and withdraw", async () => {
    const myContract = await MyContract.deployed();
    const initialBalance = await web3.eth.getBalance(accounts[0]);

    // Deposit some Ether
    const depositAmount = web3.utils.toWei("1", "ether");
    await myContract.deposit({ from: accounts[0],value : depositAmount });

    // Check the balance
    const balance = await myContract.get_balance({ from: accounts[0] });
    assert.equal(balance, depositAmount, "Balance not as expected");

    // Withdraw
    const initialContractBalance = await web3.eth.getBalance(myContract.address);
    const tx = await myContract.withdraw({ from: accounts[0] });

    // Check the balance after withdrawal
    const finalBalance = await web3.eth.getBalance(accounts[0]);
    assert.isAbove(finalBalance.toNumber(), initialBalance.toNumber(), "Withdrawal failed");

    // Check contract balance after withdrawal
    const finalContractBalance = await web3.eth.getBalance(myContract.address);
    assert.equal(finalContractBalance.toNumber(), 0, "Contract balance not cleared");
  });
});
