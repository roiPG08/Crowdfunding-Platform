const router = require('express').Router();
const Project = require('../../models/project');

const getProducts = async (req, res) => {
    const { userId, project_name, description, goal, tag } = await req.json();

    try {
        const newProject = new Project({
            creator: userId,
            project_name,
            description,
            goal,
            tag
        })

        await newProject.save();

        return new Response(JSON.stringify(newProject), { status: 201 });
    } catch (error) {
        return new Response("Failed to create a new prompt", { status: 500 });
    }
};


const getProductById = async (req, res) => {
    try {
        const prompt = await Project.findById(req.params.id).populate('creator');

        if (!prompt) return res.status(404).json({ error: "Prompt not found" });

        return res.status(200).json(prompt);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Failed to get your data" });
    }
};

const editProduct = async (req, res) => {
    const { project_name, tag } = req.body;
    try {
        const existingProject = await Project.findById(req.params.id);
        if (!existingProject) return res.status(404).json({ error: "Project not found" });

        existingProject.project_name = project_name;
        existingProject.tag = tag;

        await existingProject.save();
        return res.status(200).json(existingProject);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Failed to update" });
    }
};

const deleteProject = async (req, res) => {
    try {
        await Project.findByIdAndRemove(req.params.id);

        return res.status(200).json({ message: "Prompt deleted successfully" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Failed to delete" });
    }
};

module.exports = { getProducts, getProductById, editProduct, deleteProject };