import mongoose from "mongoose";

const pointsSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true // for faster queries on user points
    },
    points: {
      type: Number,
      required: true
    },
    logId:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Log",
      required: true,
      index: true // for tracking points per log
    } // if we don't store logId here so we can't delete points when log is deleted because we won't know which points to delete because date of log creation may be different than date of points creation
  },
  { timestamps: true } // createdAt is important for weekly/monthly leaderboard
);
const pointsModel =  mongoose.model("Points", pointsSchema);

export default pointsModel;
