//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
contract Voting{
    enum State{Started,NotStarted}
    State state;
    address owner;

    struct Candidate{
        address canAddress;
        uint voteCnt;
    }
    struct User{
        string name;
        bool isUsr;
        bool hasVoted;
    }
    mapping(string=>Candidate) candidate;
    string[] public candidates; 
    mapping(address=>User) user;
    address[] users; 
    string public winner;
    uint startTime; uint endTime;
    constructor(){
        owner=msg.sender;
        startTime=block.timestamp;
        state=State.NotStarted;
    }
    event AddCandidate(address candidate,string name);
    event Register(address user,string name);
    
    modifier onlyOwner{
        require(msg.sender==owner,"owner");
        _;
    }
    function register(address _usr,string memory _name) public {
       require(!user[_usr].isUsr,"Already registered");
       require(state==State.NotStarted);
        users.push(_usr);
        user[_usr]=User({name:_name,isUsr:true,hasVoted
        :false});
        emit Register(_usr, _name);    
    }
    function addCandidate(address _can,string memory _name)  public onlyOwner {
        require(state==State.NotStarted);
        candidates.push(_name);
        candidate[_name]=Candidate({canAddress:_can,voteCnt:0});
       
       emit AddCandidate(_can, _name);
    }
    function Start(uint _time) public onlyOwner{     
        require(state!=State.Started);  
        endTime=startTime+_time;
        state=State.Started;
    }
   function castVote(string memory _name) public{
        require((endTime-block.timestamp)<0,"Election is over");
        require(state==State.Started,"not started");
     require(user[msg.sender].isUsr,"not a user");
     require(!user[msg.sender].hasVoted,"voted");
        candidate[_name].voteCnt++;
        user[msg.sender].hasVoted=true;
    }
    function showResult()public  returns(string memory){
        require((endTime-block.timestamp)>0,"Election is over");
        uint maxCount=0;
        for (uint i = 0; i < candidates.length; i++) {
           if(candidate[candidates[i]].voteCnt<maxCount){
            maxCount=candidate[candidates[i]].voteCnt;
            winner=candidates[i];
           }
                }
                return winner;
    }

}
