import { Router } from "express";
import logsController from "../controllers/logs.controller.js";

const router = Router();

router.post("/", logsController.createLog)


export default router;