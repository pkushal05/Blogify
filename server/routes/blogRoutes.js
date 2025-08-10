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
  addLike
} from "../controllers/blogController.js";
import { verifyJWT } from "../middlewares/authMiddleware.js";
import { upload } from "../middlewares/multerMiddleware.js";

const router = Router();

router.post("/", verifyJWT, upload.single("thumbnail"), createBlog);
router.get("/", verifyJWT,getAllBlogs);
router.get("/:id", verifyJWT, getBlogById);
router.patch("/:id", verifyJWT, upload.single("thumbnail"), updateBlog);
router.delete("/:id", verifyJWT, deleteBlog);
router.get("/:id/comments", getComments);
router.get("/:id/author", getAuthorDetails);
router.get("/:id/likes", getTotalLikes);
router.post("/:id/like", verifyJWT, addLike);

export default router;
