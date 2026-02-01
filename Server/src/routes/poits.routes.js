import { Router } from "express";
import pointsController from "../controllers/points.controller.js";

const router = Router();

router.get("/leaderboard", pointsController.getLeaderboard)


export default router;

