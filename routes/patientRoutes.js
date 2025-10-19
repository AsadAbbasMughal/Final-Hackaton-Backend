import express from "express";
import Patient from "../models/patientModel.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();
    
// ✅ Get all patients (for current user)
router.get("/", protect, async (req, res) => {
  try {
    const patients = await Patient.find({ createdBy: req.user._id });
    res.json(patients);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch patients" });
  }
});

// ✅ Get single patient by ID
router.get("/:id", protect, async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id).populate("createdBy", "name email");
    if (!patient) return res.status(404).json({ message: "Patient not found" });
    res.json(patient);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch patient details" });
  }
});

// ✅ Add new patient
router.post("/", protect, async (req, res) => {
  try {
    const newPatient = new Patient({
      ...req.body,
      createdBy: req.user._id,
    });
    const saved = await newPatient.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(500).json({ message: "Failed to add patient" });
  }
});

// ✅ Delete patient
router.delete("/:id", protect, async (req, res) => {
  try {
    await Patient.findByIdAndDelete(req.params.id);
    res.json({ message: "Patient deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete patient" });
  }
});

// ✅ Update patient
router.put("/:id", protect, async (req, res) => {
  try {
    const updated = await Patient.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: "Failed to update patient" });
  }
});

export default router;
