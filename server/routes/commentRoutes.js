import { Router } from "express";
import {
  createComment,
  getComments,
} from "../controllers/commentController.js";
import { verifyJWT } from "../middlewares/authMiddleware.js";

const router = Router();

// Create a comment on a specific blog post (protected route)
router.post("/:id", verifyJWT, createComment);

// Get comments for a specific blog post (public route)
router.get("/:id", getComments);

export default router;
