import mongoose from "mongoose";
import { config } from "dotenv";
config();
export default async function db() {
    try {
        await mongoose.connect(process.env.MONGODB_URL)
        console.log('Mongodb connected successfully')
    } catch (error) {
        console.log("mongoose connection error:", error)
        console.log("Server will start without database connection for testing purposes")
        // process.exit(1); // Commented out to allow server to start
    }
}