import { Router } from "express";
import {
    getCurrentUser,
    getUserById,
    updateUser,
    deleteUser,
    logOutUser,
    refreshAccessToken
} from "../controllers/userController.js"
import { verifyJWT } from "../middlewares/authMiddleware.js";
import { upload } from "../middlewares/multerMiddleware.js";

const router = Router();

router.get("/me", verifyJWT, getCurrentUser);
router.get("/:_id", verifyJWT, getUserById);
router.patch("/update", verifyJWT, upload.single("profilePic"), updateUser);
router.delete("/:_id", verifyJWT, deleteUser);
router.post("/logout", verifyJWT, logOutUser);
router.post("/refresh-token", verifyJWT, refreshAccessToken);

export default router;