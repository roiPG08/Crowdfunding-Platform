// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "hardhat/console.sol";

contract Campaign {
    uint public projectsCount = 0;
    uint public transactionId = 0;
    address payable public wallet;

    mapping(uint => Project) public projects;
    mapping(uint => Transaction) public transactions;
    Project[] public projectsArray;

    receive() external payable {}

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
        string txHash;
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
        string txHash,
        uint value,
        address sender
    );

    /// @author Przemyslaw Rabczak
    /// @notice Constructor is the function that is called only by the server application. The wallet address that is assigned is independent to all other addresses, that are further created in campaigns.
    /// @dev Explain to a developer any extra details
    constructor() {
        wallet = payable(msg.sender);
    }

    function createProject(
        string memory _creatorId,
        string memory _name,
        string memory _description,
        address _creatorAddress,
        uint256 _goal,
        uint256 _fundEndTime,
        uint256 _creationDate,
        string memory _tag,
        string[] memory _images
    ) public {

        require(bytes(_name).length > 0);
        require(_goal > 0);

        uint[] memory transactionsIds;

        Project memory project = Project(
            projectsCount,
            _creatorId,
            _name,
            _description,
            payable(_creatorAddress),
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
        projectsArray.push(project);

        projectsCount++;

        emit ProjectCreated(
            projectsCount,
            _creatorId,
            _name,
            _description,
            payable(_creatorAddress),
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

    function fundProject(uint _id, string memory _txHash, address _sender ) public payable {
        uint amount = msg.value;
        Project storage _project = projects[_id];

        console.log(
            "Transaction: from %s - %s tokens",
            _sender,
            amount
        );

        require(_project.id >= 0 && _project.id <= projectsCount);
        require(!_project.isFunded);
        require(_project.creationDate <= _project.unlockTime, "Project's funding period has finished.");

        _project.currentFunds += amount;
        _project.transactionIds.push(transactionId);

        transactions[transactionId] = Transaction(transactionId, _txHash, amount, payable(_sender));
        transactionId++;

        if (_project.currentFunds == _project.goal) {
            _project.isFunded = true;
            console.log("Project has been funded.");
            
            emit ProjectFunded(
                _id,
                _project.name,
                _project.currentFunds,
                _project.projectOwner,
                _project.isFunded
            );
        }

        projects[_id] = _project;

        emit TransactionSent(_id, _txHash, amount, msg.sender);
    }

    function withdrawFunds(uint _id, address _receiver) public { //add payable onlyOwner
        Project memory _project = projects[_id];

        console.log(_receiver);
        console.log(_project.projectOwner);
        console.log(wallet);
        console.log(_project.currentFunds);

        require(_project.id >= 0 && _project.id <= projectsCount, "Project's Id is not valid.");
        //require(_project.isFunded, "Project needs to achieve funding target.");
        require(_receiver == _project.projectOwner, "Funds may be collected only to the same person that created campaign.");

        (bool sent, ) = payable(_project.projectOwner).call{value: _project.currentFunds}("");
        require(sent, "Failed to send Ether"); 

        _project.currentFunds = 0;
        projects[_id] = _project;
    }

    function releaseFunds(uint _id) external {
        Project memory _project = projects[_id];

        require(_project.id > 0 && _project.id <= projectsCount);
        require(!_project.isFunded);

        for (uint index = 0; index < _project.transactionIds.length; index++) {
            uint _txId = _project.transactionIds[index];
            Transaction memory _tx = transactions[_txId];
            console.log(
            "Transaction release: to %s - %s tokens",
            _tx.sender,
            _tx.value
            );
            (bool sent, ) = (_tx.sender).call{value: _tx.value}("");
            require(sent, "Failed to send Ether"); 
        }
    
    }

    function getWalletBalance() external view returns (uint) {
        console.log(wallet);
        console.log(address(wallet).balance);
        console.log(msg.sender);
        console.log(address(msg.sender).balance);
        console.log(address(this));
        console.log(address(this).balance);
        return address(this).balance;
    }

    function getProjectTransactions(uint _projectId) public view returns (Transaction[] memory) {
        Project storage project = projects[_projectId];
        uint[] memory ids = project.transactionIds;
        Transaction[] memory projectTransactions = new Transaction[](ids.length);

        for (uint i = 0; i < ids.length; i++) {
            projectTransactions[i] = transactions[ids[i]];
        }

        return projectTransactions;
    }

    function getAllProjects() public view returns (Project[] memory) {
         if(projectsCount > 0){
            return projectsArray;
        }else{
            revert("No projects existing.");
        }
    }

    function getProjectById(uint _id) public view returns (Project memory){
        return projects[_id];
    }
}
