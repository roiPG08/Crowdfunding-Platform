const express = require('express');
const router = express.Router();
const Project = require('../../models/project');
const { connectToDB } = require("../../utils/database.js");
// const Campaign = require('./../../contracts/Campaign.sol');

const addNewProject = async (req, res) => {
    const { userId, project_name, description, goal, tag } = req.body;

    try {
        const newProject = new Project({
            creator: userId,
            project_name,
            description,
            goal,
            tag
        })

        await newProject.save();

        res.status(201).json(newProject);
    } catch (error) {
        res.status(500).json({ error: "Failed to create a new prompt" });
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
}

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
    console.log(req.body);
    const { project_name, description, goal, tag } = req.body;
    try {
        console.log(req.body);
        const existingProject = await Project.findById(id);
        if (!existingProject) return res.status(404).json({ error: "Project not found" });

        existingProject.project_name = project_name;
        existingProject.description = description;
        existingProject.goal = goal;
        existingProject.tag = tag;

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

module.exports = { addNewProject, getProjectsList, getProductById, getUsersProjects, editProduct, deleteProject };