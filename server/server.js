const { connectToDB } = require("./utils/database.js");
const express = require('express');
const cors = require("cors");
const bodyParser = require("body-parser");
const projectRoutes = require('./api/router/projects');
const userRoutes = require('./api/router/users');
const multer = require('multer');

const app = express();
const PORT = 8080;

const storage = multer.memoryStorage();
const upload = multer({storage: storage});

connectToDB();

app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
app.use(cors());

app.use('/api', projectRoutes);
app.use('/api', userRoutes);


app.listen(PORT, () => {
    console.log(`server started on port ${PORT}`);
});