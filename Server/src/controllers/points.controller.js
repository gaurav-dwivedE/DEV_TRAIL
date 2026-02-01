import pointsModel from "../models/points.model.js";


const getLeaderboard = async (req, res) => {
    try {
        const from = req.query.from;
        const to = req.query.to;

        const leaderboard = await pointsModel.aggregate([
            {
                $match: {
                    createdAt: {
                        $gte: new Date(from),
                        $lte: new Date(to),
                    },
                },
            },
            {
                $group: {
                    _id: "$user",
                    totalPoints: { $sum: "$points" },
                },
            },
            {
                $sort: { totalPoints: -1 },
            },
            {
                $limit: 10,
            },
        ]);

        res.status(200).json({
            leaderboard,
        });

    } catch (error) {
        res.status(500).json({
            error: error.message,
        });
    }
}

export default {  getLeaderboard };
