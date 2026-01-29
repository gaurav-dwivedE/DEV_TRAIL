import mongoose from "mongoose";

async function connect_db(){
    try {
        await mongoose.connect(process.env.MONGO_URI);
    } catch (error) {
        console.log("Database has not been connected");  
    }
}

export default connect_db;