const API_KEY = process.env.API_KEY;
const CONTRACT_ADDRESS = process.env.LOCALHOST_CONTRACT_ADDRESS;
const PRIVATE_KEY = process.env.LOCALHOST_PRIVATE_KEY;

const ethers = require('ethers');
const Project = require('../../models/project');
const User = require('../../models/user');
const { connectToDB } = require("../../utils/database.js");

const provider = new ethers.providers.JsonRpcProvider();
const signer = new ethers.Wallet(PRIVATE_KEY, provider);
const { abi } = require("./../../artifacts/contracts/Campaign.sol/Campaign.json");
const Campaign = new ethers.Contract(CONTRACT_ADDRESS, abi, signer);

const addNewProject = async (req, res) => {
    const { userId, project_name, description, address, goal, tag, /*location,*/ timeToFund, createdAt } = req.body;
    const images = req.files;

    const imagesNames = [];
    images.forEach(element => {
        imagesNames.push(element.filename);
    });

    try {
        const project = await Campaign.createProject(userId, project_name, description, address, goal, timeToFund, createdAt, tag, /*location,*/ imagesNames);
        //console.log(project);
        res.status(201).json(project);
    } catch (error) {
        //console.log(error);
        res.status(500).json({ error: `Failed to create new project. Error: ${error.message}` });
    }
};


const getProjectsList = async (req, res) => {
    try {
        const projects = await Campaign.getAllProjects();
        //console.log(projects);
        const formattedProjects = await Promise.all(projects.map(formatProject))

        res.status(200).json(formattedProjects);
    } catch (error) {
        res.status(500).json({ error: `Failed to retrieve projects list. Error: ${error.message}` });
    }
};

const getProjectById = async (req, res) => {
    try {
        const project = await Campaign.getProjectById(req.params.id);
        //console.log(project);
        const formattedProject = await formatProject(project);

        if (!project) res.status(404).json({ error: "Project not found" });

        res.status(200).json(formattedProject);
    } catch (error) {
        res.status(500).json({ error: `Failed to retrieve data. Error: ${error.message}` });
    }
};

const getProjectTransactions = async (req, res) => {
    try {
        const { id } = req.params.id;

        const request = await Campaign.releaseFunds(id);
        
        res.status(200).json(request);
    } catch (error) {
        res.status(500).json({ error: `Failed to donate. Error: ${error.message}` });
    }
};

const getUsersProjects = async (req, res) => {
    try {

        const prompts = await Project.find({ creator: req.params.id }).populate('creator');

        res.status(200).json(prompts);
    } catch (error) {
        res.status(500).json({ error: `Failed to retrieve data. Error: ${error.message}` });
    }
};

const getPlatformBalance = async (req, res) => {
    try {
        const balance = await Campaign.getWalletBalance();
        //console.log(balance);
        res.status(200).json(ethers.utils.formatEther(balance));
    } catch (error) {
        res.status(500).json({ error: `Failed to connect. Error: ${error.message}` });
    }
};

const collectFunds = async (req, res) => {
    try {
        const { id, address } = req.body;

        const request = await Campaign.withdrawFunds(id, address);
        
        res.status(200).json(request);
    } catch (error) {
        res.status(500).json({ error: `Failed to collect funds. Error: ${error.message}` });
    }
};

const generateBalance = async (req, res) => {
    try {
        const request = await Campaign.withdrawFunds();
        
        res.status(200).json(request);
    } catch (error) {
        res.status(500).json({ error: `Failed to generate funds. Error: ${error.message}` });
    }
};

const releaseFunds = async (req, res) => {
    try {
        const { id } = req.body;

        const request = await Campaign.releaseFunds(id);
        
        res.status(200).json(request);
    } catch (error) {
        res.status(500).json({ error: `Failed to release funds. Error: ${error.message}` });
    }
};

const editProduct = async (req, res) => {
    const { id } = req.params;
    const { project_name, description, tag, location } = req.body;

    const images = req.files;
    const imagesNames = [];
    images.forEach(element => {
        imagesNames.push(element.originalname);
    });

    try {
        const existingProject = await Project.findById(id);
        if (!existingProject) return res.status(404).json({ error: "Project not found" });

        existingProject.project_name = project_name;
        existingProject.description = description;
        existingProject.tag = tag;
        existingProject.location = location;
        existingProject.images = imagesNames;

        await existingProject.save();
        res.status(200).json(existingProject);
    } catch (error) {
        res.status(500).json({ error: `Failed to update project. Error: ${error.message}` });
    }
};

const deleteProject = async (req, res) => {
    try {
        console.log(req.params.id);
        await Project.findByIdAndDelete(req.params.id);

        res.status(200).json({ message: "Prompt deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: `Failed to delete project. Error: ${error.message}` });
    }
};

const fundProject = async (req, res) => {
    try {
        const { tx } = req.body;
        const id = req.params.id;
        const { from, to, hash, value } = tx;

        const data = await Campaign.fundProject(id, hash, from, {value: value});
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: `Failed to donate. Error: ${error.message}` });
    }
}

const formatProject = async (project) => {
    const [id, userId, name, description, projectOwner, isFunded, status, goal, tag, images, unlockTime, creationDate, currentFunds, transactions] = project;

    const creator = await User.findById(userId);

    return {
        id: id.toNumber(),
        creator,
        project_name: name,
        description,
        projectOwner,
        isFunded,
        status,
        goal: goal.toNumber(),//ethers.utils.formatEther(goal),//.toNumber(),
        tag,
        images,
        unlockTime: unlockTime.toNumber(),
        creationDate: creationDate.toNumber(),
        currentFunds: ethers.utils.formatEther(currentFunds),
        transactions
    };
};

module.exports = { addNewProject, getProjectsList, getProjectById, getUsersProjects, editProduct, deleteProject, generateBalance, fundProject, getProjectTransactions, releaseFunds, collectFunds, getPlatformBalance };