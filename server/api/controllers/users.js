const router = require('express').Router();
const User = require('../../models/user');
const Project = require('../../models/user');

const getUsersProjects = async (req, res) => {
    try {      
        const prompts = await Project.find({ creator: req.params.id }).populate('creator');
        const projects = await Campaign.getCreatorsProjects(req.params.id);
        res.status(200).json(prompts);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to get your data" }); 
    }
};

const getUserById = async (req, res) => {
    try {      
        const prompts = await User.findById(req.params.id);
       
        res.status(200).json(prompts);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to get your data" }); 
    }
};

module.exports = { getUsersProjects, getUserById };