import mongoose from "mongoose";  // Import mongoose to connect the DB server with the actual server
import dotenv from "dotenv";
dotenv.config();
// const mongoUrl = process.env.MONGO_URL_LOCAL;
const mongoUrl = process.env.MONGO_URL;

mongoose.connect(mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    ssl: true, // Enables SSL
    sslValidate: true, // Validates the SSL certificate
    tlsInsecure: true // Allows insecure connections (use with caution)
}).then(() => {
    console.log('DB is connected');
}).catch((err) => {
    console.error('DB connection error:', err);
});

const db = mongoose.connection;    // db object now going to use



db.on('disconnected', () => {
    console.log("DB is disconnected");
});

db.on('error', (error) => {
    console.log("Error occurred: ", error); // Log the error details
});

export default db;

