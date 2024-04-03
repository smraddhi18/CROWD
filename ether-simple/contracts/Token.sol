//SPDX-License-Identifier:MIT
pragma solidity ^0.8.0;
contract Tokens{
    string public name="same";
    string public symbol="i";
    uint public totalSupply=1000;
    
    address public owner;
    mapping(address=>uint) balances;
    constructor (){
        balances[msg.sender]= totalSupply;
        owner=msg.sender;
    }

    function trasfer(address to, uint amount) external{
        require(balances[msg.sender]>=amount,"not enoough expense");
        balances[msg.sender]-=amount;
        balances[to]+=amount;
    }
    function balance(address account) external  view returns(uint){
        return balances[account];
    }
}