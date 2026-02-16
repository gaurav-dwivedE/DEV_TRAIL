import { Router } from "express";
import userController from "../controllers/user.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/register", userController.register)
router.post("/login", userController.login)
router.get("/me", authMiddleware, userController.getme)
router.get("/:userId", authMiddleware, userController.profile)
router.put("/", authMiddleware, userController.updateProfile)
router.post("/logout", authMiddleware, userController.logout);
export default router;