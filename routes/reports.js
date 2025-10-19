import express from "express";
import Report from "../models/Report.js";
import axios from "axios";

const router = express.Router();

// Get all reports for a patient
router.get("/patient/:id", async (req, res) => {
  try {
    const reports = await Report.find({ patient: req.params.id });
    res.json({ reports });
  } catch (err) {
    res.status(500).json({ message: "Error fetching reports" });
  }
});

// Add new report
router.post("/", async (req, res) => {
  try {
    const report = new Report(req.body);
    await report.save();

    // Call Gemini after saving report
    try {
      const geminiRes = await axios.post(
        "http://localhost:8000/api/gemini",
        {
          patientId: report.patient,
          username: "example_username",
          title: report.title,
          description: report.description,
          imageBinary: report.image, // already Base64 or URL
          file: report.file || null
        }
      );
      report.geminiAnalysis = geminiRes.data.analysis; // attach response
    } catch (err) {
      console.error("Gemini call failed:", err.message);
    }

    res.status(201).json(report);
  } catch (err) {
    res.status(400).json({ message: "Error creating report" });
  }
});

// Delete report
router.delete("/:id", async (req, res) => {
  try {
    await Report.findByIdAndDelete(req.params.id);
    res.json({ message: "Report deleted" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting report" });
  }
});

export default router;
