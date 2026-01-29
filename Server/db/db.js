import mongoose from "mongoose";

async function connect_db(){
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("Database has been connected");
        
    } catch (error) {
        console.log("Database has been not connected ",error.message);
        
    }
}

export default connect_db;