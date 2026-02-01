import mongoose from "mongoose";

const logSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    title:{
        type:String,
        required:true,
        minLength: 5
    },
    isPrivate:{
        type: Boolean,
        default: false
    },
    description:{
        type: String,
        required: true,
        minLength: 10
    },
    
},{timestamps: true})

const logModel = mongoose.model("Log", logSchema);

export default logModel;
