import { GoogleGenerativeAI } from "@google/generative-ai";
import fs from "fs";
import cloudinary from "../config/cloudinary.js";

export const analyzeReport = async (req, res) => {
  try {
    // Step 1: check file
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    // Step 2: upload to Cloudinary
    const uploadResult = await cloudinary.uploader.upload(req.file.path, {
      folder: "health-reports",
    });

    // Step 3: get URL
    const imageUrl = uploadResult.secure_url;

    // Step 4: send to Gemini AI
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `Analyze this medical report image: ${imageUrl}. 
    Summarize the key findings, possible conditions, and recommendations.`;

    const result = await model.generateContent(prompt);

    res.json({
      success: true,
      imageUrl,
      analysis: result.response.text(),
    });
  } catch (error) {
    console.error("❌ Error analyzing report:", error);
    res.status(500).json({ error: "Failed to analyze report" });
  }
};
