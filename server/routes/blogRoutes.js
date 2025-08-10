import { Router } from "express";
import {
  createBlog,
  getAllBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
  getComments,
  getAuthorDetails,
  getTotalLikes,
  addLike,
} from "../controllers/blogController.js";
import { verifyJWT } from "../middlewares/authMiddleware.js";
import { upload } from "../middlewares/multerMiddleware.js";

const router = Router();

// Create a new blog with optional thumbnail upload (protected route)
router.post("/", verifyJWT, upload.single("thumbnail"), createBlog);

// Get all blogs (protected route)
router.get("/", verifyJWT, getAllBlogs);

// Get a specific blog by ID (protected route)
router.get("/:id", verifyJWT, getBlogById);

// Update a blog by ID, with optional thumbnail upload (protected route)
router.patch("/:id", verifyJWT, upload.single("thumbnail"), updateBlog);

// Delete a blog by ID (protected route)
router.delete("/:id", verifyJWT, deleteBlog);

// Get comments for a specific blog (public route)
router.get("/:id/comments", getComments);

// Get author details of a specific blog (public route)
router.get("/:id/author", getAuthorDetails);

// Get total likes of a specific blog (public route)
router.get("/:id/likes", getTotalLikes);

// Add a like to a specific blog (protected route)
router.post("/:id/like", verifyJWT, addLike);

export default router;
