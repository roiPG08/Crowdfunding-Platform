// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "hardhat/console.sol"; // Library used for console.log() debugging

contract Campaign {

    address payable owner;
            
    receive() external payable {}

    constructor() {
        owner = payable(msg.sender);
    }

    fallback() external payable {}

    uint public projectsCount = 0;
    uint public transactionId = 0;
    mapping(uint => Project) public projects;
    mapping(uint => Transaction) public transactions;
    Project[] public projectsArray;



    struct Project {
        uint id;
        string creatorId;
        string name;
        string description;
        address payable projectOwner;
        bool isFunded;
        string status;
        uint goal;
        string tag;
        string[] images;
        uint unlockTime;
        uint creationDate;
        uint currentFunds;
        uint[] transactionIds;
    }

    struct Transaction {
        uint id;
        uint value;
        address payable sender;
    }

    event ProjectCreated(
        uint id,
        string creatorId,
        string name,
        string description,
        address payable projectOwner,
        bool isFunded,
        string status,
        uint goal,
        string tag,
        string[] images,
        uint unlockTime,
        uint creationDate,
        uint currentFunds,
        uint[] transactions
    );

    event ProjectFunded(
        uint id,
        string name,
        uint currentFunds,
        address payable owner,
        bool isFunded
    );

    event TransactionSent(
        uint id,
        uint value,
        string txHash,
        address sender
    );



    function createProject(
        string memory _creatorId,
        string memory _name,
        string memory _description,
        address _address,
        uint256 _goal,
        uint256 _fundEndTime,
        uint256 _creationDate,
        string memory _tag,
        string[] memory _images
    ) public {

        require(bytes(_name).length > 0, "Project name cannot be empty");
        require(bytes(_creatorId).length > 0, "Project creatorId cannot be empty");
        require(bytes(_description).length > 0, "Project description cannot be empty");
        require(bytes(_tag).length > 0, "Project tag cannot be empty");
        require(_goal > 0, "Project goal must be greater than zero");
        require(_fundEndTime > 0, "Project end date cannot be 0");
        require(_creationDate > 0, "Creation date cannot be 0");
        require(_fundEndTime >= _creationDate, "Project's funding end date must be later than current time.");

        uint[] memory transactionsIds;

        Project memory project = Project(
            projectsCount,
            _creatorId,
            _name,
            _description,
            payable(_address),
            false,
            "created",
            _goal,
            _tag,
            _images,
            _fundEndTime,
            _creationDate,
            0,
            transactionsIds
        );

        projects[projectsCount] = project;

        projectsCount++;

        emit ProjectCreated(
            projectsCount,
            _creatorId,
            _name,
            _description,
            payable(_address),
            false,
            "created",
            _goal,
            _tag,
            _images,
            _fundEndTime,
            _creationDate,
            0,
            transactionsIds
        );
    }

    //Fund Project function is responsible for updating project's currentFunds record. 
    //It does not require any value to be send along this function call. 
    function fundProject(uint _id, address _from, uint _value, string memory _txhash ) public payable {
        uint amount = _value;
        Project storage _project = projects[_id];

        require(_project.id >= 0 && _project.id <= projectsCount, "Selected project does not exist.");
        require(!_project.isFunded, "Project has finished fundraising.");
        require(_project.creationDate <= _project.unlockTime, "Project's funding period has finished.");

        _project.currentFunds += amount;
        _project.transactionIds.push(transactionId);

        //Creates and adds the transaction to the mapping
        transactions[transactionId] = Transaction(transactionId, amount, payable(msg.sender));
        transactionId++;

        //Checks if the project achieved its funding goal
        if (_project.currentFunds >= _project.goal) {
            _project.isFunded = true;
            _project.status = "funded";

            emit ProjectFunded(
                _id,
                _project.name,
                _project.currentFunds,
                _project.projectOwner,
                _project.isFunded
            );
        }

        //Updates project in mapping
        projects[_id] = _project;

        emit TransactionSent(_id, amount, _txhash, _from);
    }

    //Function used for collecting campaign funds to the project owner address.
    function withdrawFunds(uint256 _id, address _receiver) public {
        Project memory _project = projects[_id];

        require(_project.id >= 0 && _project.id <= projectsCount, "Project's Id is not valid.");
        require(_project.isFunded, "Project needs to achieve funding target.");
        require(_receiver == _project.projectOwner, "Funds may be collected only to the same person that created campaign.");

        //Sends funds to project owner
        (bool sent, ) = payable(_receiver).call{value: _project.currentFunds}("");
        require(sent, "Failed to send Ether"); 

        _project.currentFunds = 0;
        _project.status = "paid";
        projects[_id] = _project;
    }

    //Function used to release funds to the project investors once the fundraising has failed.
    function releaseFunds(uint _id) internal {
        Project memory _project = projects[_id];

        require(_project.id > 0 && _project.id <= projectsCount);
        require(!_project.isFunded);
        //Code below uses keccack256 hash function for checking hashes of the specified strings
        require(keccak256(abi.encodePacked(_project.status)) == keccak256(abi.encodePacked("deleted")) ||
                keccak256(abi.encodePacked(_project.status)) == keccak256(abi.encodePacked("closed")), "Project was not marked for releasing.");

        //Loop through each backer of the project
        for (uint index = 0; index < _project.transactionIds.length; index++) {
            uint _txId = _project.transactionIds[index];
            Transaction memory _tx = transactions[_txId];

            //Sends money back to the backer
            (bool sent, ) = (_tx.sender).call{value: _tx.value}("");
            require(sent, "Failed to send Ether"); 
        }
        _project.currentFunds = 0;
        projects[_id] = _project;
    }

    //Returns smart contract ballance
    function getWalletBalance() external view returns (uint) {
        return address(this).balance;
    }

    //Returns list of transactions for specified project
    function getProjectTransactions(uint _projectId) public view returns (Transaction[] memory) {
        Project storage project = projects[_projectId];
        uint[] memory ids = project.transactionIds;
        Transaction[] memory projectTransactions = new Transaction[](ids.length);

        for (uint i = 0; i < ids.length; i++) {
            projectTransactions[i] = transactions[ids[i]];
        }

        return projectTransactions;
    }
    
    //Returns list of all projects created
    function getAllProjects() public view returns (Project[] memory) {
        Project[] memory all = new Project[](projectsCount);

        for (uint i = 0; i < projectsCount; i++) {
            all[i] = projects[i];
        }

        return all;
    }

    //Returns project by projectId
    function getProjectById(uint _id) public view returns (Project memory){
        return projects[_id];
    }

    //Function responsible for marking project as "deleted",
    // however it does not remove project as the process of data transparency
    function deleteCampaign(uint _id) public {
        Project storage _project = projects[_id];

        require(_project.id >= 0 && _project.id <= projectsCount, "Selected project does not exist.");

        _project.status = "deleted";
        projects[_id] = _project;

        releaseFunds(_id);
    }

    //Function responsible for marking project as "closed", once the funding period has elapsed.
    function closeCampaign(uint _id) internal {
        Project storage _project = projects[_id];

        require(_project.id >= 0 && _project.id <= projectsCount, "Selected project does not exist.");

        _project.status = "closed";
        projects[_id] = _project;

        releaseFunds(_id);
    }
}
