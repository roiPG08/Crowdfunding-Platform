const API_KEY = process.env.API_KEY;
const CONTRACT_ADDRESS = process.env.LOCALHOST_CONTRACT_ADDRESS;
const PRIVATE_KEY = process.env.LOCALHOST_PRIVATE_KEY;

const ethers = require('ethers');
const Project = require('../../models/project');
const { connectToDB } = require("../../utils/database.js");

const provider = new ethers.providers.JsonRpcProvider();
const signer = new ethers.Wallet(PRIVATE_KEY, provider);
const {abi} = require("./../../artifacts/contracts/Campaign.sol/Campaign.json");
const Campaign = new ethers.Contract(CONTRACT_ADDRESS, abi, signer);

const addNewProject = async (req, res) => {
    const { userId, project_name, description, goal, tag, location, timeToFund } = req.body;
    const images = req.files;

    const imagesNames = [];
    images.forEach(element => {
        imagesNames.push(element.filename);
    });
    
    const project = await Campaign.createProject({
        creator: userId,
        project_name: project_name,
        description: description,
        wallet: "TO DO",
        currentFunds: 0,
        goal: goal,
        donates: [],
        timeToFund: timeToFund,
        tag: tag,
        location: location,
        images: imagesNames
    });

    console.log(project);

    try {
        const newProject = new Project({
            creator: userId,
            project_name: project_name,
            description: description,
            wallet: "TO DO",
            currentFunds: 0,
            goal: goal,
            donates: [],
            timeToFund: timeToFund,
            tag: tag,
            location: location,
            images: imagesNames
        });

        await newProject.save();

        res.status(201).json(newProject);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getProjectsList = async (req, res) => {
    try {
        connectToDB();
        const projects = await Project.find({}).populate('creator');

        res.status(200).json(projects);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Failed to get projects list" });
    }
};

const getProductById = async (req, res) => {
    try {
        const prompt = await Project.findById(req.params.id).populate('creator');

        if (!prompt) res.status(404).json({ error: "Prompt not found" });

        res.status(200).json(prompt);
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
        const { address, amount } = req.body;
        const id = req.params.id;
        
        const tx = {
            from: address,
            to: existingProject.contractAddress,
            value: web3.utils.toWei(amount, 'ether'),
            gas: 2000000,
            data: contract.methods.fundProject().encodeABI() // replace with your contract's method
        };

        if (response.success) {
            const existingProject = await Project.findById(id);
            if (!existingProject) return res.status(404).json({ error: "Project not found" });
            
            existingProject.currentFunds += amount;
            existingProject.donates.push(new {
                address,
                amount
            });

            if(existingProject.currentFunds == existingProject.goal){
                //SEND NOTIFICATION --- TO DO
            }

            await existingProject.save();
            res.status(200).json(existingProject);
        }else{

        }

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Failed to get projects list" });
    }
}

module.exports = { addNewProject, getProjectsList, getProductById, getUsersProjects, editProduct, deleteProject, fundProject };