import express from "express";
import { createPost, getPosts, deletePost } from "../controllers/postController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", getPosts); // sab post dekh sakte hain
router.post("/", protect, createPost); // sirf login user post kar sakta hai
router.delete("/:id", protect, deletePost); // sirf owner ya admin delete kar sakta hai

export default router;
