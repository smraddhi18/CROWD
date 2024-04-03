//SPDX-License-Identifier:MIT
pragma solidity ^0.8.0;
contract Migrations{
    address public owner;
    uint public lastCompletedMigration;

    constructor() 
    {
        owner=msg.sender;
    }

    modifier restricted(){
        require(msg.sender==owner);
        _;
    }

    function setCompeleted(uint completed) public restricted{
        lastCompletedMigration=completed;
    }

    function upgrade(address newAddress) public  restricted{
        Migrations upgraded=Migrations(newAddress);
        upgraded.setCompeleted(lastCompletedMigration);
    }
}
