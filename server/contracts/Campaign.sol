// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "hardhat/console.sol";

contract Campaign {
    uint public projectsCount = 0;
    address payable public wallet; //holds all campaigns funds.

    mapping(uint256 => Project) public projects;
    Project[] public projectsArray;

    struct Project {
        uint id;
        string creatorId;
        string name;
        string description;
        address payable projectOwner;
        bool isFunded;
        uint goal;
        string tag;
        string location;
        string[] images;
        uint unlockTime;
        uint currentFunds;
        address[] funders;
        uint[] donations;
        string[] transactions;
    }

    event ProjectCreated(
        uint id,
        string creatorId,
        string name,
        string description,
        address payable projectOwner,
        bool isFunded,
        uint goal,
        string tag,
        string location,
        string[] images,
        uint256 unlockTime,
        uint currentFunds,
        address[] funders,
        uint[] donations,
        string[] transactions
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
        address sender,
        address recipient
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
        uint256 _goal,
        uint256 _fundEndTime,
        string memory _tag,
        string memory _location,
        string[] memory _images
    ) public {

        require(bytes(_name).length > 0);
        require(
            _fundEndTime < block.timestamp,
            "The deadline should be a date in the future."
        );
        require(_goal > 0);

        address[] memory funders;
        uint[] memory donations;
        string[] memory transactions;

        Project memory project = Project(
            projectsCount,
            _creatorId,
            _name,
            _description,
            payable(msg.sender),
            false,
            _goal,
            _tag,
            _location,
            _images,
            _fundEndTime,
            0,
            funders,
            donations,
            transactions
        );

        projects[projectsCount] = project;
        projectsArray.push(project);

        projectsCount++;

        // emit ProjectCreated(
        //     projectsCount,
        //     _creatorId,
        //     _name,
        //     _description,
        //     payable(msg.sender),
        //     false,
        //     _goal,
        //     _tag,
        //     _location,
        //     _images,
        //     _fundEndTime,
        //     0,
        //     funders,
        //     donations
        // );
    }

    function fundProject(uint256 _id, string memory _hash, address _from ) public payable {
        uint amount = msg.value;
        Project storage _project = projects[_id];

            console.log(
                "Transaction: %s from %s - %s tokens",
                _hash,
                _from,
                amount
            );

        require(_project.id >= 0 && _project.id <= projectsCount);
        require(!_project.isFunded);

        _project.currentFunds += amount;
        _project.donations.push(amount);
        _project.funders.push(_from);
        _project.transactions.push(_hash);

        if (_project.currentFunds == _project.goal) {
            _project.isFunded = true;
        }

        projects[_id] = _project;

        emit TransactionSent(_id, _hash, amount, msg.sender, wallet);
    }

    function withdrawFunds(uint _id) external {
        Project memory _project = projects[_id];

        require(_project.id > 0 && _project.id <= projectsCount);
        require(_project.isFunded);

        payable(msg.sender).transfer(_project.currentFunds);
    }

    function getFundsHolderBalance() external view returns (uint) {
        return address(this).balance;
    }

    function getAllProjects() public view returns (Project[] memory) {
         if(projectsCount > 0){
            return projectsArray;
        }else{
            revert("No projects existing.");
        }
    }

    function getProjectById(uint256 _id) public view returns (Project memory){
        return projects[_id];
    }
}
