import { connectToDB } from "@utils/database";
import Project from '@models/project';

export const GET = async (req, {params}) => {
    try {
        await connectToDB();
        
        const prompts = await Project.find({creator: params.id}).populate('creator');

        return new Response(JSON.stringify(prompts), {status:200});
    } catch (error) {
        return new Response("Failed to get your data", {status: 500}); 
    }
}
