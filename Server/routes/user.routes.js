import { Router } from "express";
import { login, profile, register, updateProfile } from "../controllers/user.controller.js";

const router = Router()

router.post("/register",register)
router.post("/login",login)
router.get("/:userId",profile)
router.put("/",updateProfile)


export default router