import express from "express";
const router = express.Router();

router.post("/", async (req, res) => {
  const { patientId, username, title, description, imageBinary } = req.body;

  console.log("Gemini received:", { patientId, username, title });

  // Example dummy analysis
  const analysis = `Gemini analyzed report "${title}" of ${username}`;

  res.json({ analysis });
});

export default router;
  