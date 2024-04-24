import { connectToDB } from "@utils/database";
import User from '@models/user';

export const GET = async (req, {params}) => {
    try {
        await connectToDB();
        
        const user = await User.findById(params.id);
        console.log(user);
        return new Response(JSON.stringify(user), {status:200});
    } catch (error) {
        console.log(error);
        return new Response(`Failed to get your data. Error message: ${error.message}`, {status: 500}); 
    }
}
