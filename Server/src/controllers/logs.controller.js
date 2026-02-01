import logModel from "../models/logs.model.js";
import mongoose from "mongoose";
import pointsModel from "../models/points.model.js";
import userModel from "../models/user.model.js";

const createLog = async (req, res) => {
   const session = await mongoose.startSession();
   session.startTransaction();

  try {

    const userId = "697b5319d4c2bc5f718218d9"; // Replace with logged-in user ID
    const { title, description } = req.body || {};

    const log = await logModel.create(
      [
        {
          user: userId,
          title,
          description,
        },
      ],
      { session }
    );

    console.log(log);
    
   
    await pointsModel.create(
      [
        {
          user: userId,
          points: 10,
          logId: log[0]._id  // using session thats why log[0] at the time of creation log is an array
        },
      ],
      { session }
    );

    await userModel.findByIdAndUpdate(
      userId,
      { $inc: { totalPoints: 10 } },
      { new: true, session }
    );


    await session.commitTransaction();
    session.endSession();

    res.status(201).json({
      message: "Log created successfully",
      log: log[0] // using session thats why log[0] at the time of creation log is an array
    });

  } catch (error) {
    await session.abortTransaction();
    session.endSession();

    res.status(500).json({
      error: error.message,
    });
    console.log(error.message);
    
  }
};

const getPublicLogs = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit

        const logs = await logModel.find({isPrivate: false}).populate({ 
            path:'user',
            select: "-password -__v -createdAt -updatedAt"
        })
        .skip(skip)
        .limit(limit)
        .sort({createdAt: -1})

        const totalLogs = await logModel.countDocuments({ isPrivate: false });
        res.status(200).json({
            page,
            limit,
            totalLogs,
             hasMore: skip + logs.length < totalLogs, // return true or false
            logs
        });

    } catch (error) {
        
    }

}

const getLogById = async (req,res) =>{
    try {
        const userId = "697b5319d4c2bc5f718228d9" // Logged in user id

        const logId = req.params.logId
        let log = await logModel.findById(logId).populate({
            path: "user",
            select: "-password -__v -createdAt -updatedAt"
        })

        if(!log){
            return res.status(404).json({
                message:"Log not found"
            })
        }
 
        if(log.isPrivate){
            if(log.user._id.toString() !== userId){
            return res.status(403).json({
                message:"Access denied"
            })  
            }
        }

        res.status(200).json({
            message:"Log retrieved successfully",
            log
        })

    }
 catch (error) {
        res.status(500).json({
            error: error.message
        })
    }

};

const getUsersLogs = async (req,res) =>{
    try {
        const userId = req.params.userId 
        let logs = await logModel.find({user: userId}).populate({
            path: "user",
            select: "-password -__v -createdAt -updatedAt"
        })

        if(!logs.length){
            return res.status(404).json({
                message:"Log not found"
            })
        }
        
        if(logs.isPrivate){
            if(logs.user._id.toString() !== userId){
            return res.status(403).json({
                message:"Access denied"
            })  
            }
        }

        res.status(200).json({
            message:"Log retrieved successfully",
            logs
        })

    }
 catch (error) {
        res.status(500).json({
            error: error.message
        })
    }

};

const updateIsPrivate = async (req, res) => {
  try {
    const userId = "697b5319d4c2bc5f718218d9"; // logged-in user
    const { logId } = req.params;
    const { isPrivate } = req.body;

    const log = await logModel.findById(logId);

    if (!log) {
      return res.status(404).json({
        message: "Log not found"
      });
    }

    // only owner can change privacy
    if (log.user.toString() !== userId) {
      return res.status(403).json({
        message: "You are not allowed to change privacy"
      });
    }

    log.isPrivate = isPrivate;
    await log.save();

    res.status(200).json({
      message: "Log privacy updated successfully",
      log:{
        _id: log._id,
        isPrivate: log.isPrivate
      }
    });

  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
};

const updateLog = async (req, res) => {
  try {
    const userId = "697b5319d4c2bc5f718218d9"; // logged-in user
    const { logId } = req.params;
    const { title, description } = req.body || {};

    const log = await logModel.findById(logId);

    if (!log) {
      return res.status(404).json({
        message: "Log not found"
      });
    }

    if (log.user.toString() !== userId) {
      return res.status(403).json({
        message: "You are not allowed to update this log"
      });
    }

    if (title) log.title = title;
    if (description) log.description = description;

    await log.save();

    res.status(200).json({
      message: "Log updated successfully",
      log
    });

  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
};

const deleteLog = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    
    const userId = "697b5319d4c2bc5f718218d9";
    const { logId } = req.params;

    const log = await logModel.findOneAndDelete({
      _id: logId,
      user: userId
    }, { session });

    console.log(log);
    
    if (!log) {
      return res.status(404).json({
        message: "Log not found"
      });
    }

    await pointsModel.deleteOne({ user: userId, logId: log._id }, { session });
     await userModel.findByIdAndUpdate(
      userId,
      { $inc: { totalPoints: -10 } },
      { new: true, session }
    );

    await session.commitTransaction();
    session.endSession();

    res.status(200).json({
      message: "Log deleted successfully"
    });

  } catch (error) {
    await session.abortTransaction();
    session.endSession();

    res.status(500).json({
      error: error.message
    });
  }
};


export default {createLog, getLogById, updateIsPrivate, updateLog, getPublicLogs, deleteLog, getUsersLogs
  
}