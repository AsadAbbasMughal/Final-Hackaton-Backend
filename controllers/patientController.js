import Patient from "../models/Patient.js";

// 🟢 Get all patients for current user
export const getMyPatients = async (req, res) => {
  try {
    const patients = await Patient.find({ createdBy: req.user._id }).sort({
      createdAt: -1,
    });
    res.json({ patients });
  } catch (err) {
    res.status(500).json({ message: "Error fetching patients", error: err });
  }
};

// 🟢 Create new patient
export const createPatient = async (req, res) => {
  try {
    const newPatient = new Patient({
      ...req.body,
      createdBy: req.user._id,
    });
    await newPatient.save();
    res.status(201).json(newPatient);
  } catch (err) {
    res.status(500).json({ message: "Error creating patient", error: err });
  }
};

// 🟡 Update patient
export const updatePatient = async (req, res) => {
  try {
    const updated = await Patient.findOneAndUpdate(
      { _id: req.params.id, createdBy: req.user._id },
      req.body,
      { new: true }
    );
    if (!updated)
      return res.status(404).json({ message: "Patient not found" });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: "Error updating patient", error: err });
  }
};

// 🔴 Delete patient
export const deletePatient = async (req, res) => {
  try {
    const deleted = await Patient.findOneAndDelete({
      _id: req.params.id,
      createdBy: req.user._id,
    });
    if (!deleted)
      return res.status(404).json({ message: "Patient not found" });
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting patient", error: err });
  }
};

// 👁 Get single patient (View)
export const getPatientById = async (req, res) => {
  try {
    const patient = await Patient.findOne({
      _id: req.params.id,
      createdBy: req.user._id,
    });
    if (!patient) return res.status(404).json({ message: "Not found" });
    res.json(patient);
  } catch (err) {
    res.status(500).json({ message: "Error fetching patient", error: err });
  }
};
