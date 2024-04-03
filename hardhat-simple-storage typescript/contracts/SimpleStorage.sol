//SPDX-License-Identifier: MIT
pragma solidity ^0.8.8;

contract Simplestorage{
    //view,pure function are alone they don't spend gas
    uint256  favoriteNumber; //this gets initialized to zero, no need to specify storage here it is gobal default

    mapping (string=>uint256) public nameTofavoriteNumber;
    struct People {
        uint256 favoriteNumber;
        string name;
    }
    //uint256[] public favoriteNumberslist;
    People[] public people;//dynamic array
    function store(uint256 _favoriteNumber) public virtual{
        favoriteNumber = _favoriteNumber;
    }

    //view
    function retrieve() public view returns(uint256){
        return favoriteNumber;
    }

    function add() public pure returns(uint256){
        return (1+1);
    }

    function addPerson(string memory _name,uint256 _favoriteNumber) public { 
        //it is not required to use memory in unit256 because solidity knows it should be stored in memory
       // people.push(People(_favoriteNumber,_name));

       //another way 
       People memory newPerson = People({favoriteNumber:_favoriteNumber, name: _name});
       people.push(newPerson);
        nameTofavoriteNumber[_name]=_favoriteNumber;
       //memory, calldata, storage
       //memory is like local variable that can be modified, 
       //calldata is also like local variable that can't be modified and storage is like global variable
       //this should be specified for arrays,struct and mapping only 

    }
}

//solidity-coverage to secure it from hacking