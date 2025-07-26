import { Router } from "express";
import {
  createComment
} from "../controllers/commentController.js";
import { verifyJWT } from "../middlewares/authMiddleware.js";

const router = Router();

router.post("/:blogId", verifyJWT, createComment);

export default router;
