import { connectToDB } from "/utils/database";
import Project from '/models/project';

const express = require('express');
const app = express();
const cors = require("cors");
const PORT = 8080;

app.use(cors());

app.get("/api/home", (req, res) => {
    res.json({ message: "Hello World!"});
});

app.listen(PORT, ()=>{
    console.log(`server started on port ${PORT}`);
});



app.get("api/", async (req, res) => {
    try {
        await connectToDB();
        
        const projects = await Project.find({}).populate('creator');

        return new Response(JSON.stringify(projects), {status:200});
    } catch (error) {
        return new Response("Failed to get your data", {status: 500}); 
    }
}); 
