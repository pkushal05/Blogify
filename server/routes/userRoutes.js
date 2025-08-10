import { Router } from "express";
import {
  refreshAccessToken,
  registerUser,
  loginUser,
  getAllUsers,
  isLoggedIn,
} from "../controllers/userController.js";
import { verifyJWT } from "../middlewares/authMiddleware.js";

const router = Router();

// User registration route (public)
router.post("/register", registerUser);

// User login route (public)
router.post("/login", loginUser);

// Get all users (public or protected based on implementation)
router.get("/", getAllUsers);

// Check if user is logged in (protected route)
router.get("/status", verifyJWT, isLoggedIn);

export default router;
