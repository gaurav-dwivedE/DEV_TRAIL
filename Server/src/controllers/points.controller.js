import pointsModel from "../models/points.model.js";

// const getLeaderboard = async (req, res) => {
//   try {
//     const { from, to } = req.query;

//     const leaderboard = await pointsModel.aggregate([
//       {
//         $match: {
//           createdAt: {
//             $gte: new Date(from),
//             $lte: new Date(to),
//           },
//         },
//       },
//       {
//         $group: {
//           _id: "$user",                 // userId
//           totalPoints: { $sum: "$points" },
//         },
//       },
//       {
//         $sort: { totalPoints: -1 },
//       },
//       {
//         $limit: 10,
//       },
//       {
//         $lookup: {
//           from: "users",                // collection name (IMPORTANT)
//           localField: "_id",
//           foreignField: "_id",
//           as: "user",
//         },
//       },
//       {
//         $unwind: "$user",
//       },
//       {
//         $project: {
//           _id: 0,
//           totalPoints: 1,
//           user: {
//             _id: "$user._id",
//             name: "$user.name",
//             email: "$user.email",
//             // add more fields if needed
//           },
//         },
//       },
//     ]);

//     res.status(200).json({ leaderboard });

//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

const getLeaderboard = async (req, res) => {
  try {
    const { from, to } = req.query;

    if (!from || !to) {
      return res.status(400).json({ error: "From and To dates required" });
    }

    // Convert DD-MM-YYYY to proper Date
    const parseDate = (dateString, isEnd = false) => {
      const [day, month, year] = dateString.split("-");

      if (isEnd) {
        return new Date(year, month - 1, day, 23, 59, 59, 999);
      }

      return new Date(year, month - 1, day, 0, 0, 0, 0);
    };

    const fromDate = parseDate(from);
    const toDate = parseDate(to, true);

    const leaderboard = await pointsModel.aggregate([
      {
        $match: {
          createdAt: {
            $gte: fromDate,
            $lte: toDate,
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
      {
        $lookup: {
          from: "users", // must match actual collection name
          localField: "_id",
          foreignField: "_id",
          as: "user",
        },
      },
      {
        $unwind: "$user",
      },
      {
        $project: {
          _id: 0,
          totalPoints: 1,
          user: {
            _id: "$user._id",
            name: "$user.name",
            email: "$user.email",
          },
        },
      },
    ]);

    res.status(200).json({ leaderboard });

  } catch (error) {
    console.error("Leaderboard Error:", error);
    res.status(500).json({ error: error.message });
  }
};


export default { getLeaderboard };
