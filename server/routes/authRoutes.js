import { Router } from "express";
import {
  getCurrentUser,
  getUserById,
  updateUser,
  deleteUser,
  logOutUser,
  refreshAccessToken,
} from "../controllers/userController.js";
import { verifyJWT } from "../middlewares/authMiddleware.js";
import { upload } from "../middlewares/multerMiddleware.js";

const router = Router();

// Get details of the currently logged-in user (protected route)
router.get("/me", verifyJWT, getCurrentUser);

// Get user details by user ID (protected route)
router.get("/:_id", verifyJWT, getUserById);

// Update user details, including profile picture upload (protected route)
router.patch("/update", verifyJWT, upload.single("profilePic"), updateUser);

// Delete user by ID (protected route)
router.delete("/:_id", verifyJWT, deleteUser);

// Log out the current user (protected route)
router.post("/logout", verifyJWT, logOutUser);

// Refresh the access token for the user (protected route)
router.post("/refresh-token", verifyJWT, refreshAccessToken);

export default router;
