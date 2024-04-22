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
    const { userId, project_name, description, goal, tag, location, timeToFund } = req.body;
    const images = req.files;

    const imagesNames = [];
    images.forEach(element => {
        imagesNames.push(element.filename);
    });

    try {
        const project = await Campaign.createProject(userId, project_name, description, goal, timeToFund, tag, location, imagesNames);
        console.log(project);
        res.status(201).json(project);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
};

const getProjectsList = async (req, res) => {
    try {
        const projects = await Campaign.getAllProjects();

        const formattedProjects = await Promise.all(projects.map(formatProject))

        //console.log(formattedProjects);

        res.status(200).json(formattedProjects);
    } catch (error) {
        //console.log(error);
        res.status(500).json({ error: "Failed to get projects list" });
    }
};

const getProjectById = async (req, res) => {
    try {
        const project = await Campaign.getProjectById(req.params.id);

        const formattedProject = await formatProject(project);

        //console.log(formattedProject);

        if (!project) res.status(404).json({ error: "Project not found" });

        res.status(200).json(formattedProject);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to get your data" });
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
        console.error(error);
        res.status(500).json({ error: "Failed to update" });
    }
};

const deleteProject = async (req, res) => {
    try {
        console.log(req.params.id);
        await Project.findByIdAndDelete(req.params.id);

        res.status(200).json({ message: "Prompt deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to delete" });
    }
};

const getUsersProjects = async (req, res) => {
    try {

        const prompts = await Project.find({ creator: req.params.id }).populate('creator');

        res.status(200).json(prompts);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to get your data" });
    }
};

const fundProject = async (req, res) => {
    try {
        const { tx } = req.body;
        const id = req.params.id;
        const { from, to, hash, value } = tx;

        const data = await Campaign.fundProject(id, hash, from, {value: value});
        console.log(data);
        res.status(200).json(tx);
        //if (response.success) {
        // const existingProject = await Project.findById(id);
        // if (!existingProject) return res.status(404).json({ error: "Project not found" });

        // const projectsSC = await Campaign.getAllProjects();
        // let walletAddress = "";

        // projectsSC.forEach(element => {
        //     if(element.name == existingProject.project_name){
        //         console.log("Found project wallet: " + element.projectOwner)
        //         walletAddress = element.projectOwner;
        //     }
        // });

        // existingProject.currentFunds += amount;
        // existingProject.donates.push(new {
        //     address,
        //     amount
        // });

        // if(existingProject.currentFunds == existingProject.goal){
        //     //SEND NOTIFICATION --- TO DO
        // }

        //await existingProject.save();
        // res.status(200).json(existingProject);
        //}

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Failed to donate." });
    }
}

const formatProject = async (project) => {
    const [id, userId, name, description, projectOwner, isFunded, goal, tag, location, images, unlockTime, currentFunds, funders, donations] = project;

    // Fetch creator data asynchronously
    const creator = await User.findById(userId);

    return {
        id: id.toNumber(),
        creator,
        project_name: name,
        description,
        projectOwner,
        isFunded,
        goal: goal.toNumber(),
        tag,
        location,
        images,
        unlockTime: unlockTime.toNumber(),
        currentFunds: ethers.utils.formatEther(currentFunds),
        funders,
        donations
    };
};

module.exports = { addNewProject, getProjectsList, getProjectById, getUsersProjects, editProduct, deleteProject, fundProject };