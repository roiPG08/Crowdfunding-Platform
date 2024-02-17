const { connectToDB } = require("./utils/database.js");
const express = require('express');
const cors = require("cors");
const bodyParser = require("body-parser");
const projectRoutes = require('./api/router/projects');
const userRoutes = require('./api/router/users');

const app = express();
const PORT = 8080;

connectToDB();

app.use(cors());
app.use('/api', projectRoutes);
app.use('/api', userRoutes);
app.use(bodyParser.json());


app.listen(PORT, () => {
    console.log(`server started on port ${PORT}`);
});