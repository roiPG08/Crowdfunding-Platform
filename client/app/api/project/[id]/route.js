//GET 
import { connectToDB } from "@utils/database";
import Project from '@models/project';

export const GET = async (req, { params }) => {
    try {
        await connectToDB();

        const prompt = await Project.findById(params.id).populate('creator');
        if (!prompt) return new Response("Prompt not found", { status: 404 });
        return new Response(JSON.stringify(prompt), { status: 200 });
    } catch (error) {
        return new Response("Failed to get your data", { status: 500 });
    }
}


//Patch
export const PATCH = async (req, { params }) => {
    const { project_name, tag } = await req.json();
    try {
        await connectToDB();

        const existingProject = await Project.findById(params.id);
        if (!existingProject) return new Response("Project not found", { status: 404 });

        existingProject.project_name = project_name;
        existingProject.tag = tag;

        await existingProject.save();
        return new Response(JSON.stringify(prompts), { status: 200 });
    } catch (error) {
        return new Response("Failed to update.", { status: 500 });
    }
}

//Delete
export const DELETE = async (req, { params }) => {
    try {
        await connectToDB();

        await Project.findByIdAndRemove(params.id);

        return new Response("Prompt deleted successfully.", { status: 200 });
    } catch (error) {
        return new Response("Failed to delete", { status: 500 });
    }
}