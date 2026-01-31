import { Router } from "express";
import userController from "../controllers/user.controller.js";

const router = Router();

router.post("/register", userController.register)
router.post("/login", userController.login)
router.get("/:userId", userController.profile)
router.put("/", userController.updateProfile)

export default router;