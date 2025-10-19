// Correct
import express from "express";
import multer from "multer"; // ✅ only once

const router = express.Router();
const upload = multer({ dest: "uploads/" });
export default upload;