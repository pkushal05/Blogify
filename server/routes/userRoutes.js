import { Router } from "express";
import {
    refreshAccessToken,
    registerUser,
    loginUser,
    getAllUsers,
    isLoggedIn
} from "../controllers/userController.js"

const router = Router();

// Routes
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/", getAllUsers);
router.get("/status", isLoggedIn);

export default router;