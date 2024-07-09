import mongoose from "mongoose";  // Import mongoose to connect the DB server with the actual server
import dotenv from "dotenv";

dotenv.config();
// const mongoUrl = process.env.MONGO_URL_LOCAL;
const mongoUrl = process.env.MONGO_URL;

mongoose.connect(mongoUrl, {       // Make connection to MongoDB URL
    useNewUrlParser: true,         // This option is deprecated in newer Mongoose versions
    useUnifiedTopology: true       // This option is deprecated in newer Mongoose versions
});

const db = mongoose.connection;    // db object now going to use

db.on('connected', () => {         // Some inbuilt functions of mongoose
    console.log("DB is connected");
});

db.on('disconnected', () => {
    console.log("DB is disconnected");
});

db.on('error', (error) => {
    console.log("Error occurred: ", error); // Log the error details
});

export default db;

