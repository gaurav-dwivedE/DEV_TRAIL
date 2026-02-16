import { Router } from "express";
import logsController from "../controllers/logs.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/", authMiddleware, logsController.createLog)
router.get("/", authMiddleware, logsController.getPublicLogs)
router.get("/:logId", authMiddleware, logsController.getLogById)
router.get("/users/:userId", authMiddleware, logsController.getUsersLogs)
router.patch("/:logId", authMiddleware, logsController.updateIsPrivate)
router.put("/:logId", authMiddleware, logsController.updateLog)
router.delete("/:logId", authMiddleware, logsController.deleteLog)

export default router;

