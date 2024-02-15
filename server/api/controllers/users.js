const router = require('express').Router();
const Project = require('../../models/user');

const getUsersProjects = async (req, res) => {
    try {
                
        const prompts = await Project.find({ creator: req.params.id }).populate('creator');

        return res.status(200).json(prompts);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Failed to get your data" }); 
    }
};

module.exports = {getUsersProjects};