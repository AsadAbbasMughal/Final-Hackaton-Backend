import express from "express";
import { protect, adminOnly } from "../middlewares/authMiddleware.js";
import User from "../models/User.js";

const router = express.Router();

// Get all users (admin only)
router.get("/users", protect, adminOnly, async (req, res) => {
  const users = await User.find().select("-password");
  res.json(users);
});

export default router;
