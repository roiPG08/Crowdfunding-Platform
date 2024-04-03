// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract Campaign {

    string public name;
    uint public projectsCount = 0;
    address payable public owner; //responsible for holding all funds?
    uint public unlockTime;

    mapping(uint => Project) public projects;
    Project[] public projectsArray;

    struct Project {
        uint id;
        string name;
        string description;
        address payable projectOwner; 
        address payable fundsWallet; //later to be replaced by autonomic address / not related with creator
        bool isFounded;
        uint goal;
        uint currentFounds;
        address[] funders;
        string tag;
        string location;
        string[] images;
    }

    event ProjectCreated(
        uint id,
        string name,
        address payable owner,
        bool isFounded,
        uint goal,
        uint currentFounds
    );

    event ProjectFunded(
        uint id,
        string name,
        uint currentFounds,
        address payable owner,
        bool isFounded
    );

    constructor() {
        owner = payable(msg.sender);
    }

    function createProject(string memory _name, string memory _description, uint256 _goal, uint256 _fundEndTime, string memory _tag, string memory _location, string[] memory _images) public {
        require(bytes(_name).length > 0);
        require(_fundEndTime < block.timestamp, "The deadline should be a date in the future.");
        require(_goal > 0);
        projectsCount++;

        address[] memory funders;
        //msg.sender is the address of the user creating the product.
        Project memory project = Project(projectsCount, _name, _description, payable(msg.sender), payable(msg.sender),  false, _goal, 0, funders, _tag, _location, _images);
        projects[projectsCount] = project;
        projectsArray.push(project);

        emit ProjectCreated(projectsCount, _name, payable(msg.sender), false, _goal, 0);
    }

    function fundProject(uint _id, uint _amount) public payable {
        Project memory _project = projects[_id];

        address payable _fundsHolder = _project.projectOwner;

        require(_project.id > 0 && _project.id <= projectsCount);
        require(msg.value <= _project.currentFounds); //is it necessary? 
        require(!_project.isFounded); //once again, is it necessary?
        require(_fundsHolder != msg.sender); //is it ?

        _project.currentFounds += _amount;

        if(_project.currentFounds == _project.goal)
            _project.isFounded = true;
        
        projects[_id] = _project;

        _fundsHolder.transfer(msg.value);

        emit ProjectFunded(projectsCount, _project.name, _project.currentFounds, payable(msg.sender), _project.isFounded);
    }

    function withdraw(uint _id) external {
        Project memory _project = projects[_id];

        require(_project.id > 0 && _project.id <= projectsCount);
        require(_project.isFounded);

        payable(msg.sender).transfer(_project.currentFounds);
    }

    function getFundsHolderBalance() external view returns (uint){
        return address(this).balance;
    }

    function getAllProjects() public view returns (Project[] memory) {
        return projectsArray;
    }
}