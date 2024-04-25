const mongoose = require('mongoose');
require("dotenv").config();

let isConnected = false; //track the connection status
let connectionPromise = null;

const connectToMongoDb = async () => {
    mongoose.set('strictQuery', true);

    if (isConnected) {
        console.log('MongoDB is already connected,')
        return;
    }

    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            dbName: "share_prompt"
        })
        const db = mongoose.connection;
        db.on('error', console.error.bind(console, 'Connection error:'));
        console.log(mongoose.connection.readyState);
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
        isConnected = true;

    } catch (error) {
        console.log(error);
    }
    await connectionPromise;

}

module.exports = {connectToMongoDb};