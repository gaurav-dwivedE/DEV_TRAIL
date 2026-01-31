import logModel from "../models/logs.model.js";

const createLog = async (req,res) =>{
    try {
        const {title,description} = req.body || {}
        let log = await logModel.create({title,description})

        res.status(201).json({
            message:"Log created successfully",
            log
        })

    } catch (error) {
        res.status(500).json({
            error
        })
    }

}


export default {createLog}