// const API_KEY = process.env.API_KEY;
// const PRIVATE_KEY = process.env.LOCALHOST_PRIVATE_KEY;
const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_LOCALHOST_CONTRACT_ADDRESS;
import { ethers } from 'ethers';
import  User  from "../models/user"
import { connectToDB } from "@utils/database.js";
import  abi  from "../artifacts/contracts/Campaign.sol/Campaign.json";


// const provider = new ethers.providers.JsonRpcProvider();
// const signer = new ethers.Wallet(PRIVATE_KEY, provider);

const connectToMetamask = () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const Campaign = new ethers.Contract(CONTRACT_ADDRESS, abi, signer);    
}

//should pass whole project object
const addNewProject = async ( project ) => {
    const { userId, project_name, description, address, goal, tag, timeToFund, createdAt } = req.body;
    const images = [];

    const imagesNames = [];
    images.forEach(element => {
        imagesNames.push(element.filename);
    });

    try {
        const project = await Campaign.createProject(userId, project_name, description, address, goal, timeToFund, createdAt, tag, imagesNames);

        res.status(201).json(project);
    } catch (error) {
        res.status(500).json({ error: `Failed to create new project. Error: ${error.message}` });
    }
};


const getProjectsList = async () => {
    try {
        console.log("GIT");
        const projects = await Campaign.getAllProjects();

        console.log(projects);

        const formattedProjects = await Promise.all(projects.map(formatProject))

        res.status(200).json(formattedProjects);
    } catch (error) {
        res.status(500).json({ error: `Failed to retrieve projects list. Error: ${error.message}` });
    }
};

const getProjectById = async (projectId) => {
    try {
        const project = await Campaign.getProjectById(projectId);

        const formattedProject = await formatProject(project);

        if (!project) console.log({ error: "Project not found" });

        res.status(200).json(formattedProject);
    } catch (error) {
        res.status(500).json({ error: `Failed to retrieve data. Error: ${error.message}` });
    }
};

const getProjectTransactions = async (projectId) => {
    try {
        const request = await Campaign.getProjectTransactions(projectId);

        console.log(request);
    } catch (error) {
        console.log({ error: `Failed to donate. Error: ${error.message}` });
    }
};

/// TO DO ///
const getUsersProjects = async (projectId) => {
    // try {
    //     const prompts = await Project.find({ creator: projectId }).populate('creator');

    //     res.status(200).json(prompts);
    // } catch (error) {
    //     res.status(500).json({ error: `Failed to retrieve data. Error: ${error.message}` });
    // }
};

const getPlatformBalance = async () => {
    try {
        const balance = await Campaign.getWalletBalance();

        console.log(ethers.utils.formatEther(balance));
    } catch (error) {
        console.log({ error: `Failed to connect. Error: ${error.message}` });
    }
};

const collectFunds = async (projectId, address) => {
    try {
        const request = await Campaign.withdrawFunds(projectId, address);

        console.log(request);
    } catch (error) {
        console.log({ error: `Failed to collect funds. Error: ${error.message}` });
    }
};

const releaseFunds = async (projectId) => {
    try {
        const request = await Campaign.releaseFunds(projectId);

        console.log(request);
    } catch (error) {
        console.log({ error: `Failed to release funds. Error: ${error.message}` });
    }
};

/// TO DO ///
const editProduct = async (req, res) => {
    // const { id } = req.params;
    // const { project_name, description, tag, location } = req.body;

    // const images = req.files;
    // const imagesNames = [];
    // images.forEach(element => {
    //     imagesNames.push(element.originalname);
    // });

    // try {
    //     const existingProject = await Project.findById(id);
    //     if (!existingProject) return res.status(404).json({ error: "Project not found" });

    //     existingProject.project_name = project_name;
    //     existingProject.description = description;
    //     existingProject.tag = tag;
    //     existingProject.location = location;
    //     existingProject.images = imagesNames;

    //     await existingProject.save();
    //     res.status(200).json(existingProject);
    // } catch (error) {
    //     res.status(500).json({ error: `Failed to update project. Error: ${error.message}` });
    // }
};

const deleteProject = async (projectId) => {
    try {
        await Project.findByIdAndDelete(projectId);

        console.log({ message: "Prompt deleted successfully" });
    } catch (error) {
        console.log({ error: `Failed to delete project. Error: ${error.message}` });
    }
};

const fundProject = async (req, res) => {
    try {
        const { tx } = req.body;
        const id = req.params.id;
        const { from, to, hash, value } = tx;

        const data = await Campaign.fundProject(id, hash, from, value);//{value: value}); passing msg.value provokes 
        console.log(data);
    } catch (error) {
        console.log({ error: `Failed to donate. Error: ${error.message}` });
    }
}

const formatProject = async (project) => {
    const [id, userId, name, description, projectOwner, isFunded, status, goal, tag, images, unlockTime, creationDate, currentFunds, transactions] = project;
    connectToDB();
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

export { addNewProject, getProjectsList, getProjectById, getUsersProjects, editProduct, deleteProject, fundProject, getProjectTransactions, releaseFunds, collectFunds, getPlatformBalance };