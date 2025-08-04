import { Router } from "express";
import {
  createComment,
  getComments
} from "../controllers/commentController.js";
import { verifyJWT } from "../middlewares/authMiddleware.js";

const router = Router();

router.post("/:id", verifyJWT, createComment);
router.get("/:id", getComments);

export default router;
