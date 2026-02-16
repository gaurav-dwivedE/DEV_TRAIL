import { Router } from "express";
import pointsController from "../controllers/points.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/leaderboard", authMiddleware, pointsController.getLeaderboard)


export default router;

