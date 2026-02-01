import { Router } from "express";
import logsController from "../controllers/logs.controller.js";

const router = Router();

router.post("/", logsController.createLog)
router.get("/", logsController.getPublicLogs)
router.get("/:logId", logsController.getLogById)
router.get("/users/:userId", logsController.getUsersLogs)
router.patch("/:logId", logsController.updateIsPrivate)
router.put("/:logId", logsController.updateLog)
router.delete("/:logId", logsController.deleteLog)

export default router;

