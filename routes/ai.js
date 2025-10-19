import express from "express";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();
const router = express.Router();

const client = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

router.post("/analyze-report", async (req, res) => {
  try {
    const { text } = req.body;  // e.g., medical report summary
    const model = client.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [
        {
          parts: [
            { text: text }
          ]
        }
      ]
    });
    const resp = await model;
    const output = resp.text();  // extracted answer
    res.json({ output });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "AI error" });
  }
});

export default router;
