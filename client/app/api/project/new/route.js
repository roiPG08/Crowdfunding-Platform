import { connectToDB } from "@utils/database";
import Project from '@models/project';

export const POST = async (req) => {
    const {userId, project_name, description, goal, tag} = await req.json();

    try {
        await connectToDB();
        const newProject = new Project({
            creator: userId,
            project_name,
            description,
            goal,
            tag
        })
        
        await newProject.save();

        return new Response(JSON.stringify(newProject), {status:201});
    } catch (error) {
        return new Response("Failed to create a new prompt", {status: 500}); 
    }
}
