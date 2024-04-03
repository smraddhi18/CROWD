// SPDX-License-Identifier: GPL-3.0

pragma solidity 0.5.16;

contract MyContract {
    mapping(address=>uint) public user_account;
    function deposit() public payable{
        require(user_account[msg.sender]>=0);
        user_account[msg.sender]+=msg.value;
    }
    function withdraw() public {
    //     require(user_account[msg.sender]>0);
    //     // require(user_account[msg.sender]>amt);
    // //payable(msg.sender).transfer(address(this).balance);
    // (bool ca,)=payable(msg.sender).call{value: address(this).balance}("");
    // require(ca,"Transfer fail");
    // user_account[msg.sender]=0;

         require(user_account[msg.sender] > 0);
        uint amountToWithdraw = user_account[msg.sender];
        user_account[msg.sender] = 0;
        
        bool success = msg.sender.send(amountToWithdraw);
        require(success, "Transfer failed");
    }
    }