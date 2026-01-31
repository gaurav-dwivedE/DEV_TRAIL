import mongoose from "mongoose";

const logSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type: String,
        required: true
    },
    
},{timestamps: true})

const logModel = mongoose.model("Log", logSchema);

export default logModel;
