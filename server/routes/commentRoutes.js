import { Router } from "express";
import {
  createComment,
  getComments
} from "../controllers/commentController.js";
import { verifyJWT } from "../middlewares/authMiddleware.js";

const router = Router();

router.post("/:blogId", verifyJWT, createComment);
router.get("/:blogId", getComments);

export default router;
