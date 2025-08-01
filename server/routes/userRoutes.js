import { Router } from "express";
import {
    refreshAccessToken,
    registerUser,
    loginUser,
    getAllUsers,
    isLoggedIn
} from "../controllers/userController.js"
import { verifyJWT } from "../middlewares/authMiddleware.js"

const router = Router();

// Routes
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/", getAllUsers);
router.get("/status", verifyJWT, isLoggedIn);

export default router;